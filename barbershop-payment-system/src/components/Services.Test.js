import { Builder, By, Key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

(async function example() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new Options().addArguments('--headless')).build();
  try {
    await driver.get('http://localhost:3000/');

    // Test Case 1: Check if the card is present
    let cardElement = await driver.findElement(By.className('card'));
    if (cardElement) {
      console.log('Test Case 1: Passed');
    } else {
      console.log('Test Case 1: Failed');
    }

    // Test Case 2: Check if the card title is correct
    let cardTitleElement = await driver.findElement(By.className('card-title'));
    let cardTitle = await cardTitleElement.getText();
    if (cardTitle === 'Service Name') {
      console.log('Test Case 2: Passed');
    } else {
      console.log('Test Case 2: Failed');
    }

    // Test Case 3: Check if the card subtitle is correct
    let cardSubtitleElement = await driver.findElement(By.className('card-subtitle'));
    let cardSubtitle = await cardSubtitleElement.getText();
    if (cardSubtitle === 'Precio de Servicio: €0.00') {
      console.log('Test Case 3: Passed');
    } else {
      console.log('Test Case 3: Failed');
    }

    // Test Case 4: Check if the change service button is present
    let changeServiceButtonElement = await driver.findElement(By.xpath("//button[contains(text(),'Cambiar Servicio')]"));
    if (changeServiceButtonElement) {
      console.log('Test Case 4: Passed');
    } else {
      console.log('Test Case 4: Failed');
    }

    // Test Case 5: Check if the delete service button is present
    let deleteServiceButtonElement = await driver.findElement(By.xpath("//button[contains(text(),'Eliminar Servicio')]"));
    if (deleteServiceButtonElement) {
      console.log('Test Case 5: Passed');
    } else {
      console.log('Test Case 5: Failed');
    }

    // Test Case 6: Check if changing the service name works
    let editServiceNameInputElement = await driver.findElement(By.name('Service Name'));
    await editServiceNameInputElement.sendKeys('New Service');
    await changeServiceButtonElement.click();
    let updatedServiceTitleElement = await driver.findElement(By.className('card-title'));
    let updatedServiceTitle = await updatedServiceTitleElement.getText();
    if (updatedServiceTitle === 'New Service') {
      console.log('Test Case 6: Passed');
    } else {
      console.log('Test Case 6: Failed');
    }

    // Test Case 7: Check if changing the service price works
    let editServicePriceInputElement = await driver.findElement(By.name('Service Price'));
    await editServicePriceInputElement.sendKeys('10');
    await changeServiceButtonElement.click();
    let updatedServiceSubtitleElement = await driver.findElement(By.className('card-subtitle'));
    let updatedServiceSubtitle = await updatedServiceSubtitleElement.getText();
    if (updatedServiceSubtitle === 'Precio de Servicio: €10.00') {
      console.log('Test Case 7: Passed');
    } else {
      console.log('Test Case 7: Failed');
    }

  

    // Test Case 8: Check if deleting the service works
    // need to work on this****

} catch(exception){

}
}); 
