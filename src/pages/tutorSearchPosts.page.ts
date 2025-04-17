import { Locator, Page } from "@playwright/test";

export class TutorSearchPostPage {
  baseUrl = `http://localhost:3000/tutor/search`;
  page: Page;

  locatorSearchPostPageTitle = "#page-title";
  locatorPostCard = "#post-card";
  locatorPostCardTitle = "#post-card-title";
  locatorRequestButton = "#request-button";
  locatorToast = "[data-sonner-toast]";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }

  async getCardCount(): Promise<number> {
    await this.page.waitForSelector(this.locatorPostCard);
    return await this.page.locator(this.locatorPostCard).count();
  }

  async getCardTitle(index: number): Promise<string | null> {
    return await this.page
      .locator(this.locatorPostCard)
      .nth(index)
      .locator(this.locatorPostCardTitle)
      .textContent();
  }

  async submitRequestOnCard(index: number): Promise<string | null> {
    const button = this.page
      .locator(this.locatorPostCard)
      .nth(index)
      .locator(this.locatorRequestButton);
    await button.click();

    const cardTitle = this.getCardTitle(0);
    return cardTitle;
  }

  async isSubmitted(index: number): Promise<boolean> {
    const button = this.page
      .locator(this.locatorPostCard)
      .nth(index)
      .locator(this.locatorRequestButton);
    return await button.isDisabled();
  }

  async getToast(): Promise<Locator> {
    return this.page.locator(this.locatorToast);
  }
}
