import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  // Playwright page instance.
  readonly page: Page;

  // Inventory page locators.
  private readonly tShirtAddToCartButton: Locator;
  private readonly shoppingCartLink: Locator;

  // Initialize the page object.
  constructor(page: Page) {
    this.page = page;
    this.tShirtAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.shoppingCartLink = page.locator('#shopping_cart_container');
  }

  // Add the default product to the cart.
  async addProductToCart(): Promise<void> {
    await this.tShirtAddToCartButton.click();
  }

  // Open the cart.
  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  // The user should land on the cart page.
  async assertCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
  }
}
