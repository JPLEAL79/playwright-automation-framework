import { expect, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openShoppingCart(): Promise<void> {
    await this.page.locator('#shopping_cart_container').click();
  }

  async assertCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
  }
}
