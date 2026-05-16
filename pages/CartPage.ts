import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  }

  async assertCartPage(productName: string): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.page.getByRole('link', { name: productName })).toBeVisible();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
