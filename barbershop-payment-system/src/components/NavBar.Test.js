import { expect } from 'chai';
import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { describe, it, beforeEach, afterEach } from 'mocha';

describe('NavigationBar', function() {
  let driver;

  beforeEach(async function() {
    // Set up the Chrome driver
    const chromeOptions = new Options();
    chromeOptions.addArguments('--headless', '--disable-gpu', '--no-sandbox');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

    // Navigate to the page with the NavigationBar component
    await driver.get('http://localhost:3000');
  });

  afterEach(async function() {
    // Quit the driver
    await driver.quit();
  });

  it('should display the Xango logo', async function() {
    const logo = await driver.findElement(By.css('a.navbar-brand'));

    expect(await logo.getAttribute('href')).to.equal('http://localhost:3000/Home');
  });

  it('should display the Book Appointment link', async function() {
    const link = await driver.findElement(By.css('a[href="/appointments"]'));

    expect(await link.getText()).to.equal('Book Appointment');
  });

  it('should display the View Styles link', async function() {
    const link = await driver.findElement(By.css('a[href="/HairStyles"]'));

    expect(await link.getText()).to.equal('View Styles');
  });

  it('should display the View Products link', async function() {
    const link = await driver.findElement(By.css('a[href="/Products"]'));

    expect(await link.getText()).to.equal('View Products');
  });

  it('should display the View Pricing link', async function() {
    const link = await driver.findElement(By.css('a[href="/HairPricing"]'));

    expect(await link.getText()).to.equal('View Pricing');
  });

  it('should display the About Us link', async function() {
    const link = await driver.findElement(By.css('a[href="/AboutUs"]'));

    expect(await link.getText()).to.equal('About Us');
  });

  it('should display the Admin Dashboard button when not on the Admin pages', async function() {
    const button = await driver.findElement(By.css('a[href="/AdminLogin"]'));

    expect(await button.getText()).to.equal('Admin Dashboard');
  });

  it('should display the Logout button when on the Admin page', async function() {
    await driver.get('http://localhost:3000/Admin');

    const button = await driver.findElement(By.css('button'));

    expect(await button.getText()).to.equal('Logout');
  });
});


  

