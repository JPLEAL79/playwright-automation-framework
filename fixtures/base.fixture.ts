import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderPage } from '../pages/OrderPage';

type Credentials = {
  username: string;
  password: string;
};

type AppFixtures = {
  credentials: Credentials;
  productName: string;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderPage: OrderPage;
  authenticatedUser: void;
  productInCart: void;
};

export const test = base.extend<AppFixtures>({
  productName: async ({}, use) => {
    await use('Sauce Labs Bolt T-Shirt');
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

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },

  authenticatedUser: async ({ loginPage, credentials }, use) => {
    await loginPage.openApplication();
    await loginPage.login(credentials.username, credentials.password);
    await use();
  },

  productInCart: async ({ authenticatedUser, inventoryPage, productName }, use) => {
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openShoppingCart();
    await use();
  },
});

export { expect };
