// import { test, expect } from '@playwright/test';
// import { chromium, Browser, BrowserContext, Page } from 'playwright';

// test.skip('has title', async ({}) => {

//   let browser: Browser | undefined;
//   let context: BrowserContext | undefined;
//   let page: Page | undefined;

//   // Launch the browser
//   browser = await chromium.launch({
//     headless: false, // Set to true for headless mode
//   });

//   // Create a new browser context with ignoreHTTPSErrors enabled
//   context = await browser.newContext({
//     ignoreHTTPSErrors: true, // Ignore SSL certificate errors
//   });

//   // Open a new page
//   page = await context.newPage();

//   // Navigate to the SAP system
//   await page.goto('https://in-blr-s30.corp.capgemini.com:8001/sap/bc/ui2/flp');

//   await page.waitForTimeout(25000);

//   // Add your login steps here if needed
//   // await page.fill('#username', 'Trainee23');
//   // await page.fill('#password', '23');
//   // await page.click('#login-button');

//   // Example actions extracted from the XML and converted to Playwright format
//   // Replace the selectors with those relevant to your SAP application
//   //await page.fill('#order_type_input', 'OR'); 
//   await page.fill('Sales Organization','SOGE');
//   await page.fill('#sales_organization_input', 'SOGE');
//   await page.fill('#distribution_channel_input', 'SD');
//   await page.fill('#division_input', 'SS');
//   await page.fill('#po_number_input', 'Test_PO_12345'); 
//   await page.fill('#po_date_input', '10/26/2023'); 
//   await page.fill('#sold_to_party_input', '15022'); 
//   await page.fill('#ship_to_party_input', '15022'); 
//   await page.fill('#material_input', '1000059'); 
//   await page.fill('#quantity_input', '1'); 
//   await page.fill('#plant_input', 'S100'); 

//   // Add Save action
//   await page.click('#save_button'); 

//   // Add assertions or further steps as needed

// });

// // Helper function for date formatting
// const getCurrentDate = () => {
//   const today = new Date();
//   return `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;
// };

// test.describe('SAP Sales Order', () => {
//   test('should create a sales order', async ({ browser }) => {
//     // Ensure test isolation with new context
//     const context = await browser.newContext({
//       ignoreHTTPSErrors: true, // Ignore SSL certificate errors
//     });
//     const page = await context.newPage();

//     // Navigate to VA01 transaction (assumed SAP GUI web interface)
//     await page.goto('https://in-blr-s30.corp.capgemini.com:8001/sap/bc/ui2/flp'); // Placeholder URL
    
//     await page.getByRole('textbox', { name: 'User' }).click();
//   await page.getByRole('textbox', { name: 'User' }).fill('Trainee23');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Sandbox23@2025');
//   await page.getByRole('button', { name: 'Log On' }).click();

//   const page1Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: 'Create Sales Orders VA01' }).click();
//   const page1 = await page1Promise;

//     // Enter Order Type
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-ZTERM')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-ZTERM')]").fill('OR');

//     // Enter Sales Organization
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-VKORG')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-VKORG')]").fill('SOGE');

//     // Enter Distribution Channel
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-VTWEG')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-VTWEG')]").fill('SD');

//     // Enter Division
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-SPART')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-SPART')]").fill('SS');

//     // Enter PO Number
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-BSTKD')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-BSTKD')]").fill('Test_PO_%random%');

//     // Enter PO Date
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-BSTDK')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBKD-BSTDK')]").fill('%=day(now())%.%=month(now())%.%=year(now())%');

//     // Enter Sold-To Party
//     await page1.locator("//input[contains(@lsdata, 'ctxtKUAGV-KUNNR')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtKUAGV-KUNNR')]").fill('15022');

//     // Enter Ship-To Party
//     await page1.locator("//input[contains(@lsdata, 'ctxtKUWEV-KUNNR')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtKUWEV-KUNNR')]").fill('15022');

//     // Enter Material
//     await page1.locator("//input[contains(@lsdata, 'ctxtRV45A-MABNR')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtRV45A-MABNR')]").fill('1000059');

//     // Enter Quantity
//     await page1.locator("//input[contains(@lsdata, 'txtRV45A-KWMENG')]").click();
//     await page1.locator("//input[contains(@lsdata, 'txtRV45A-KWMENG')]").fill('1');

//     // Enter Plant
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBAP-WERKS')]").click();
//     await page1.locator("//input[contains(@lsdata, 'ctxtVBAP-WERKS')]").fill('S100');

//     // Screenshot
//     await page1.screenshot({ path: 'screenshot.png' });

//     // Save Order
//     await page1.locator(".btn[aria-label='Save']").click();

//     // Capture Message
//     const message = await page1.locator(".status-bar").textContent();
//     console.log('Message:', message);

//     // Validate Message
//     await expect(message).toContain('Standard Order has been saved');

//     await context.close();

//   });

//   test('sales order creation', async ({browser}) => {
//     const context = await browser.newContext({
//       ignoreHTTPSErrors: true, // Ignore SSL certificate errors
//     });
//     const page = await context.newPage();

//     await page.goto('https://in-blr-s30.corp.capgemini.com:8001/sap/bc/ui2/flp');
//   // await page.getByRole('button', { name: 'Advanced' }).click();
//   // await page.getByRole('link', { name: 'Proceed to in-blr-s30.corp.' }).click();
//   await page.getByRole('textbox', { name: 'User' }).click();
//   await page.getByRole('textbox', { name: 'User' }).fill('Trainee23');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Sandbox23@2025');
//   await page.getByRole('button', { name: 'Log On' }).click();
//   const page1Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: 'Create Sales Orders VA01' }).click();
//   const page1 = await page1Promise;
//   await page1.locator('#application-SalesDocument-create').contentFrame().getByRole('textbox', { name: 'Sales Organization :" / "' }).click();
//   await page1.locator('#application-SalesDocument-create').contentFrame().getByRole('textbox', { name: 'Sales Organization :" / "' }).fill('SOGE');
//   })
  
// });

// import { SalesOrderPage } from '../pages/sap-pages';

// test.describe('SAP Sales Order Creation', () => {
//   test.only('should create a sales order successfully', async ({ browser }) => {
//     const context = await browser.newContext({
//       ignoreHTTPSErrors: true, // Ignore SSL certificate errors
//     });
//     const page = await context.newPage();

//     const salesOrderPage = new SalesOrderPage(page);
//     await salesOrderPage.goto();
//     await page.getByRole('textbox', { name: 'User' }).click();
//   await page.getByRole('textbox', { name: 'User' }).fill('Trainee23');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Sandbox23@2025');
//   await page.getByRole('button', { name: 'Log On' }).click();
//   const page1Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: 'Create Sales Orders VA01' }).click();
//   const page1 = await page1Promise;
//   const salesOrderPage1 = new SalesOrderPage(page1);
//     await salesOrderPage1.fillInitialDetails();
//     await salesOrderPage1.fillOrderHeader();
//     await salesOrderPage1.fillItemDetails();
//     await salesOrderPage1.saveOrder();
//     await salesOrderPage1.verifySuccess();

//     // Snapshot testing (optional)
//     await expect(page).toHaveScreenshot('order-success.png', { fullPage: true });

//     await context.close();
//   });
// });
