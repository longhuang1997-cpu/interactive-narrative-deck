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

  const html = await page.content();
  console.log('Page loaded, HTML length:', html.length);

  const elements = await page.$$('.nd-metric');
  console.log('Found .nd-metric elements:', elements.length);

  const hasClass = await page.evaluate(() => {
    const el = document.querySelector('.nd-metric');
    if (el) {
      console.log('Element found:', el.tagName, el.className);
      return true;
    }
    return false;
  });

  console.log('Element check result:', hasClass);

  await browser.close();
})();
