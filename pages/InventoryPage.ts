import { expect, Page } from '@playwright/test';

/**
 * Listado de productos que se muestra después del login.
 */
export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });

    await product.getByRole('button', { name: 'Add to cart' }).click();
    // El botón cambia a "Remove" cuando el producto ya está en el carrito.
    await expect(product.getByRole('button', { name: 'Remove' })).toBeVisible();
  }

  async openShoppingCart(): Promise<void> {
    await this.page.locator('#shopping_cart_container').click();
  }
}
