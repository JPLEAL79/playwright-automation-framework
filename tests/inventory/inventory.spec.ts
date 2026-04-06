import { test, expect } from '../../fixtures/base.fixture';

test.describe('Inventory - Add T-Shirt to Cart', () => {
  test('should add a T-Shirt to the cart successfully', async ({ page, inventoryPage, authenticatedUser }) => {
    // Add the T-Shirt from the inventory page.
    await inventoryPage.addItemToCart();

    // Open the cart after adding the item.
    await inventoryPage.openShoppingCart();

    // Verify that the selected item is visible in the cart.
    await expect(page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
  });
});
