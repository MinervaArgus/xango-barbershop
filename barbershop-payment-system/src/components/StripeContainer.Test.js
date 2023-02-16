import { Builder, By, Key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { expect } from 'chai';

describe('Stripe Payment Form', function () {
  let driver;

  before(async function () {
    const options = new Options();
    options.addArguments('-headless');

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should load the payment form', async function () {
    await driver.get('http://localhost:3000/stripe-container');

    const formElement = await driver.findElement(By.tagName('form'));
    expect(await formElement.isDisplayed()).to.be.true;
  });

  it('should submit the payment form with valid data', async function () {
    await driver.get('http://localhost:3000/stripe-container');

    const cardElement = await driver.findElement(By.id('cardNumber'));
    await cardElement.sendKeys('4242424242424242');

    const expElement = await driver.findElement(By.id('cardExpiry'));
    await expElement.sendKeys('1225');

    const cvcElement = await driver.findElement(By.id('cardCvc'));
    await cvcElement.sendKeys('123');

    const submitButton = await driver.findElement(By.id('submit'));
    await submitButton.click();

    const successMessage = await driver.wait(
      until.elementLocated(By.id('success-message')),
      5000
    );
    expect(await successMessage.isDisplayed()).to.be.true;
  });
});
