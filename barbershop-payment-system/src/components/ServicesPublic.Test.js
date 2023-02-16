import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import assert from 'assert';

describe('Service Component', () => {
  let driver;

  before(async () => {
    const options = new Options();
    options.addArguments('--headless'); // Run Chrome headlessly
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should render the component with correct props', async () => {
    await driver.get('http://localhost:3000'); // Update with the URL of your app

    // Find the container element
    const container = await driver.findElement(By.className('justify-content-md-center'));
    
    // Check that the container has only one child element
    const children = await container.findElements(By.css('*'));
    assert.strictEqual(children.length, 1, 'Container should have only one child element');
    
    // Find the card element
    const card = await container.findElement(By.css('.card'));

    // Check that the card element has the expected properties
    const cardImg = await card.findElement(By.css('.card-img-top'));
    assert(await cardImg.getAttribute('src') === 'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png', 'Card image source is not correct');

    const cardHeader = await card.findElement(By.css('.card-header'));
    assert(await cardHeader.getText() === 'Type of Service', 'Card header is not correct');

    const cardBody = await card.findElement(By.css('.card-body'));
    assert(await cardBody.getText() === '€Service Price', 'Card body is not correct');
  });
});

  