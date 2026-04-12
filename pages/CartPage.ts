import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
  // Playwright page instance.
  readonly page: Page;

  // Cart page locators.
  private readonly checkoutButton: Locator;
  private readonly cartProductLink: Locator;

  // Initialize the page object.
  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    this.cartProductLink = this.page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' });
  }

  // The user should stay on the cart page.
  async assertCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.cartProductLink).toBeVisible();
  }

  // Move from the cart page to checkout.
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
