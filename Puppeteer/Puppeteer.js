// //How Open Browser

// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch({ headless: false }); //headless equals to false means openbrowesr
//   const page = await browser.newPage();
//   await page.goto("https://www.google.com/");

//   setTimeout(async () => {
//       await browser.close();
//   }, 3000);
// })();

//=========================================

//Browser Options

// slow down each command with certain intervals

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  await browser.close();
})();

// open a browser with dev tool enable
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 1000,
    devtools: true,
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  await browser.close();
})();

//===============================================================

//#5: Pause the Test

// how to wait on the particular step for certain minutes
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.waitFor(1000);
  await page.goto("https://www.google.com/");
  await browser.close();
})();

//===================================================================

//#6: Reload the Browser

// how to reload the browser
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.waitFor(1000);
  await page.goto("https://www.google.com/");
  // reload the browser
  await page.reload();
  await browser.close();
})();

//=============================================================

//#7: Go Back & Forward

// how to reload the browser
(async () => {
  const browser = await puppeteer.launch({
    slowMo: 600,
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com");
  await page.goto("https://www.google.com/");
  await page.goBack();
  await page.goForward();
  await browser.close();
})();

//=============================================================
//Working with Inputs

// wait function
function waitFor(time) {
  return new Promise((r) => setTimeout(r, time));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");

  await waitFor(2000);

  await page.type(".gLFyf", "www.amazon.com", { delay: 500 });

  await page.goto("https://www.amazon.com/");

  setTimeout(async () => {
    await browser.close();
  }, 3000);
})();

//=============================================================
//Working with Buttons

// wait function
function waitFor(time) {
  return new Promise((r) => setTimeout(r, time));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  await waitFor(2000);
  await page.type(".gLFyf", "www.amazon.com", { delay: 200 });
  await waitFor(5000);
  await page.click(".gNO89b", { clickCount: 1 });
  setTimeout(async () => {
    await browser.close();
  }, 3000);
})();

//=============================================================
//10: Working with Dropdown

// wait function
function waitFor(time) {
  return new Promise((r) => setTimeout(r, time));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  await page.type(".gLFyf", "https://www.amazon.com/");
  await page.click(".gNO89b");
  await waitFor(2000);
  await page.click(".LC20lb");
  await waitFor(2000);
  await page.select("#searchDropdownBox", "Automotive");
  await waitFor(2000);
  setTimeout(async () => {
    await browser.close();
  }, 3000);
})();

//=============================================================
//11: Working with Title and URL

// wait function
function waitFor(time) {
  return new Promise((r) => setTimeout(r, time));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  const title = await page.title();
  const url = page.url();
  console.log(title, url);
  await browser.close();
})();

//=============================================================
//12: Get Text

// How to get the content of the any element

// wait function
function waitFor(time) {
  return new Promise((r) => setTimeout(r, time));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.in/Bosch-1400RPM-INVERTER-Automatic-WAJ28262IN/dp/B08J3KFLBT/ref=sr_1_5?pd_rd_r=0b20b5db-5686-4d3d-a36e-bcaa8b765a58&pd_rd_w=7jxF9&pd_rd_wg=00Qft&pf_rd_p=a9ac207c-0d1e-4a1e-bb41-03478442747f&pf_rd_r=JB07W9DGZ0KGZTJC6ASB&qid=1666430632&refinements=p_n_feature_fifteen_browse-bin%3A2753053031%2Cp_85%3A10440599031&rps=1&s=kitchen&sr=1-5&th=1"
  );
  await page.waitForSelector("h1>span#productTitle");

  const text = await page.$eval("h1>#productTitle", (ele) => ele.textContent);

  console.log(text);
  await browser.close();
})();

//=============================================================
//13: Get Elements Count

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

  const len = await page.$$eval("p", (ele) => ele.length);

  console.log(len);
  await browser.close();
})();

//=============================================================
//15: Timeouts

// how to change the default value of timeouts

const puppeteer = require("puppeteer");

// wait function
function waitFor(time) {
  return new Promise((r) => setTimeout(r, time));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  await page.setDefaultTimeout(10000);
  await page.setDefaultNavigationTimeout(1000);
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/The_Avengers_(2012_film)");

  const len = await page.$$eval("p", (ele) => ele.length);

  console.log(len);
  await browser.close();
})();

//=============================================================
//16: Keyboard Press

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

  await waitFor(3000);
  page.waitForSelector(".vector-search-box-input");
  page.type(".vector-search-box-input", "Robert Downey Jr", { delay: 100 });
  await waitFor(3000);
  page.keyboard.press("Enter", { delay: 1000 });

  await waitFor(3000);
  await browser.close();
})();

//=============================================================
// 17: Keyboard Press

// ex-> Xpath

// /bookstore/book[1]	Selects the first book element that is the child of the bookstore element
// /bookstore/book[last()]	Selects the last book element that is the child of the bookstore element
// /bookstore/book[last()-1]	Selects the last but one book element that is the child of the bookstore element
// /bookstore/book[position()<3]	Selects the first two book elements that are children of the bookstore element
// //title[@lang]	Selects all the title elements that have an attribute named lang
// //title[@lang='en']	Selects all the title elements that have a "lang" attribute with a value of "en"
// /bookstore/book[price>35.00]	Selects all the book elements of the bookstore element that have a price element with a value greater than 35.00
// /bookstore/book[price>35.00]/title	Selects all the title elements of the book elements of the bookstore element that have a price element with a value greater than 35.00

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
