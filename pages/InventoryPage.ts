import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  // Playwright page instance.
  readonly page: Page;

  // Inventory page locators.
  private readonly tShirtAddToCartButton: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly cartItemLink: Locator;

  // Initialize the page object.
  constructor(page: Page) {
    this.page = page;
    this.tShirtAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.shoppingCartLink = page.locator('#shopping_cart_container');
    this.cartItemLink = page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' });
  }

  // Add the T-Shirt to the cart.
  async addItemToCart(): Promise<void> {
    await this.tShirtAddToCartButton.click();
  }

  // The item should be visible in the cart.
  async assertItemInCart(): Promise<void> {
    await expect(this.cartItemLink).toBeVisible();
  }

  // Open the cart.
  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
