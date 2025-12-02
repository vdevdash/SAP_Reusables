import { Page, Locator } from "@playwright/test";

export class SAPLoginPage {
  private userInput: Locator;
  private passwordInput: Locator;
  private logonButton: Locator;

  constructor(private page: Page) {
    this.userInput = this.page.getByRole("textbox", { name: "User" });
    this.passwordInput = this.page.getByRole("textbox", { name: "Password" });
    this.logonButton = this.page.getByRole("button", { name: "Log On" });
  }

  async navigateToSAP(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.userInput.fill(username);
    await this.passwordInput.fill(password);
    await this.logonButton.click();

    // Wait for navigation
    await this.page.waitForTimeout(3000);
  }
}
