const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Checkout Page', function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should show the amount on load', async function () {
    await driver.get('http://yourwebsite.com/checkout');
    const amount = await driver.findElement(By.tagName('h3')).getText();
    assert.equal(amount, '$10'); // replace $10 with the expected amount on the page
  });

  it('should show the purchase button', async function () {
    await driver.get('http://yourwebsite.com/checkout');
    const button = await driver.findElement(By.id('StripeButton'));
    assert.notEqual(button, null); // check if the purchase button exists
  });

  it('should show the payment form on button click', async function () {
    await driver.get('http://yourwebsite.com/checkout');
    const button = await driver.findElement(By.id('StripeButton'));
    await button.click();
    const form = await driver.findElement(By.tagName('form'));
    assert.notEqual(form, null); // check if the payment form exists
  });
});
