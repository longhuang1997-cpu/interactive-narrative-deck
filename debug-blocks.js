const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:8080/examples/real-world-outputs/demo-strategic-report-q3.html', { waitUntil: 'networkidle0' });
  
  await page.waitForSelector('.nd-slide', { timeout: 5000 });

  console.log('=== Initial state ===');
  let result = await page.evaluate(() => {
    return {
      slideCount: document.querySelectorAll('.nd-slide').length,
      blockClasses: Array.from(document.querySelectorAll('div[class*="nd-block"]')).map(el => el.className)
    };
  });
  console.log(JSON.stringify(result, null, 2));

  // Press right arrow to go to slide 2
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);

  console.log('\n=== After ArrowRight (slide 2) ===');
  result = await page.evaluate(() => {
    return {
      slideCount: document.querySelectorAll('.nd-slide').length,
      blockClasses: Array.from(document.querySelectorAll('div[class*="nd-block"]')).map(el => el.className)
    };
  });
  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();
