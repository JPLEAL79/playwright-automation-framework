import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderPage } from '../pages/OrderPage';

/**
 * Fixtures compartidos: todos los tests importan `test` y `expect` desde este archivo.
 *
 * - Fixtures de página (loginPage, cartPage...): crean un page object por test.
 * - Fixtures de datos (credentials, productName): centralizan valores reutilizables.
 * - Fixtures de estado (authenticatedUser, productInCart): preparan precondiciones;
 *   pídelos en la firma del test para partir desde ese estado.
 */

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
  // Producto usado en los flujos de carrito y checkout.
  productName: async ({}, use) => {
    await use('Sauce Labs Backpack');
  },

  // Se leen desde el archivo .env seleccionado (ver playwright.config.ts).
  credentials: async ({}, use) => {
    const username = process.env.SAUCE_USERNAME;
    const password = process.env.SAUCE_PASSWORD;

    if (!username || !password) {
      throw new Error(
        'Faltan las variables de entorno SAUCE_USERNAME o SAUCE_PASSWORD.'
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

  // Usuario con sesión iniciada, ubicado en la página de inventario.
  authenticatedUser: async ({ loginPage, credentials }, use) => {
    await loginPage.openApplication();
    await loginPage.login(credentials.username, credentials.password);
    // Confirma que el login terminó antes de que el test continúe.
    await loginPage.assertSuccessfulLogin();
    await use();
  },

  // Parte de authenticatedUser: agrega productName y deja abierta la página del carrito.
  productInCart: async ({ authenticatedUser, inventoryPage, productName }, use) => {
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openShoppingCart();
    await use();
  },
});

export { expect };
