import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderPage } from '../pages/OrderPage';

// Credentials used to log in.
type Credentials = {
  username: string;
  password: string;
};

// Shared fixtures available in the tests.
type AppFixtures = {
  credentials: Credentials;
  loginPage: LoginPage;
  authenticatedUser: void;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderPage: OrderPage;
  itemInCart: void;
};

export const test = base.extend<AppFixtures>({
  credentials: async ({}, use) => {
    // Read login data from the environment.
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
    // Initialize the login page.
    await use(new LoginPage(page));
  },

  authenticatedUser: async ({ loginPage, credentials }, use) => {
    // Open the app and log in before the test starts.
    await loginPage.openApplication();
    await loginPage.login(credentials.username, credentials.password);
    await use();
  },

  inventoryPage: async ({ page }, use) => {
    // Initialize the inventory page.
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    // Initialize the cart page.
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    // Initialize the checkout page.
    await use(new CheckoutPage(page));
  },

  orderPage: async ({ page }, use) => {
    // Initialize the order page.
    await use(new OrderPage(page));
  },

  itemInCart: async ({ authenticatedUser, inventoryPage }, use) => {
    // Depend on authenticatedUser so the login happens before adding an item.
    // Leave one item in the cart before the test starts.
    await inventoryPage.addItemToCart();
    await inventoryPage.openShoppingCart();
    await use();
  },
});

// Re-export expect so every test imports from one place.
export { expect };
