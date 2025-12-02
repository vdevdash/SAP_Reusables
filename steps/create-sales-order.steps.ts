import { expect } from "@playwright/test";
import { SAPLoginPage } from "../pages/sap-login-page";
import { CreateSalesOrderPage } from "../pages/create-sales-order-page";
import { createBdd } from "playwright-bdd";
import { DataTable } from "playwright-bdd";
const { Given, When, Then } = createBdd();
let loginPage: SAPLoginPage;
let salesOrderPage: CreateSalesOrderPage;
let createdOrderNumber: string;

Given(
  "I am logged into SAP with username {string} and password {string}",
  async ({ page }, username: string, password: string) => {
    loginPage = new SAPLoginPage(page);
    await loginPage.navigateToSAP(
      "https://in-blr-s30.corp.capgemini.com:8001/sap/bc/ui2/flp#Shell-appfinder"
    );
    console.log(
      "Navigated to SAP Fiori Launchpad url : https://in-blr-s30.corp.capgemini.com:8001/sap/bc/ui2/flp#Shell-appfinder"
    );
    await loginPage.login(username, password);
  }
);

Given("I navigate to Create Sales Orders application", async ({ page }) => {
  const page1 = await navigateToCreateSalesOrder({ page });
  salesOrderPage = new CreateSalesOrderPage(page1);
});

async function navigateToCreateSalesOrder({ page }) {
  await expect(page.locator(`[title="All"]`)).toBeVisible({ timeout: 60000 });
  const searchBox = page.locator('input[title="Search in catalog"]');
  await searchBox.click();
  await searchBox.fill("Create Sales Order");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  const createSalesOrderOption = page.getByRole("option", {
    name: "Create Sales Orders VA01",
  });
  await expect(createSalesOrderOption).toBeVisible();
  const page1Promise = page.waitForEvent("popup");
  await createSalesOrderOption.click();
  const page1 = await page1Promise;

  return page1;
}

When(
  "I fill the sales order initial data",
  async function ({}, table: DataTable) {
    const data = table.rowsHash();
    await salesOrderPage.fillInitialData(
      data["Order Type"],
      data["Sales Org"],
      data["Distr Channel"],
      data["Division"]
    );
  }
);

When("I click Continue", async function () {
  await salesOrderPage.clickContinue();
});

Then("I should see the sales order overview page", async ({ page }) => {
  await salesOrderPage.verifySalesOrderHeader();
});

When("I fill the header data", async function ({}, dataTable) {
  const data = dataTable.rowsHash();
  await salesOrderPage.fillHeaderData(
    data["Sold-to pt"],
    data["Ship-to pt"],
    data["Date"],
    data["Payment"],
    data["Cust Reference"] || "PO_test",
    data["Cust Ref Date"] || "30.11.2025"
  );

  // Verify header data was filled correctly
  await salesOrderPage.verifySalesOrderHeader();
});

When("I add an item with the following data", async function ({}, dataTable) {
  const data = dataTable.rowsHash();
  await salesOrderPage.addLineItem(
    data["Material"],
    data["Order Quantity"],
    data["Plant"]
  );
});

When("I save the sales order", async function () {
  await salesOrderPage.saveSalesOrder();
});

Then("the sales order should be created successfully", async function () {
  // Verify the sales order was created - all assertions are now handled in the page object
  createdOrderNumber = await salesOrderPage.verifySalesOrderCreated();

  // Verify the line item details if available
  if (this.itemData) {
    await salesOrderPage.verifySalesOrderCreated();
  }

  // Store the created order number for potential future use
  console.log(`📝 Order number stored: ${createdOrderNumber}`);
});
