import { testUsers } from "../data/test-users";
import { test } from "../fixtures/base";
import { expect } from "@playwright/test";

let title: string | null = null;

test.beforeEach(async ({ page, loginPage, searchPostPage }) => {
  const tutor = testUsers.tutor0;
  await loginPage.loginWith(tutor.email, tutor.password);
  await expect(page).toHaveURL(/\/tutor\/?/);

  await searchPostPage.goto();
  await expect(page).toHaveURL(/\/tutor\/search/);
});

test.describe.serial("Tutor Request Flow", () => {
  test("Tutor can submit a request and see it appear in their request table", async ({
    page,
    searchPostPage,
    tutorRequestsPage,
  }) => {
    const cardIndex = 1;

    const cardCount = await searchPostPage.getCardCount();
    expect(cardCount).toBeGreaterThan(0);

    title = await searchPostPage.submitRequestOnCard(cardIndex);
    expect(title).toBeDefined();

    const toast = await searchPostPage.getToast();
    await expect(toast).toBeVisible();

    await searchPostPage.goto();
    await expect(page).toHaveURL(/\/tutor\/search/);

    const isSubscribed = await searchPostPage.isSubmitted(cardIndex);
    expect(isSubscribed).toBe(true);

    await tutorRequestsPage.goto();
    await expect(page).toHaveURL(/\/tutor\/requests/);

    const isContainsTitle = await tutorRequestsPage.isContainsTitle(title!);
    expect(isContainsTitle).toBe(true);
  });

  test("should cancel the submitted request and verify UI reflects change", async ({
    page,
    tutorRequestsPage,
  }) => {
    tutorRequestsPage.goto();
    await expect(page).toHaveURL(/\/tutor\/requests/);

    await tutorRequestsPage.cancelRequestByTitle(title!);

    const statusText = await tutorRequestsPage.getStatusTextByTitle(title!);
    expect(statusText?.toLowerCase()).toContain("canceled");

    const cancelButton = tutorRequestsPage.getCancelButtonByTitle(title!);
    await expect(cancelButton).toBeDisabled();
  });
});
