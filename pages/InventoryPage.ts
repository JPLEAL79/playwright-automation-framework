import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  // Store the Playwright page used by this page object.
  readonly page: Page;

  // Keep the inventory locators in one place.
  private readonly tShirtAddToCartButton: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly pageTitle: Locator;
  private readonly cartItemLink: Locator;

  // Initialize the page and map the elements used in this flow.
  constructor(page: Page) {
    this.page = page;
    this.tShirtAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.shoppingCartLink = page.locator('#shopping_cart_container');
    this.pageTitle = page.getByText('Products');
    this.cartItemLink = page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' });
  }

  // Add the T-Shirt to the cart.
  async addItemToCart(): Promise<void> {
    await this.tShirtAddToCartButton.click();
  }

  // Verify that the inventory page loaded successfully.
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.pageTitle).toBeVisible();
  }

  // Verify that the selected item is visible in the cart.
  async expectItemInCart(): Promise<void> {
    await expect(this.cartItemLink).toBeVisible();
  }

  // Open the cart from the inventory page.
  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
