import { testUsers } from "../data/test-users";
import { test } from "../fixtures/base";
import { expect } from "@playwright/test";

test.beforeEach(async ({ page, loginPage, searchPostPage }) => {
  const tutor = testUsers.tutor0;
  await loginPage.loginWith(tutor.email, tutor.password);
  await expect(page).toHaveURL(/\/tutor\/?/);

  await searchPostPage.goto();
  await expect(page).toHaveURL(/\/tutor\/search/);
});

test("Tutor can request the student post", async ({ page, searchPostPage }) => {
  const cardIndex = 0;

  const cardCount = await searchPostPage.getCardCount();
  expect(cardCount).toBeGreaterThan(0);

  await searchPostPage.submitRequestOnCard(cardIndex);

  const toast = await searchPostPage.getToast();
  await expect(toast).toBeVisible();

  await searchPostPage.goto();
  await expect(page).toHaveURL(/\/tutor\/search/);

  const isSubscribed = await searchPostPage.isSubmitted(cardIndex);
  expect(isSubscribed).toBe(true);
});
