import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

describe('About Us Page', function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should load Google Maps', async function () {
    await driver.get('http://localhost:3000/about-us');

    // Wait for the iframe to load
    const iframe = await driver.wait(until.elementLocated(By.tagName('iframe')));
    await driver.switchTo().frame(iframe);

    // Wait for the map to load
    await driver.wait(until.elementLocated(By.id('widget-pane')));
    
    // Verify that the map is visible
    const map = await driver.findElement(By.css('.widget-pane-content-holder'));
    assert.equal(await map.isDisplayed(), true);
  });

  it('should have correct title', async function () {
    await driver.get('http://localhost:3000/about-us');

    const title = await driver.getTitle();
    assert.equal(title, 'Xango Location');
  });
});
