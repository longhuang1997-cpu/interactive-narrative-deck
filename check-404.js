const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  
  page.on('response', response => {
    if (response.status() === 404) {
      console.log(`404: ${response.url()}`);
    }
  });

  await page.goto('http://localhost:8080/examples/real-world-outputs/demo-strategic-report-q3.html', { 
    waitUntil: 'networkidle0',
    timeout: 10000 
  });

  await browser.close();
})();
