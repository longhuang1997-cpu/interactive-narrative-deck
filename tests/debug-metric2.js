const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.goto('http://localhost:8080/examples/real-world-outputs/demo-strategic-report-q3.html', {
    waitUntil: 'networkidle0',
    timeout: 10000
  });

  // Wait for JavaScript to execute
  await page.waitForTimeout(2000);

  const elements = await page.$$('.nd-metric');
  console.log('Found .nd-metric elements after wait:', elements.length);

  const pageContent = await page.evaluate(() => {
    const metrics = document.querySelectorAll('.nd-metric');
    return {
      metricCount: metrics.length,
      bodyHTML: document.body.innerHTML.substring(0, 500)
    };
  });

  console.log('Metric count from evaluate:', pageContent.metricCount);

  await browser.close();
})();
