// Test cases modified by Jackson Nevins from a copy of the original tests that Elijah Doss made.
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path.replace(/\.bin/, ''); //After many hours of troubleshooting i realized that the default path was adding a .bin folder where there was none so i fixed it by doing this. - JN
const chromeBinaryPath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const options = new chrome.Options().headless().setChromeBinaryPath(chromeBinaryPath);


let driver;

beforeAll(async () => {
  console.log('Creating WebDriver instance...');
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  console.log('WebDriver instance created successfully.');
});

afterAll(async () => {
  if (driver !== undefined) {
    console.log('Quitting WebDriver instance...');
    await driver.quit();
    console.log('WebDriver instance quit successfully.');
  }
});

it('should show the amount on load', async () => {
  await driver.get('http://localhost:3000/checkOut');
  await driver.wait(until.elementLocated(By.tagName('h3')), 10000);
  const amount = await driver.findElement(By.tagName('h3')).getText();
  expect(amount).toEqual('$10');
});

it('should show the purchase button', async () => {
  await driver.get('http://localhost:3000/checkOut');
  await driver.wait(until.elementLocated(By.id('StripeButton')), 10000);
  const button = await driver.findElement(By.id('StripeButton'));
  expect(button).not.toBeNull();
});

it('should show the payment form on button click', async () => {
  await driver.get('http://localhost:3000/checkOut');
  await driver.wait(until.elementLocated(By.id('StripeButton')), 10000);
  const button = await driver.findElement(By.id('StripeButton'));
  await button.click();
  await driver.wait(until.elementLocated(By.tagName('form')), 10000);
  const form = await driver.findElement(By.tagName('form'));
  expect(form).not.toBeNull();
});
