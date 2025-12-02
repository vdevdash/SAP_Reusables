import { Page, FrameLocator, Locator, expect } from "@playwright/test";

export class CreateSalesOrderPage {
  private iframe: FrameLocator;
  private searchBox: Locator;
  private createSalesOrderOption: Locator;
  private orderTypeInput: Locator;
  private salesOrgInput: Locator;
  private distrChannelInput: Locator;
  private divisionInput: Locator;
  private continueButton: Locator;
  private custReferenceInput: Locator;
  private custRefDateInput: Locator;
  private soldToInput: Locator;
  private shipToInput: Locator;
  private pytTermsInput: Locator;
  private saveButton: Locator;
  private note: Locator;
  private standardOrderInput: Locator;
  private gridCell: Locator;
  private reqDelivDateInput: Locator;
  private materialCell: Locator;
  private materialTextbox: Locator;
  private quantityCell: Locator;
  private quantityTextbox: Locator;
  private plantCell: Locator;
  private plantTextbox: Locator;

  constructor(private page: Page) {
    // MCP verified: Search box locator - use placeholder pattern
    this.searchBox = this.page.getByPlaceholder("Search");
    this.createSalesOrderOption = this.page.getByRole("option", {
      name: "Create Sales Orders VA01",
    });

    // Initialize iframe locator (will be set after navigation)
    this.iframe = this.page
      .locator("#application-SalesDocument-create")
      .contentFrame();

    // Initialize all iframe-dependent locators using xpath with lsdata attribute
    // Initial screen fields - discovered via MCP browser inspection
    this.orderTypeInput = this.page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtVBAK-AUART')]");
    this.salesOrgInput = this.iframe.locator(
      "//input[contains(@lsdata, 'ctxtVBAK-VKORG')]"
    );
    this.distrChannelInput = this.iframe.locator(
      "//input[contains(@lsdata, 'ctxtVBAK-VTWEG')]"
    );
    this.divisionInput = this.iframe.locator(
      "//input[contains(@lsdata, 'ctxtVBAK-SPART')]"
    );
    this.continueButton = this.iframe.getByRole("button", { name: "Continue" });

    // Header fields - discovered via MCP browser inspection on Overview screen
    this.soldToInput = this.iframe.locator(
      "//input[contains(@lsdata, 'ctxtKUAGV-KUNNR')]"
    );
    this.shipToInput = this.iframe.locator(
      "//input[contains(@lsdata, 'ctxtKUWEV-KUNNR')]"
    );
    this.custReferenceInput = this.iframe.locator(
      "//input[contains(@lsdata, 'txtVBKD-BSTKD')]"
    );
    this.custRefDateInput = this.iframe.locator(
      "//input[contains(@lsdata, 'ctxtVBKD-BSTDK')]"
    );
    this.pytTermsInput = this.iframe.locator(
      "//input[contains(@lsdata, 'ctxtVBKD-ZTERM')]"
    );

    this.saveButton = this.iframe.getByRole("button", { name: "Save" });
    this.note = this.iframe.getByRole("note");
    this.standardOrderInput = this.iframe.getByRole("textbox", {
      name: "Standard Order",
    });
    this.gridCell = this.iframe.getByRole("gridcell");
    this.reqDelivDateInput = this.iframe.getByRole("textbox", {
      name: "Requested Delivery Date of the Document",
    });

    // Line item locators - Using SAP table cell ID-based approach (MOST RELIABLE)
    // ISSUE DISCOVERED: Input elements don't exist until cells are clicked/activated
    // SOLUTION: Target specific table cells by their SAP-generated IDs, then find input elements
    // MCP discovered cell IDs: tbl4736[1,2]=Material, tbl4736[1,4]=Quantity, tbl4736[1,13]=Plant

    // Material field - using exact SAP cell ID (row 1, column 2)
    this.materialCell = this.iframe.locator(
      '//span[contains(@lsdata, "ctxtRV45A-MABNR[1,0]")]'
    );

    this.materialTextbox = this.iframe
      .locator('//input[contains(@lsdata, "ctxtRV45A-MABNR[1,0]")]')
      .first();

    // Order Quantity field - using exact SAP cell ID (row 1, column 4)
    this.quantityCell = this.iframe
      .locator('//span[contains(@lsdata, "txtRV45A-KWMENG[3,0]")]')
      .first();
    this.quantityTextbox = this.iframe
      .locator('//input[contains(@lsdata, "txtRV45A-KWMENG[3,0]")]')
      .first();

    // Plant field - using exact SAP cell ID (row 1, column 13)
    // MCP TESTING RESULT: Does not create editable input when clicked
    this.plantCell = this.iframe
      .locator('//span[contains(@lsdata, "ctxtVBAP-WERKS[12,0]")]')
      .first();
    this.plantTextbox = this.iframe
      .locator('//input[contains(@lsdata, "ctxtVBAP-WERKS[12,0]")]')
      .first();
  }

  async fillInitialData(
    orderType: string,
    salesOrg: string,
    distrChannel: string,
    division: string
  ) {
    await expect(this.orderTypeInput).toBeVisible({ timeout: 10000 });
    await this.orderTypeInput.click();
    await this.orderTypeInput.fill(orderType);
    await this.salesOrgInput.fill(salesOrg);
    await this.distrChannelInput.fill(distrChannel);
    await this.divisionInput.fill(division);
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.page.waitForTimeout(2000);
  }

  async verifySalesOrderHeader() {
    await expect(
      this.page.getByRole("heading", {
        name: "Create Standard Order: Overview",
      })
    ).toBeVisible();
  }

  async fillHeaderData(
    soldTo: string,
    shipTo: string,
    date: string,
    payment: string,
    custReference: string,
    custRefDate: string
  ) {
    // MCP verified locators - click then fill for each field
    // Sold-To Party
    await this.soldToInput.click();
    await this.soldToInput.fill(soldTo);
    await this.page.waitForTimeout(1000);

    // Ship-To Party - MCP verified locator
    await this.shipToInput.click();
    await this.shipToInput.fill(shipTo);
    await this.page.waitForTimeout(1000);

    // Cust. Reference - MCP verified locator
    await this.custReferenceInput.click();
    await this.custReferenceInput.fill(custReference);

    // Cust. Ref. Date - MCP verified locator
    await this.custRefDateInput.click();
    await this.custRefDateInput.fill(custRefDate);

    // Payment Terms - MCP verified locator
    await this.pytTermsInput.click();
    await this.pytTermsInput.fill(payment);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1000);
  }

  async addLineItem(material: string, quantity: string, plant: string) {
    await this.page.waitForTimeout(1000);

    // // MCP verified: Material field - click cell first to activate, then find input
    // await this.materialCell.click();
    // await this.page.waitForTimeout(500);

    // Wait for material textbox to appear after cell activation
    await expect(this.materialTextbox).toBeVisible({ timeout: 10000 });
    await this.materialTextbox.click();
    await this.materialTextbox.type(material);
    // await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1500);

    // // MCP verified: Order Quantity field
    // await this.quantityCell.click();
    // await this.page.waitForTimeout(500);

    await expect(this.quantityCell).toBeVisible({ timeout: 10000 });
    await this.quantityCell.click();
    await this.quantityTextbox.type(quantity);
    // await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1500);

    // MCP verified: Plant field (if plant is provided)
    if (plant) {
      // await this.plantCell.click();
      // await this.page.waitForTimeout(500);

      await expect(this.plantCell).toBeVisible({ timeout: 10000 });
      await this.plantCell.click();
      await this.plantTextbox.type(plant);
      await this.page.keyboard.press("Enter");
      await this.page.waitForTimeout(1000);
    }
  }

  async saveSalesOrder() {
    await this.saveButton.click();
    await this.page.waitForTimeout(3000);
  }

  async verifySalesOrderCreated(): Promise<string> {
    const successMessage = this.note.filter({ hasText: "Standard Order" });
    await expect(successMessage).toBeVisible({ timeout: 10000 });

    const messageText = await successMessage.textContent();
    const orderNumber = messageText?.match(
      /Standard Order (\d+) has been saved/
    )?.[1];

    if (!orderNumber) {
      throw new Error(`Could not find order number in: ${messageText}`);
    }

    return orderNumber;
  }

  async getSalesOrderNumber(): Promise<string> {
    const orderNumberField = await this.standardOrderInput.inputValue();
    return orderNumberField;
  }
}
