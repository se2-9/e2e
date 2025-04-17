import { test } from "../fixtures/base";
import { LoginPage } from "../pages/login.page";
import { testUsers } from "../data/test-users";
import { expect } from "@playwright/test";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test("Input fields should display as the data that was filled", async ({
  page,
  loginPage,
}) => {
  const student = testUsers["student0"];

  await loginPage.fillEmailPassword(student.email, student.password);

  expect(await loginPage.getEmail()).toBe(student.email);
  expect(await loginPage.getPassword()).toBe(student.password);

  await loginPage.clickLogin();

  await expect(page).toHaveURL("http://localhost:3000/student");
});
