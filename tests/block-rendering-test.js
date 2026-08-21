/**
 * Block渲染测试 - 验证核心Block类型是否正常渲染
 *
 * 测试策略：
 * 1. 启动本地HTTP服务器
 * 2. 用Puppeteer加载示例页面
 * 3. 逐个slide导航，验证每个slide的Block是否正确渲染
 * 4. 框架采用单slide替换模式，只保留当前slide的DOM
 */

const puppeteer = require('puppeteer');

const TESTS = [
  {
    name: 'Strategic Report Q3 - All Slides',
    url: 'http://localhost:8080/examples/real-world-outputs/demo-strategic-report-q3.html',
    expectedBlocks: ['nd-hero', 'nd-metrics', 'nd-comparison', 'nd-fishbone', 'nd-timeline']
  },
  {
    name: 'Tech Talk RAG - All Slides',
    url: 'http://localhost:8080/examples/real-world-outputs/demo-tech-talk-rag.html',
    expectedBlocks: ['nd-hero', 'nd-metrics', 'nd-overview', 'nd-code', 'nd-comparison']
  }
];

async function testDeck(browser, test) {
  const page = await browser.newPage();
  await page.goto(test.url, { waitUntil: 'networkidle0', timeout: 10000 });
  await page.waitForSelector('.nd-slide', { timeout: 5000 });

  const foundBlocks = [];
  const maxSlides = test.expectedBlocks.length + 2; // Add buffer

  for (let i = 0; i < maxSlides; i++) {
    // Check current slide's block type
    const blockClass = await page.evaluate(() => {
      const block = document.querySelector('div[class*="nd-block"]');
      if (!block) return null;

      // Extract block type from class (e.g., "nd-block nd-hero" -> "nd-hero")
      const classes = block.className.split(' ');
      return classes.find(c => c.startsWith('nd-') && c !== 'nd-block') || null;
    });

    if (blockClass && !foundBlocks.includes(blockClass)) {
      foundBlocks.push(blockClass);
    }

    // Navigate to next slide
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);

    // Stop if we've found all expected blocks
    if (foundBlocks.length >= test.expectedBlocks.length) {
      break;
    }
  }

  await page.close();
  return foundBlocks;
}

async function runTests() {
  console.log('🚀 Starting Block Rendering Tests...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let passed = 0;
  let failed = 0;

  for (const test of TESTS) {
    try {
      const foundBlocks = await testDeck(browser, test);

      // Check if all expected blocks were found
      const missing = test.expectedBlocks.filter(b => !foundBlocks.includes(b));

      if (missing.length === 0) {
        console.log(`✅ ${test.name}: PASS`);
        console.log(`   Found all ${foundBlocks.length} blocks: ${foundBlocks.join(', ')}`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: FAIL`);
        console.log(`   Found: ${foundBlocks.join(', ')}`);
        console.log(`   Missing: ${missing.join(', ')}`);
        failed++;
      }
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
