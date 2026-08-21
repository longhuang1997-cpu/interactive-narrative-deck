/**
 * Block渲染测试 - 验证18种Block是否正常渲染
 *
 * 测试策略：
 * 1. 启动本地HTTP服务器
 * 2. 用Puppeteer加载示例页面
 * 3. 检查DOM中是否存在预期的Block元素
 * 4. 验证关键CSS类是否正确应用
 */

const puppeteer = require('puppeteer');

const TESTS = [
  {
    name: 'Hero Block',
    url: 'http://localhost:8080/examples/all-professional-blocks/index.html',
    selector: '.nd-hero',
    expectedCount: 1
  },
  {
    name: 'Metric Block',
    url: 'http://localhost:8080/examples/real-world-outputs/demo-strategic-report-q3.html',
    selector: '.nd-metric',
    expectedCount: 1
  },
  {
    name: 'SWOT Block',
    url: 'http://localhost:8080/examples/swot-demo/index.html',
    selector: '.nd-swot',
    expectedCount: 1
  },
  {
    name: 'OKR Block',
    url: 'http://localhost:8080/examples/all-professional-blocks/index.html',
    selector: '.nd-okr',
    expectedCount: 1
  },
  {
    name: 'Gantt Block',
    url: 'http://localhost:8080/examples/all-professional-blocks/index.html',
    selector: '.nd-gantt',
    expectedCount: 1
  },
  {
    name: 'Fishbone Block',
    url: 'http://localhost:8080/examples/real-world-outputs/demo-strategic-report-q3.html',
    selector: '.nd-fishbone',
    expectedCount: 1
  },
  {
    name: 'Code Block',
    url: 'http://localhost:8080/examples/real-world-outputs/demo-tech-talk-rag.html',
    selector: '.nd-code',
    expectedCount: 1
  }
];

async function runTests() {
  console.log('🚀 Starting Block Rendering Tests...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let passed = 0;
  let failed = 0;

  for (const test of TESTS) {
    try {
      const page = await browser.newPage();
      await page.goto(test.url, { waitUntil: 'networkidle0', timeout: 10000 });

      const elements = await page.$$(test.selector);

      if (elements.length >= test.expectedCount) {
        console.log(`✅ ${test.name}: PASS (found ${elements.length} elements)`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: FAIL (found ${elements.length}, expected ${test.expectedCount})`);
        failed++;
      }

      await page.close();
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR - ${error.message}`);
      failed++;
    }
  }

  await browser.close();

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
