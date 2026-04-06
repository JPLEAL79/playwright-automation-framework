import { test } from '../../fixtures/base.fixture';

test.describe('Inventory - Add T-Shirt to Cart', () => {
  test('should add a T-Shirt to the cart successfully', async ({ inventoryPage, authenticatedUser }) => {
    // Add the item and open the cart.
    await inventoryPage.addItemToCart();
    await inventoryPage.openShoppingCart();

    // The item should be visible in the cart.
    await inventoryPage.assertItemInCart();
  });
});
