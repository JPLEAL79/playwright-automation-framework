import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  // Store the Playwright page used by this page object.
  readonly page: Page;

  // Keep the inventory page locators in one place.
  private readonly tShirtAddToCartButton: Locator;
  private readonly shoppingCartLink: Locator;

  // Build the page object and map the elements used in inventory actions.
  constructor(page: Page) {
    this.page = page;
    this.tShirtAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.shoppingCartLink = page.locator('#shopping_cart_container');
  }

  // Add an item to the cart from the inventory page.
  async addItemToCart(): Promise<void> {
    await this.tShirtAddToCartButton.click();
    
  }

  // Open the shopping cart from the inventory page.
  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
    
  }
}
