import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Credentials = {
  username: string;
  password: string;
};

type AppFixtures = {
  loginPage: LoginPage;
  credentials: Credentials;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

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
});

export { expect };
