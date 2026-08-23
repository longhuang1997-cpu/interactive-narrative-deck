const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(`PageError: ${error.message}`);
  });

  await page.goto('http://localhost:8080/examples/real-world-outputs/demo-strategic-report-q3.html', { 
    waitUntil: 'networkidle0',
    timeout: 10000 
  });

  await page.waitForSelector('.nd-slide', { timeout: 5000 });

  console.log('Console errors:', consoleErrors.length);
  consoleErrors.forEach(err => console.log('  -', err));

  await browser.close();
})();
