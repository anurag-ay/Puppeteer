const config = require("config");
const puppeteer = require("puppeteer");
const randon_useragent = require("random-useragent");
const fs = require("fs");
const os = require("os");

(async () => {
  // opening Browser
  const browser = await puppeteer.launch({ headless: false });
  // open new page
  const page = await browser.newPage();

  // Browser Setup
  page.setDefaultTimeout(10000);
  await page.setViewport({ width: 1366, height: 768 });
  // set up protection free
  await page.setUserAgent(randon_useragent.getRandom());

  // get data form the book store
  const nameSelector = ".product_main>h1";
  const priceSelector = ".price_color";

  await page.goto(config.get("url"));

  await page.waitForSelector(".product_main>h1");
  await page.waitForSelector(".price_color");

  const name = await page.$eval(nameSelector, (e) => e.innerHTML);
  const price = await page.$eval(priceSelector, (e) => e.innerHTML);
  const nameTrim = name.trim();
  const priceTrim = price.trim();

  console.log(nameTrim);
  console.log(priceTrim);

  // get current date and time

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const fulldate = `${day}/${month}/${year}`;

  console.log(fulldate);

  // save the data to the text file
  const logger = fs.createWriteStream("log.csv", { flags: "a" });
  logger.write(`${fulldate},${nameTrim},${priceTrim}` + os.EOL);
  logger.close();

  // close browser
  await browser.close();
})().catch((e) => {
  console.log(e);
  process.exit(1);
});
