import { Locator, Page } from "@playwright/test";
import "dotenv/config";

export class LoginPage {
  baseUrl = `http://localhost:3000/login`;
  page: Page;
  locatorEmail = "#email";
  locatorPassword = "#password";
  locatorLoginButton = "#submit-login";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }

  async fillEmailPassword(email: string, password: string): Promise<void> {
    await this.page.locator(this.locatorEmail).fill(email);
    await this.page.locator(this.locatorPassword).fill(password);
  }

  async getEmail(): Promise<string> {
    return await this.page.locator(this.locatorEmail).inputValue();
  }

  async getPassword(): Promise<string> {
    return await this.page.locator(this.locatorPassword).inputValue();
  }

  async clickLogin(): Promise<void> {
    const loginButton = this.page.locator(this.locatorLoginButton);
    await loginButton.click();
  }

  async loginWith(email: string, password: string): Promise<void> {
    await this.goto();

    await this.fillEmailPassword(email, password);
    await this.clickLogin();
  }
}
