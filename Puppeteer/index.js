const puppeteer = require("puppeteer");

// wait function
function waitFor(time) {
  return new Promise((r) => setTimeout(r, time));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/The_Avengers_(2012_film)");
  await page.waitForXPath("//p");
  await browser.close();
})();
