import { Locator, Page } from "@playwright/test";

export class TutorRequestsPage {
  baseUrl = "http://localhost:3000/tutor/requests";
  page: Page;

  locatorRequestTable = "#requests-table";
  locatorRequestTableRow = "[data-testid='requests-table-row']";
  locatorToast = "[data-sonner-toast]";
  locatorCancelButton = "#cancel-button";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForSelector(this.locatorRequestTable);
  }

  async getRequestCardCount(): Promise<number> {
    return await this.page.locator(this.locatorRequestTableRow).count();
  }

  async isContainsTitle(title: string): Promise<boolean> {
    const rows = this.page.locator(this.locatorRequestTableRow);
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);

      const firstColText = await row.locator("td").first().innerText();
      if (firstColText?.trim() === title.trim()) {
        return true;
      }
    }

    return false;
  }

  getCancelButtonByTitle(title: string): Locator {
    return this.page
      .locator(this.locatorRequestTableRow)
      .filter({ hasText: title })
      .getByRole("button", { name: "Cancel" });
  }

  async getStatusTextByTitle(title: string): Promise<string | null> {
    const row = this.page
      .locator(this.locatorRequestTableRow)
      .filter({ hasText: title });
    const statusCell = row.locator("td").nth(3);

    return await statusCell.textContent();
  }

  async cancelRequestByTitle(title: string): Promise<void> {
    const cancelButton = this.getCancelButtonByTitle(title);
    await cancelButton.waitFor({ state: "visible", timeout: 5000 });

    const isAlreadyDisabled = await cancelButton.isDisabled();
    if (isAlreadyDisabled) {
      return;
    }

    if (await cancelButton.isDisabled()) {
      throw new Error(
        `Cancel button is already disabled for request: ${title}`,
      );
    }
    await cancelButton.click();
    await this.page.locator(this.locatorToast).waitFor({ state: "detached" });

    // const isDisabledAfter = await cancelButton.isDisabled();
    // const statusText = await this.getStatusTextByTitle(title);

    // console.log({ isDisabledAfter, statusText, title });

    // return !!statusText?.toLowerCase().includes("canceled") && isDisabledAfter;
  }

  async getRequestRowByTitle(title: string): Promise<Locator> {
    return this.page
      .locator(this.locatorRequestTableRow, { hasText: title })
      .first();
  }

  async getToast(): Promise<Locator> {
    return this.page.locator(this.locatorToast);
  }
}
