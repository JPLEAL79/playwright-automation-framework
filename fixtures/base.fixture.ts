import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderPage } from '../pages/OrderPage';

// Test credentials.
type Credentials = {
  username: string;
  password: string;
};

// Shared fixtures.
type AppFixtures = {
  credentials: Credentials;
  authenticatedUser: void;
  itemInCart: void;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderPage: OrderPage;
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

  cartPage: async ({ page }, use) => {
    // Create the cart page object.
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    // Create the checkout page object.
    await use(new CheckoutPage(page));
  },

  orderPage: async ({ page }, use) => {
    // Create the order page object.
    await use(new OrderPage(page));
  },

  // Log in before the test starts.
  authenticatedUser: async ({ loginPage, credentials }, use) => {
    // Start with a logged-in user.
    await loginPage.openApplication();
    await loginPage.login(credentials.username, credentials.password);
    await use();
  },

  itemInCart: async ({ authenticatedUser, inventoryPage }, use) => {
    // Start with one item already in the cart.
    await inventoryPage.addItemToCart();
    await inventoryPage.openShoppingCart();
    await use();
  },
});

// Re-export expect from the shared fixture file.
export { expect };
