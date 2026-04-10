# Playwright Automation Framework

Playwright + TypeScript framework for end-to-end web automation.

---

## Overview

This repository implements an automated test framework for SauceDemo using:

- Playwright
- TypeScript
- Dotenv
- Page Object Model
- Shared fixtures

---

## Setup
npm install
npx playwright install

---

## Execution

### All tests
npm test

---

### By environment
npm run test:dev
npm run test:qa

---

### Specific execution
npx playwright test tests/login/login.spec.ts
npx playwright test -g "logs in successfully with valid credentials"
npx playwright test --project=chrome

---

### Debug
npx playwright test --debug
await page.pause();

---

### Report
npx playwright show-report

---

## Environment
config/environments/.env.<environment>
Example:
TEST_ENV=dev
BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce

---

## Project Structure

```text
playwright-automation-framework
|
|-- config/                      Environment configuration
|   `-- environments/            .env files by target environment
|       |-- .env.dev
|       |-- .env.qa
|       `-- .env.example
|
|-- fixtures/                    Shared fixtures and reusable states
|   `-- base.fixture.ts
|
|-- pages/                       Page Object Model layer
|   |-- LoginPage.ts
|   |-- InventoryPage.ts
|   |-- CartPage.ts
|   |-- CheckoutPage.ts
|   `-- OrderPage.ts
|
|-- tests/                       Test scenarios by feature
|   |-- login/
|   |-- inventory/
|   |-- cart/
|   |-- checkout/
|   |-- order-confirmation/
|   `-- test-data/
|       `-- checkout/
|
|-- utils/                       Shared utilities
|   `-- logger.ts
|
|-- playwright.config.ts         Playwright configuration
|-- package.json                 Dependencies and scripts
|-- tsconfig.json                TypeScript configuration
`-- README.md                    Project documentation
```

---

## Notes

- Credentials are managed through `.env` files
- Fixtures centralize setup and reusable state
- Test data is separated from test logic
- The framework follows the Page Object Model pattern

---

**Author:** Juan Pablo Leal
