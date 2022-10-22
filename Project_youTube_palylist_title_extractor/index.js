const config = require("config");
const puppeteer = require("puppeteer");
const fs = require("fs");
const os = require("os");
const random_useragent = require("random-useragent");
const { fileURLToPath } = require("url");

async function waitFor(time) {
  return new Promise((r) => setTimeout(r, time));
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  //setting up browser
  page.setDefaultTimeout(10000);
  await page.setUserAgent(random_useragent.getRandom());
  await page.setViewport({ height: 1366, width: 768 });
  await page.goto(config.get("url"));

  await page.waitForSelector("#video-title");
  const element = await page.$$("#video-title");
  element.forEach(async (ele) => {
    let value = await page.evaluate((el) => el.textContent, ele);
    const logger = fs.createWriteStream("log.txt", { flags: "a" });
    logger.write(value.trim() + os.EOL);
    logger.close();
  });

  // closing browser
  await browser.close();
})().catch((error) => {
  console.log(error);
  process.exit(1);
});
