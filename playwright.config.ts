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

  // Maximum time allowed for a full test.
  timeout: 30 * 1000,
  expect: {
    // Maximum time allowed for an assertion.
    timeout: 5 * 1000,
  },

  /* Keep execution predictable in local and corporate environments. */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Use a conservative local default and a slightly faster CI default. */
  workers: workerCount,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: process.env.PW_HEADED !== '1',
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',

    /* Keep evidence only when a test fails. */
    trace: 'retain-on-failure',
  },

  /* Configure the default desktop projects. */
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

    /* Enable these only when you want to run mobile coverage. */
    // {
    //   name: 'iphone-15',
    //   use: {
    //     ...devices['iPhone 15'],
    //     browserName: 'webkit',
    //   },
    // },
    // {
    //   name: 'galaxy-s23',
    //   use: {
    //     ...devices['Galaxy S23'],
    //     browserName: 'chromium',
    //   },
    // },
  ],
});
