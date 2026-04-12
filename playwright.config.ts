import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const testEnvironment = process.env.TEST_ENV ?? 'dev';
const environmentFile = path.resolve(
  __dirname,
  'config',
  'environments',
  `.env.${testEnvironment}`
);

// Load the selected environment file before Playwright reads the config.
dotenv.config({ path: environmentFile });

const workerCount = process.env.PW_WORKERS
  ? Number(process.env.PW_WORKERS)
  : process.env.CI
    ? 2
    : 1;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Keep execution predictable in local and corporate environments. */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Use a conservative local default and a slightly faster CI default. */
  workers: workerCount,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: !!process.env.CI,
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',

    /* Keep evidence only when a test fails. */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   reuseExistingServer: !process.env.CI,
  // },
});
