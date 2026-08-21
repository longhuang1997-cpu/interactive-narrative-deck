/**
 * 自动截图工具 - 使用Puppeteer
 *
 * 安装依赖：
 *   npm install puppeteer
 *
 * 使用：
 *   node screenshot_generator.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const pages = [
  { index: 1, name: 'demo-okr.png', title: 'OKR目标管理' },
  { index: 2, name: 'demo-gantt.png', title: '甘特图' },
  { index: 3, name: 'demo-fishbone.png', title: '鱼骨图' },
  { index: 4, name: 'demo-bcg.png', title: 'BCG矩阵' },
  { index: 5, name: 'demo-kanban.png', title: '看板' },
];

async function captureScreenshots() {
  // 确保输出目录存在
  const outputDir = path.join(__dirname, 'docs', 'images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 启动浏览器...');
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2 // 2x分辨率
    }
  });

  const page = await browser.newPage();

  const url = 'http://localhost:8080/examples/all-professional-blocks/';
  console.log(`📡 访问: ${url}\n`);
  await page.goto(url, { waitUntil: 'networkidle0' });

  // 等待页面加载完成
  await page.waitForTimeout(2000);

  for (const pg of pages) {
    console.log(`📸 截取第${pg.index + 1}页: ${pg.title}...`);

    // 按右键翻页
    for (let i = 0; i < pg.index; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(800); // 等待动画
    }

    // 额外等待内容渲染
    await page.waitForTimeout(1500);

    // 截图
    const outputPath = path.join(outputDir, pg.name);
    await page.screenshot({
      path: outputPath,
      type: 'png'
    });
    console.log(`  ✅ 保存到: ${outputPath}`);

    // 回到首页
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForTimeout(1000);
  }

  await browser.close();

  console.log('\n🎉 所有截图完成！');
  console.log(`📁 保存位置: ${outputDir}`);
  console.log('\n下一步:');
  console.log('  1. 检查截图质量');
  console.log('  2. git add docs/images/*.png');
  console.log('  3. git commit -m "docs: 添加演示截图"');
  console.log('  4. git push origin main');
}

// 主函数
(async () => {
  console.log('🚀 Interactive Narrative Deck 自动截图工具\n');

  // 检查服务器
  try {
    const http = require('http');
    await new Promise((resolve, reject) => {
      const req = http.get('http://localhost:8080', (res) => {
        if (res.statusCode === 200) {
          console.log('✅ 检测到本地服务器运行中\n');
          resolve();
        }
      });
      req.on('error', reject);
      req.setTimeout(2000);
    });
  } catch (e) {
    console.error('❌ 错误: 本地服务器未运行');
    console.error('请先运行: python -m http.server 8080\n');
    process.exit(1);
  }

  await captureScreenshots();
})();
