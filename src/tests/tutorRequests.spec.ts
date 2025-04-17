import { testUsers } from "../data/test-users";
import { test } from "../fixtures/base";
import { expect } from "@playwright/test";

let cardTitle: string | null = null;

test.beforeEach(async ({ page, loginPage, searchPostPage }) => {
  const tutor = testUsers.tutor0;
  await loginPage.loginWith(tutor.email, tutor.password);
  await expect(page).toHaveURL(/\/tutor\/?/);

  await searchPostPage.goto();
  await expect(page).toHaveURL(/\/tutor\/search/);
});

test.describe.serial("Test Create And Delete Request", () => {
  test("should show submitted request in tutor's request table", async ({
    page,
    searchPostPage,
    tutorRequestsPage,
  }) => {
    const cardIndex = 1;

    const cardCount = await searchPostPage.getCardCount();
    expect(cardCount).toBeGreaterThan(0);

    cardTitle = await searchPostPage.submitRequestOnCard(cardIndex);
    expect(cardTitle).toBeDefined();

    const toast = await searchPostPage.getToast();
    await expect(toast).toBeVisible();

    await searchPostPage.goto();
    await expect(page).toHaveURL(/\/tutor\/search/);

    const isSubscribed = await searchPostPage.isSubmitted(cardIndex);
    expect(isSubscribed).toBe(true);

    await tutorRequestsPage.goto();
    await expect(page).toHaveURL(/\/tutor\/requests/);

    const isContainsTitle = await tutorRequestsPage.isContainsTitle(cardTitle!);
    expect(isContainsTitle).toBe(true);
  });

  test("Should delete a submitted request", async ({
    page,
    searchPostPage,
    tutorRequestsPage,
  }) => {
    await tutorRequestsPage.goto();
    await expect(page).toHaveURL(/\/tutor\/requests/);
  });
});
