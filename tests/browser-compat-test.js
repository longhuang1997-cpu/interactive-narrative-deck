/**
 * 浏览器兼容性测试 - 验证在不同视口下渲染正常
 *
 * 测试策略：
 * 1. 模拟桌面/平板/移动端视口
 * 2. 检查页面是否成功加载
 * 3. 验证关键元素是否可见
 * 4. 检查控制台错误
 */

const puppeteer = require('puppeteer');

const VIEWPORTS = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 667 }
];

const TEST_URL = 'http://localhost:8080/examples/real-world-outputs/demo-strategic-report-q3.html';

async function runCompatTests() {
  console.log('🌐 Starting Browser Compatibility Tests...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let passed = 0;
  let failed = 0;

  for (const viewport of VIEWPORTS) {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: viewport.width, height: viewport.height });

      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(TEST_URL, { waitUntil: 'networkidle0', timeout: 10000 });

      // 检查stage容器是否存在
      const stageExists = await page.$('#nd-stage');

      // 检查至少有一个slide渲染
      const slides = await page.$$('.nd-slide');

      if (stageExists && slides.length > 0 && consoleErrors.length === 0) {
        console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height}): PASS`);
        passed++;
      } else {
        console.log(`❌ ${viewport.name}: FAIL`);
        if (!stageExists) console.log('   - Stage not found');
        if (slides.length === 0) console.log('   - No slides rendered');
        if (consoleErrors.length > 0) {
          console.log('   - Console errors:', consoleErrors.slice(0, 3).join(', '));
        }
        failed++;
      }

      await page.close();
    } catch (error) {
      console.log(`❌ ${viewport.name}: ERROR - ${error.message}`);
      failed++;
    }
  }

  await browser.close();

  console.log(`\n📊 Compatibility Results: ${passed} passed, ${failed} failed`);

  if (failed > 0) {
    process.exit(1);
  }
}

runCompatTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
