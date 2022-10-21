// // this is psuedo code for potential test in the future
// // more will be added as sprints are completed


// // this is how you would set up the web drivers for selenium 
// function setupSeleniumWebDrivers() {
    
//     if (driver == null) {
//         System.out.println("Setting up ChromeDriver... ");
//         System.setProperty("webdriver.chrome.driver", PATH_TO_CHROME_DRIVER);
//         driver = new ChromeDriver();
//         System.out.print("Done!\n");
//     }

// }
// setupSeleniumWebDrivers;
// // end of set up 


// // test that refer to  responsive web pages 
// async function testAboutUs(){

//     let driver = await new Builder().forBrowser("chrome").build();
 
//     await driver.get("http://localhost:3000/aboutus");
        
//     var title = await driver.getTitle();
//     console.log('Title is:',title);

//     await driver.quit();

// }
// testAboutUs; 

// async function testHomePage(){

//     let driver = await new Builder().forBrowser("chrome").build();
 
//     await driver.get("http://localhost:3000/home");
        
//     var title = await driver.getTitle();
//     console.log('Title is:',title);

//     await driver.quit();

// }
// testHomePage; 

// async function testAppointmentPage(){

//     let driver = await new Builder().forBrowser("chrome").build();
 
//     await driver.get("http://localhost:3000/appointments");
        
//     var title = await driver.getTitle();
//     console.log('Title is:',title);

//     await driver.quit();

// }
// testAppointmentPage; 

// async function testAdminPage(){

//     let driver = await new Builder().forBrowser("chrome").build();
 
//     await driver.get("http://localhost:3000/admin");
        
//     var title = await driver.getTitle();
//     console.log('Title is:',title);

//     await driver.quit();

// }
// testAdminPage; 
// // end of page test


// // test for the navigation bar 

// async function testNavBar(){

// var expect = require('chai').expect;

// module.exports = {
//   'Navigation': function (browser) {
//     var expectedNavElements = ['Appointments', 'Admin', 'About Us'];

//     function testNavElements(elements) {
//       elements.value.forEach(function (element, index) {
//         browser.elementIdText(element.ELEMENT, function(res) {
//           expect(res.value).to.equal(expectedNavElements[index]);
//         });
//       });
//     }

//     browser
//       .url('http://localhost:3000/') 
//       .waitForElementVisible('#nav', 1000);

//     browser.expect.element('#nav').to.be.present;
//     browser.elements('css selector', '#nav > .item', testNavElements);
//     browser.end();
//   }
// };
// }
// testNavBar;
// // end of navigation bar test


// // admin product upload test
// // basic outline

// async function testAdminUploads(doc){

//         driver.findElement(By.cssSelector("")).click();
//         waitForPageLoaded();

//         Toolkit.getDefaultToolkit().getSystemClipboard().setContents(stringSelection, null);
       
//         waitForPageLoaded();
      
//         driver.findElement(By.cssSelector("")).click();
//         waitForPageLoaded();
// }
// testAdminUploads;
// // end of product upload test
// // need to change it to interact with the firebase

 
// // admin log in test 
// // uses email and password set up 
// function testAdminLogin(){
  
// let { email, pass } = require("./credentials.json");
  
// // set tab to web page
// let tabToOpen =
//     tab.get("http://localhost:3000/");
// tabToOpen
//     .then(function () {
  
//         // This will time out a page if it takes too long 
//         let findTimeOutP =
//             tab.manage().setTimeouts({
//                 implicit: 10000, 
//             });
//         return findTimeOutP;
//     })
//     .then(function () {
  
//         // Finding the username input
//         let promiseUsernameBox =
//             tab.findElement(swd.By.css(" data "));
//         return promiseUsernameBox;
//     })
//     .then(function (usernameBox) {
  
//         // Entering the username
//         let promiseFillUsername =
//             usernameBox.sendKeys(email);
//         return promiseFillUsername;
//     })
//     .then(function () {
//         console.log(
//             "Username entered successfully in" +
//             "Barbershop App"
//         );
  
//         // Finding the password input
//         let promisePasswordBox =
//             tab.findElement(swd.By.css(" password "));
//         return promisePasswordBox;
//     })
//     .then(function (passwordBox) {
  
//         // Entering the password
//         let promiseFillPassword =
//             passwordBox.sendKeys(pass);
//         return promiseFillPassword;
//     })
//     .then(function () {
//         console.log(
//             "Password entered successfully in" +
//             "Barbershop App"
//         );
  
//         // Finding the Sign In button
//         // depending on style
//         let promiseSignInBtn = tab.findElement(
//             swd.By.css(" .btn.btn ? ")
//         );
//         return promiseSignInBtn;
//     })
//     .then(function (signInBtn) {
  
//         // Clicking the Sign In button
//         let promiseClickSignIn = signInBtn.click();
//         return promiseClickSignIn;
//     })
//     .then(function () {
//         console.log("Successfully signed in Barbershop App");
//     })
//     .catch(function (err) {
//         console.log("Error ", err, " Oh no ");
//     });
// }
// testAdminLogin;
// // end of admin log in test


















