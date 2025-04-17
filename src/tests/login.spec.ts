import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import { LoginPage } from "../pages/login.page";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test("Input fields should display as the data that was filled", async ({
  loginPage,
}) => {
  await loginPage.fillEmailPassword("s0@g.com", "1234");

  expect(await loginPage.getEmail()).toBe("s0@g.com");
  expect(await loginPage.getPassword()).toBe("1234");
});

test("Redirects to home page after successful login", async ({
  loginPage,
}) => {});
