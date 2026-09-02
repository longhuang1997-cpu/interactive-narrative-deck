/**
 * post-render-check.js · 渲染后验证（交付前必跑）
 *
 * 为什么需要它：
 *   validation.js 是「生成前」的数据校验，只能发现 deck.js 里字段写错。
 *   有一整类问题只在浏览器里才暴露 —— CDN 挂了导致数字停在 0、
 *   某页 block 总高度溢出被裁、文字对比度不足、引用落空点击无反应。
 *   这个脚本翻遍每一页，用真实渲染结果回答「到底能不能看」。
 *
 * 用法：
 *   node tests/post-render-check.js <目标HTML的URL或本地路径>
 *   node tests/post-render-check.js ./examples/real-world-outputs/demo-tech-talk-rag.html
 *
 * 退出码：0 = 全部通过；1 = 存在 FAIL。
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// ---- 阈值（与 knowledge/visual-design-rules.md 对齐）----
const MAX_SLIDE_HEIGHT = 850;   // 单页 block 总高度上限，留 150px 呼吸空间
const MIN_CONTRAST     = 4.5;   // WCAG AA
const MAX_SLIDES       = 60;    // 防御性上限，避免死循环

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
];

function resolveTarget(arg) {
  if (!arg) {
    console.error('用法: node tests/post-render-check.js <URL或HTML路径>');
    process.exit(2);
  }
  if (/^https?:\/\//i.test(arg)) return arg;
  const abs = path.resolve(arg);
  if (!fs.existsSync(abs)) {
    console.error(`找不到文件: ${abs}`);
    process.exit(2);
  }
  // file:// 协议下 engine/ 的相对路径依然可解析
  return 'file:///' + abs.replace(/\\/g, '/');
}

function findChrome() {
  for (const p of CHROME_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  return undefined; // 交给 puppeteer 自带的 Chromium
}

// ---- 对比度计算（WCAG 2.1 相对亮度）----
function parseColor(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(',').map(s => parseFloat(s.trim()));
  return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
}

function relLuminance({ r, g, b }) {
  const f = v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

// 前景可能半透明，按 alpha 合成到背景上再算
function composite(fg, bg) {
  if (fg.a >= 1) return fg;
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
  };
}

function contrastRatio(fgStr, bgStr) {
  const fg = parseColor(fgStr), bg = parseColor(bgStr);
  if (!fg || !bg) return null;
  if (bg.a < 1) return null;              // 背景本身透明，测不准，跳过
  const L1 = relLuminance(composite(fg, bg));
  const L2 = relLuminance(bg);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

(async () => {
  const target = resolveTarget(process.argv[2]);
  const findings = { fail: [], warn: [], pass: [] };

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: findChrome(),
    args: ['--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // ---- 采集：控制台错误 / 404 ----
  const consoleErrors = [];
  const notFound = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('PageError: ' + e.message));
  page.on('requestfailed', r => notFound.push(`${r.failure().errorText} ${r.url()}`));
  page.on('response', r => { if (r.status() === 404) notFound.push(`404 ${r.url()}`); });

  // 每次跑都从第 1 页开始：引擎会把进度存进 localStorage
  await page.evaluateOnNewDocument(() => {
    try { localStorage.removeItem('nd_cur'); } catch (e) {}
  });

  await page.goto(target, { waitUntil: 'networkidle0', timeout: 20000 });
  await page.waitForSelector('.nd-slide', { timeout: 8000 });

  // ---- 检查1: CDN 依赖是否真的到位 ----
  const libs = await page.evaluate(() => ({
    gsap: typeof window.gsap !== 'undefined',
    chart: typeof window.Chart !== 'undefined',
    needsChart: !!(window.NARRATIVE_DECK && window.NARRATIVE_DECK.slides || [])
      .some(s => (s.blocks || []).some(b => b.type === 'chart')),
  }));
  if (!libs.gsap) {
    findings.warn.push('GSAP 未加载 —— 动效已降级到 CSS（可接受，但数字滚动/渐进揭示表现会变）');
  }
  if (libs.needsChart && !libs.chart) {
    findings.fail.push('deck 里有 chart block，但 Chart.js 未加载 —— 图表区会是空白');
  }

  const slideCount = await page.evaluate(() =>
    (window.NARRATIVE_DECK && window.NARRATIVE_DECK.slides || []).length);

  if (!slideCount) {
    findings.fail.push('读不到 window.NARRATIVE_DECK.slides —— deck.js 未加载或结构不对');
  }

  // ---- 检查2: 引用完整性（契约自检）----
  // progress 圆点数 / slides 数 / 每页 block 是否都渲染出了 DOM，三者必须对得上。
  // 这正是本次 O3 文档踩的坑：导航项数和锚点数不一致，点击落空。
  const dots = await page.$$eval('#nd-progress .nd-dot', els => els.length);
  if (dots !== slideCount) {
    findings.fail.push(`进度点 ${dots} 个 ≠ slides ${slideCount} 页 —— 点击导航会错位或落空`);
  } else {
    findings.pass.push(`进度点与页数一致（${dots}）`);
  }

  // ---- 逐页遍历 ----
  const perSlide = [];
  for (let i = 0; i < Math.min(slideCount, MAX_SLIDES); i++) {
    await page.evaluate(idx => window.ND && window.ND.goto(idx), i);
    await new Promise(r => setTimeout(r, 260)); // 等入场动画落定

    const info = await page.evaluate((MAX_H, idx) => {
      const slide = document.querySelector('.nd-slide');
      if (!slide) return null;

      const declared = (window.NARRATIVE_DECK.slides[idx].blocks || []).length;
      const rendered = slide.querySelectorAll('.nd-block').length;

      // block 总高度
      let total = 0;
      slide.querySelectorAll('.nd-block').forEach(b => { total += b.getBoundingClientRect().height; });

      // 数字卡是否真的滚到了非零值
      const zeroMetrics = [];
      slide.querySelectorAll('.nd-mnum').forEach(el => {
        const t = (el.textContent || '').trim();
        if (t === '' || t === '0') zeroMetrics.push(el.parentElement?.innerText?.slice(0, 24) || '(未知)');
      });

      // 图表 canvas 是否有实际像素
      const emptyCharts = [];
      slide.querySelectorAll('.nd-chart-box canvas').forEach((c, k) => {
        if (!c.width || !c.height) emptyCharts.push('canvas#' + k);
      });

      // 采样文字对比度：取每页若干可见文本节点
      const samples = [];
      const sel = '.nd-sub,.nd-bullets li,.nd-mlabel,.nd-grid-x,.nd-cmp-col li,.nd-swot-item,.nd-tl-c,h2';
      Array.prototype.slice.call(slide.querySelectorAll(sel), 0, 8).forEach(el => {
        const cs = getComputedStyle(el);
        // 往上找第一个不透明的背景
        let bgEl = el, bg = 'rgba(0, 0, 0, 0)';
        while (bgEl) {
          const c = getComputedStyle(bgEl).backgroundColor;
          if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) { bg = c; break; }
          bgEl = bgEl.parentElement;
        }
        samples.push({
          text: (el.textContent || '').trim().slice(0, 28),
          fg: cs.color,
          bg,
          size: parseFloat(cs.fontSize),
          weight: cs.fontWeight,
        });
      });

      return {
        title: window.NARRATIVE_DECK.slides[idx].title || '(无标题)',
        declared, rendered,
        height: Math.round(total),
        overflow: total > MAX_H,
        zeroMetrics, emptyCharts, samples,
      };
    }, MAX_SLIDE_HEIGHT, i);

    if (!info) { findings.fail.push(`P${i + 1}: 渲染不出 .nd-slide`); continue; }
    perSlide.push(info);

    const tag = `P${i + 1}「${info.title}」`;

    if (info.rendered !== info.declared) {
      findings.fail.push(`${tag}: deck 声明 ${info.declared} 个 block，实际渲染 ${info.rendered} 个 —— 有 block 类型未注册或渲染抛错`);
    }
    if (info.overflow) {
      findings.fail.push(`${tag}: block 总高 ${info.height}px > ${MAX_SLIDE_HEIGHT}px —— 底部内容会被裁掉，需拆页`);
    }
    if (info.zeroMetrics.length) {
      findings.fail.push(`${tag}: ${info.zeroMetrics.length} 个数字卡停在 0/空 —— 滚动动画没跑起来（${info.zeroMetrics.join(' / ')}）`);
    }
    if (info.emptyCharts.length) {
      findings.fail.push(`${tag}: 图表 canvas 无尺寸（${info.emptyCharts.join(', ')}）`);
    }

    info.samples.forEach(s => {
      const ratio = contrastRatio(s.fg, s.bg);
      if (ratio === null) return;
      // 大字（≥24px 或 ≥19px 加粗）按 WCAG 放宽到 3:1
      const large = s.size >= 24 || (s.size >= 19 && parseInt(s.weight, 10) >= 700);
      const need = large ? 3.0 : MIN_CONTRAST;
      if (ratio < need) {
        findings.warn.push(`${tag}: 对比度 ${ratio.toFixed(2)}:1 < ${need}（"${s.text}" ${s.fg} on ${s.bg}）`);
      }
    });
  }

  // ---- 汇总控制台/网络问题 ----
  if (consoleErrors.length) {
    consoleErrors.slice(0, 10).forEach(e => findings.fail.push('控制台错误: ' + e));
  } else {
    findings.pass.push('控制台 0 错误');
  }
  const realNotFound = notFound.filter(u => !/favicon/i.test(u));
  if (realNotFound.length) {
    realNotFound.slice(0, 10).forEach(u => findings.warn.push('资源加载失败: ' + u));
  } else {
    findings.pass.push('无 404 / 资源加载失败');
  }
  if (perSlide.length) {
    const max = perSlide.reduce((a, b) => (b.height > a.height ? b : a));
    findings.pass.push(`最高一页 ${max.height}px（P${perSlide.indexOf(max) + 1}「${max.title}」），上限 ${MAX_SLIDE_HEIGHT}px`);
  }

  await browser.close();

  // ---- 输出 ----
  console.log('\n=== 渲染后验证 ===');
  console.log('目标: ' + target);
  console.log(`页数: ${slideCount}\n`);

  if (findings.fail.length) {
    console.log(`FAIL (${findings.fail.length})`);
    findings.fail.forEach(m => console.log('  ✗ ' + m));
    console.log('');
  }
  if (findings.warn.length) {
    console.log(`WARN (${findings.warn.length})`);
    findings.warn.forEach(m => console.log('  ! ' + m));
    console.log('');
  }
  console.log(`PASS (${findings.pass.length})`);
  findings.pass.forEach(m => console.log('  ✓ ' + m));

  console.log('\n' + (findings.fail.length
    ? '结论: 不可交付 —— 先修掉上面的 FAIL'
    : '结论: 可交付' + (findings.warn.length ? '（WARN 建议一并处理）' : '')));

  process.exit(findings.fail.length ? 1 : 0);
})().catch(e => {
  console.error('验证脚本自身出错:', e.message);
  process.exit(2);
});
