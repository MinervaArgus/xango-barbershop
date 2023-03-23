const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path.replace(/\.bin/, ''); //After many hours of troubleshooting i realized that the default path was adding a .bin folder where there was none so i fixed it by doing this. - JN
const chromeBinaryPath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const options = new chrome.Options().headless().setChromeBinaryPath(chromeBinaryPath);
describe('About Us Page', function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should load Google Maps', async function () {
    await driver.get('https://localhost:3000/AboutUs');

    // Wait for the iframe to load
    const iframe = await driver.wait(until.elementLocated(By.css('iframe')));
    await driver.switchTo().frame(iframe);

    // Wait for the map to load
    await driver.wait(until.elementLocated(By.id('widget-pane')));
    
    // Verify that the map is visible
    const map = await driver.findElement(By.css('.widget-pane-content-holder'));
    assert.equal(await map.isDisplayed(), true);
  });

  it('should have correct title', async function () {
    await driver.get('https://localhost:3000/AboutUs');

    const title = await driver.getTitle();
    assert.equal(title, 'Xango Location');
  });
});
