import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Shared credentials loaded from the selected environment file.
type Credentials = {
  username: string;
  password: string;
};

// Custom fixtures available across the test suite.
type AppFixtures = {
  credentials: Credentials;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authenticatedUser: void;
};

export const test = base.extend<AppFixtures>({
  credentials: async ({}, use) => {
    const username = process.env.SAUCE_USERNAME;
    const password = process.env.SAUCE_PASSWORD;

    if (!username || !password) {
      throw new Error(
        'Missing SAUCE_USERNAME or SAUCE_PASSWORD environment variables.'
      );
    }

    await use({ username, password });
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  authenticatedUser: async ({ loginPage, credentials }, use) => {
    // Start the test with a logged-in user.
    await loginPage.openApplication();
    await loginPage.login(credentials.username, credentials.password);
    await use();
  },
});

export { expect };
