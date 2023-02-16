const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("chromedriver").path;

const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

describe("AdminStyles Component", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should delete an image from the list", async function () {
    await driver.get("http://localhost:3000"); // replace with your URL

    // Wait for the images to load
    await driver.wait(until.elementLocated(By.css(".card-img-top")), 5000);

    // Get the number of images before deleting one
    const initialImageCount = await driver.findElements(By.css(".card")).then((elements) => elements.length);

    // Click the "Delete Image" button on the first image
    await driver.findElement(By.css(".card .btn-primary")).click();

    // Wait for the confirm dialog to appear and accept it
    await driver.switchTo().alert().accept();

    // Wait for the images to reload
    await driver.wait(until.stalenessOf(driver.findElement(By.css(".card"))), 5000);

    // Get the number of images after deleting one
    const finalImageCount = await driver.findElements(By.css(".card")).then((elements) => elements.length);

    // Ensure that the number of images has decreased by 1
    expect(finalImageCount).toEqual(initialImageCount - 1);
  });
});
