import { test as base, Browser, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { TutorSearchPostPage } from "../pages/tutorSearchPosts.page";
import { testUsers } from "../data/test-users";
import { TutorRequestsPage } from "../pages/tutorRequests.page";

type baseFixtures = {
  context: Awaited<ReturnType<Browser["newContext"]>>;
  page: Page;
  loginPage: LoginPage;
  searchPostPage: TutorSearchPostPage;
  tutorRequestsPage: TutorRequestsPage;
};

export const test = base.extend<baseFixtures>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    return context;
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto("http://localhost:3000");
    await page.evaluate(() => localStorage.removeItem("auth"));
    await use(page);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  searchPostPage: async ({ page }, use) => {
    await use(new TutorSearchPostPage(page));
  },
  tutorRequestsPage: async ({ page }, use) => {
    await use(new TutorRequestsPage(page));
  },
});
