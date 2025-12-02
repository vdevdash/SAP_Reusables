// pages/sales-order-page.ts
import { expect, type Locator, type Page } from "@playwright/test";
import {
  getCurrentDate,
  generatePONumber,
  waitForSAPResponse,
} from "../helpers/sap-utils";

export class SalesOrderPage {
  readonly page: Page;
  readonly orderTypeInput: Locator;
  readonly salesOrgInput: Locator;
  readonly distChannelInput: Locator;
  readonly divisionInput: Locator;
  readonly poNumberInput: Locator;
  readonly poDateInput: Locator;
  readonly soldToPartyInput: Locator;
  readonly shipToPartyInput: Locator;
  readonly paymentTermsInput: Locator;
  readonly materialInput: Locator;
  readonly quantityInput: Locator;
  readonly plantInput: Locator;
  readonly saveButton: Locator;
  readonly statusBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderTypeInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtVBAK-AUART')]");
    this.salesOrgInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtVBAK-VKORG')]");
    this.distChannelInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtVBAK-VTWEG')]");
    this.divisionInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtVBAK-SPART')]");
    this.poNumberInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'txtVBKD-BSTKD')]");
    this.poDateInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtVBKD-BSTDK')]");
    this.soldToPartyInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtKUAGV-KUNNR')]");
    this.shipToPartyInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtKUWEV-KUNNR')]");
    this.paymentTermsInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtVBKD-ZTERM')]");
    this.materialInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtRV45A-MABNR')]");
    this.quantityInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'txtRV45A-KWMENG')]");
    this.plantInput = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//input[contains(@lsdata, 'ctxtVBAP-WERKS')]");
    this.saveButton = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//button[contains(@lsdata, 'btn[11]')]");
    this.statusBar = page
      .locator("#application-SalesDocument-create")
      .contentFrame()
      .locator("//*[contains(@lsdata, 'sbar')]");
  }

  async fillInitialDetails() {
    await this.orderTypeInput.click();
    await this.orderTypeInput.fill("OR");
    await expect(this.orderTypeInput).toHaveValue("OR");

    await this.salesOrgInput.click();
    await this.salesOrgInput.fill("SOGE");
    await expect(this.salesOrgInput).toHaveValue("SOGE");

    await this.distChannelInput.click();
    await this.distChannelInput.fill("SD");
    await expect(this.distChannelInput).toHaveValue("SD");

    await this.divisionInput.click();
    await this.divisionInput.fill("SS");
    await expect(this.divisionInput).toHaveValue("SS");

    await this.page.keyboard.press("Enter");
    await this.page.screenshot({ path: "screenshots/order-header.png" });
  }

  async fillOrderHeader() {
    const poNumber = await generatePONumber();
    await this.poNumberInput.click();
    await this.poNumberInput.fill(poNumber);
    await expect(this.poNumberInput).toHaveValue(poNumber);

    const poDate = await getCurrentDate();
    await this.poDateInput.click();
    await this.poDateInput.fill(poDate);
    await expect(this.poDateInput).toHaveValue(poDate);

    await this.soldToPartyInput.click();
    await this.soldToPartyInput.fill("15022");
    await expect(this.soldToPartyInput).toHaveValue("15022");

    await this.shipToPartyInput.click();
    await this.shipToPartyInput.fill("15022");
    await expect(this.shipToPartyInput).toHaveValue("15022");

    await this.paymentTermsInput.click();
    await this.paymentTermsInput.fill("0001");
    await expect(this.paymentTermsInput).toHaveValue("0001");

    await this.page.keyboard.press("Enter");
    await this.page.screenshot({ path: "screenshots/order-details.png" });
  }

  async fillItemDetails() {
    await this.materialInput.click();
    await this.materialInput.fill("1000059");
    await expect(this.materialInput).toHaveValue("1000059");

    await this.quantityInput.click();
    await this.quantityInput.fill("1");
    await expect(this.quantityInput).toHaveValue("1");

    await this.plantInput.click();
    await this.plantInput.fill("S100");
    await expect(this.plantInput).toHaveValue("S100");

    await this.page.keyboard.press("Enter");
    await this.page.screenshot({ path: "screenshots/item-entry.png" });
  }

  async saveOrder() {
    await this.saveButton.click();
    //await waitForSAPResponse(this.page, '/api/save'); // Adjust URL pattern
    await this.page.screenshot({ path: "screenshots/save.png" });
  }

  async verifySuccess() {
    const successMessage = await this.statusBar.textContent();
    await expect(successMessage).toMatch(/Standard Order \d+ has been saved/);
  }
}
