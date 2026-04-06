import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Test credentials.
type Credentials = {
  username: string;
  password: string;
};

// Shared fixtures.
type AppFixtures = {
  credentials: Credentials;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authenticatedUser: void;
};

export const test = base.extend<AppFixtures>({
  credentials: async ({}, use) => {
    // Read credentials from the environment.
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
    // Create the login page object.
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    // Create the inventory page object.
    await use(new InventoryPage(page));
  },

  // Log in before the test starts.
  authenticatedUser: async ({ loginPage, credentials }, use) => {
    // Start with a logged-in user.
    await loginPage.openApplication();
    await loginPage.login(credentials.username, credentials.password);
    await use();
  },
});

// Re-export expect from the shared fixture file.
export { expect };
