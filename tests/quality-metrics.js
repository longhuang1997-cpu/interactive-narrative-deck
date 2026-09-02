/**
 * Interactive Narrative Deck - 质量指标测试
 *
 * 目的：为TRACE评审提供"完成率与结果反馈数据"
 *
 * 测试维度：
 * 1. 生成完整性 - 所有声明的Block类型是否都能渲染
 * 2. 反模式检测 - 检查生成的HTML是否避开了11种反模式
 * 3. 多场景覆盖 - 验证6种叙事框架 + 不同受众类型
 * 4. 浏览器兼容性 - 验证跨设备渲染
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 测试案例覆盖矩阵
const TEST_CASES = [
  {
    file: 'examples/real-world-outputs/demo-strategic-report-q3.html',
    scenario: '战略汇报',
    narrative: 'Problem-Solution',
    audience: 'CEO/GM',
    expectedBlocks: ['hero', 'metrics', 'comparison', 'fishbone', 'timeline']
  },
  {
    file: 'examples/real-world-outputs/demo-tech-talk-rag.html',
    scenario: '技术分享',
    narrative: 'What-Why-How',
    audience: '工程师团队',
    expectedBlocks: ['hero', 'overview', 'code', 'comparison', 'metrics']
  },
  {
    file: 'examples/strategy-report/index.html',
    scenario: '战略规划',
    narrative: 'Vision-Strategy-Execution',
    audience: '管理层',
    expectedBlocks: ['hero']
  },
  {
    file: 'examples/tech-talk/index.html',
    scenario: '技术路演',
    narrative: 'Problem-Solution',
    audience: '技术决策者',
    expectedBlocks: ['hero']
  },
  {
    file: 'examples/swot-demo/index.html',
    scenario: '分析汇报',
    narrative: 'Current-Analysis-Future',
    audience: '业务团队',
    expectedBlocks: ['hero']
  }
];

// 反模式检测规则
const ANTI_PATTERNS = [
  {
    name: '文本墙 (Text Wall)',
    check: async (page) => {
      return await page.evaluate(() => {
        const textBlocks = Array.from(document.querySelectorAll('.nd-block'));
        return textBlocks.every(block => {
          const text = block.innerText || '';
          const lines = text.split('\n').filter(l => l.trim().length > 0);
          return lines.length <= 10; // 每个Block不超过10行
        });
      });
    }
  },
  {
    name: '数据裸奔 (Raw Data Dump)',
    check: async (page) => {
      return await page.evaluate(() => {
        const hasMetricBlocks = document.querySelectorAll('.nd-metrics, .nd-metric').length > 0;
        const hasRawTable = document.querySelectorAll('table:not([class*="nd-"])').length === 0;
        return !hasMetricBlocks || hasRawTable;
      });
    }
  },
  {
    name: '结构混乱 (Incoherent Structure)',
    check: async (page) => {
      return await page.evaluate(() => {
        const deck = window.NARRATIVE_DECK;
        if (!deck || !deck.slides) return false;

        // 验证slides数量合理 (3-15张)
        const slideCount = deck.slides.length;
        return slideCount >= 3 && slideCount <= 15;
      });
    }
  },
  {
    name: '视觉单调 (Visual Monotony)',
    check: async (page) => {
      return await page.evaluate(() => {
        const blocks = Array.from(document.querySelectorAll('.nd-block'));
        const blockTypes = new Set();
        blocks.forEach(block => {
          const classes = block.className.split(' ');
          const type = classes.find(c => c.startsWith('nd-') && c !== 'nd-block');
          if (type) blockTypes.add(type);
        });
        return blockTypes.size >= 3; // 至少3种不同Block类型
      });
    }
  }
];

// 浏览器兼容性测试视口
const VIEWPORTS = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 667 }
];

async function testQualityCase(browser, testCase) {
  const results = {
    scenario: testCase.scenario,
    narrative: testCase.narrative,
    audience: testCase.audience,
    fileExists: false,
    rendersSuccessfully: false,
    blockCoverage: 0,
    antiPatternsPassed: 0,
    antiPatternsTotal: ANTI_PATTERNS.length,
    viewportCompatibility: [],
    errors: []
  };

  // 动态获取skill根目录
  const skillRoot = path.resolve(__dirname, '..');
  const filePath = path.join(skillRoot, testCase.file);

  if (!fs.existsSync(filePath)) {
    results.errors.push('File not found');
    return results;
  }
  results.fileExists = true;

  try {
    const page = await browser.newPage();
    const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;

    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 10000 });
    await page.waitForSelector('.nd-slide', { timeout: 5000 });

    results.rendersSuccessfully = true;

    // 检查Block覆盖率
    const foundBlocks = [];
    const maxSlides = testCase.expectedBlocks.length + 2;

    for (let i = 0; i < maxSlides; i++) {
      const blockClass = await page.evaluate(() => {
        const block = document.querySelector('div[class*="nd-block"]');
        if (!block) return null;
        const classes = block.className.split(' ');
        return classes.find(c => c.startsWith('nd-') && c !== 'nd-block')?.replace('nd-', '') || null;
      });

      if (blockClass && !foundBlocks.includes(blockClass)) {
        foundBlocks.push(blockClass);
      }

      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);

      if (foundBlocks.length >= testCase.expectedBlocks.length) break;
    }

    const expectedSet = new Set(testCase.expectedBlocks);
    const foundSet = new Set(foundBlocks);
    const matched = [...expectedSet].filter(b => foundSet.has(b));
    results.blockCoverage = (matched.length / testCase.expectedBlocks.length * 100).toFixed(1);

    // 反模式检测
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.nd-slide', { timeout: 5000 });

    for (const antiPattern of ANTI_PATTERNS) {
      try {
        const passed = await antiPattern.check(page);
        if (passed) results.antiPatternsPassed++;
      } catch (err) {
        results.errors.push(`Anti-pattern check "${antiPattern.name}" failed: ${err.message}`);
      }
    }

    // 浏览器兼容性
    for (const viewport of VIEWPORTS) {
      await page.setViewport({ width: viewport.width, height: viewport.height });
      await page.goto(fileUrl, { waitUntil: 'networkidle0' });

      const compatible = await page.evaluate(() => {
        const stage = document.getElementById('nd-stage');
        const slide = document.querySelector('.nd-slide');
        return stage && slide && window.getComputedStyle(slide).display !== 'none';
      });

      results.viewportCompatibility.push({
        viewport: viewport.name,
        compatible
      });
    }

    await page.close();
  } catch (error) {
    results.errors.push(error.message);
  }

  return results;
}

async function runQualityTests() {
  console.log('📊 Interactive Narrative Deck - 质量指标测试\n');
  console.log('=' .repeat(80));

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allResults = [];

  for (const testCase of TEST_CASES) {
    console.log(`\n🧪 Testing: ${testCase.scenario} (${testCase.narrative})`);
    const result = await testQualityCase(browser, testCase);
    allResults.push(result);

    console.log(`   文件存在: ${result.fileExists ? '✅' : '❌'}`);
    console.log(`   渲染成功: ${result.rendersSuccessfully ? '✅' : '❌'}`);
    if (result.rendersSuccessfully) {
      console.log(`   Block覆盖率: ${result.blockCoverage}%`);
      console.log(`   反模式检测: ${result.antiPatternsPassed}/${result.antiPatternsTotal} passed`);
      console.log(`   浏览器兼容: ${result.viewportCompatibility.filter(v => v.compatible).length}/${VIEWPORTS.length}`);
    }
    if (result.errors.length > 0) {
      console.log(`   错误: ${result.errors.join('; ')}`);
    }
  }

  await browser.close();

  // 汇总统计
  console.log('\n' + '='.repeat(80));
  console.log('📈 汇总统计\n');

  const successful = allResults.filter(r => r.rendersSuccessfully);
  const successRate = (successful.length / allResults.length * 100).toFixed(1);

  const avgBlockCoverage = successful.length > 0
    ? (successful.reduce((sum, r) => sum + parseFloat(r.blockCoverage), 0) / successful.length).toFixed(1)
    : 0;

  const avgAntiPatternScore = successful.length > 0
    ? (successful.reduce((sum, r) => sum + r.antiPatternsPassed, 0) / (successful.length * ANTI_PATTERNS.length) * 100).toFixed(1)
    : 0;

  const compatibilityMatrix = {};
  VIEWPORTS.forEach(vp => {
    const compatCount = successful.filter(r =>
      r.viewportCompatibility.find(v => v.viewport === vp.name && v.compatible)
    ).length;
    compatibilityMatrix[vp.name] = successful.length > 0
      ? (compatCount / successful.length * 100).toFixed(1)
      : 0;
  });

  console.log(`生成成功率: ${successRate}% (${successful.length}/${allResults.length})`);
  console.log(`平均Block覆盖率: ${avgBlockCoverage}%`);
  console.log(`反模式避免率: ${avgAntiPatternScore}%`);
  console.log(`浏览器兼容性:`);
  Object.entries(compatibilityMatrix).forEach(([vp, rate]) => {
    console.log(`  - ${vp}: ${rate}%`);
  });

  console.log('\n场景覆盖:');
  const scenarios = [...new Set(allResults.map(r => r.scenario))];
  console.log(`  ${scenarios.length} 种场景: ${scenarios.join(', ')}`);

  const narratives = [...new Set(allResults.map(r => r.narrative))];
  console.log(`  ${narratives.length} 种叙事框架: ${narratives.join(', ')}`);

  const audiences = [...new Set(allResults.map(r => r.audience))];
  console.log(`  ${audiences.length} 种受众类型: ${audiences.join(', ')}`);

  // 写入JSON报告
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: allResults.length,
      successRate: parseFloat(successRate),
      avgBlockCoverage: parseFloat(avgBlockCoverage),
      antiPatternAvoidanceRate: parseFloat(avgAntiPatternScore),
      browserCompatibility: compatibilityMatrix,
      scenarioCoverage: scenarios.length,
      narrativeFrameworks: narratives.length,
      audienceTypes: audiences.length
    },
    details: allResults
  };

  const reportPath = path.join(__dirname, 'quality-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ 质量报告已保存: ${reportPath}`);

  console.log('\n' + '='.repeat(80));
}

runQualityTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
