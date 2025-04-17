import { Locator, Page } from "@playwright/test";

export class TutorRequestsPage {
  baseUrl = "http://localhost:3000/tutor/requests";
  page: Page;

  locatorRequestTable = "#requests-table";
  locatorRequestTableRow = "[data-testid='requests-table-row']";

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

  async deleteRequestByTitle(title: string): Promise<boolean> {
    const row = this.page
      .locator('[data-testid="requests-table-row"]')
      .filter({ hasText: title });

    const cancelButton = row.getByRole("button", { name: "Cancel" });

    if (await cancelButton.isVisible()) {
      await cancelButton.click();

      await this.page.waitForTimeout(1000); // or await toast to be hidden

      const isDisabled = await cancelButton.isDisabled();

      const statusCell = row.locator("td").nth(3); // Assuming 4th column is "Status"
      const statusText = await statusCell.textContent();

      if (!statusText) return false;
      return isDisabled && statusText.toLowerCase().includes("canceled");
    }

    return false;
  }

  async getRequestRowByTitle(title: string): Promise<Locator> {
    return this.page
      .locator(this.locatorRequestTableRow, { hasText: title })
      .first();
  }
}
