# Playwright Automation Framework

Playwright + TypeScript framework for end-to-end web automation.

Author: Juan Pablo Leal

## Overview
This project automates the main SauceDemo flows with Playwright, TypeScript, shared fixtures, page objects, and Allure reporting.

## Setup
- npm install
- npx playwright install

## Run Tests
### Full suite
- npm test
- npm run test:headed

### By environment
- npm run test:dev
- npm run test:qa
- npm run test:dev:headed
- npm run test:qa:headed

### Specific runs
- npx playwright test tests/login/login.spec.ts
- npx playwright test -g "login with valid credentials"
- npx playwright test --project=chrome

### Debug
- npx playwright test --debug
- Add `await page.pause();` in the test where you want to stop the flow.

### Allure
- npm run test:allure:headless
- npm run test:allure:headed

## Project Structure
```text
playwright-automation-framework
|
|-- config/
|   |-- environments/
|       |-- .env.example
|       |-- .env.dev
|       |-- .env.qa
|
|-- fixtures/
|   |-- base.fixture.ts
|
|-- pages/
|   |-- LoginPage.ts
|   |-- InventoryPage.ts
|   |-- CartPage.ts
|   |-- CheckoutPage.ts
|   |-- OrderPage.ts
|
|-- tests/
|   |-- login/
|   |-- inventory/
|   |-- cart/
|   |-- checkout/
|   |-- order-confirmation/
|   |-- test-data/
|       |-- checkout/
|
|-- utils/
|   |-- logger.ts
|
|-- playwright.config.ts
|-- package.json
|-- tsconfig.json
|-- README.md
```

## Notes
- Environment values live in config/environments.
- Only .env.example is committed; local .env files stay out of the repo.
- Fixtures handle shared setup and reusable state.
- Test data stays separate from test flow.
- Page objects keep UI actions and page-level assertions together.
- Tests run headless by default.
- Use the headed scripts when you want to see the browser.
- Allure is ready when you need richer reports.
