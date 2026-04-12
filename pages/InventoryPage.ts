import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  // Page instance.
  readonly page: Page;

  // Inventory locators.
  private readonly tShirtAddToCartButton: Locator;
  private readonly shoppingCartLink: Locator;

  // Set up the page object.
  constructor(page: Page) {
    this.page = page;
    this.tShirtAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.shoppingCartLink = page.locator('#shopping_cart_container');
  }

  // Add the T-shirt product to the cart.
  async addProductToCart(): Promise<void> {
    await this.tShirtAddToCartButton.click();
  }

  // Open the cart.
  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  // Confirm the cart page is open.
  async assertCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
  }
}
