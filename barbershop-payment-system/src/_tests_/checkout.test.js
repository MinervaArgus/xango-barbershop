const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { render, fireEvent, waitFor, getByText, getByRole, getByLabelText } = require('@testing-library/react');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const options = new chrome.Options();
options.addArguments('--headless');

describe('Checkout Tests', function() {
    let driver;

    before(async function() {
        const service = new chrome.ServiceBuilder(path).build();
        chrome.setDefaultService(service);
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should show the amount on load', async function () {
        await driver.get('http://localhost:3000/checkout');
        const amount = await driver.findElement(By.tagName('h3')).getText();
        assert.equal(amount, '$10');
    });

    it('should show the purchase button', async function () {
        await driver.get('http://localhost:3000/checkout');
        const amount = await driver.findElement(By.id('StripeButton'));
        assert.notEqual(button, null);
    });

    it('should show the payment form on button click', async function () {
        await driver.get('http://localhost:3000/checkout');
        const amount = await driver.findElement(By.id('StripeButton'));
        await button.click();
        const form = await driver.findElement(By.tagName('form'));
        assert.notEqual(form, null);
    });

})