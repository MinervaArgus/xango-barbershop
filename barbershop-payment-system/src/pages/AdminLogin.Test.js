const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Builder, By, Key, until } = webdriver;

const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options().addArguments('--headless'))
  .build();

describe('Sign In Page', function() {
  beforeEach(async function() {
    await driver.get('http://localhost:3000/signin');
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('should load the sign in page', async function() {
    const title = await driver.getTitle();
    expect(title).toEqual('Sign in');
  });

  it('should display the email input', async function() {
    const emailInput = await driver.findElement(By.name('email'));
    expect(await emailInput.isDisplayed()).toBeTruthy();
  });

  it('should display the password input', async function() {
    const passwordInput = await driver.findElement(By.name('password'));
    expect(await passwordInput.isDisplayed()).toBeTruthy();
  });

  it('should allow the user to sign in with valid credentials', async function() {
    const emailInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('password'));
    const signInButton = await driver.findElement(By.tagName('button'));

    await emailInput.sendKeys('validemail@example.com');
    await passwordInput.sendKeys('validpassword', Key.RETURN);

    await driver.wait(until.urlContains('/admin'), 5000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/admin');
  });

  it('should display an error message with invalid credentials', async function() {
    const emailInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('password'));
    const signInButton = await driver.findElement(By.tagName('button'));

    await emailInput.sendKeys('invalidemail@example.com');
    await passwordInput.sendKeys('invalidpassword', Key.RETURN);

    const errorMessage = await driver.findElement(By.className('error-message'));
    expect(await errorMessage.isDisplayed()).toBeTruthy();
  });
});
