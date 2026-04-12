import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
  // Page instance.
  readonly page: Page;

  // Cart locators.
  private readonly checkoutButton: Locator;
  private readonly cartProductLink: Locator;

  // Set up the page object.
  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    this.cartProductLink = this.page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' });
  }

  // Confirm the cart page is open.
  async assertCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.cartProductLink).toBeVisible();
  }

  // Go from the cart to checkout.
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
