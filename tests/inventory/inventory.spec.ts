import { test } from '../../fixtures/base.fixture';

test.describe('Inventory - Add T-Shirt to Cart', () => {
  test('should add a T-Shirt to the cart successfully', async ({ inventoryPage, authenticatedUser }) => {
    // Start the test with an authenticated user.
    authenticatedUser;

    // Verify the inventory page is displayed after login.
    await inventoryPage.expectLoaded();

    // Add the T-Shirt from the inventory page.
    await inventoryPage.addItemToCart();

    // Open the cart after adding the item.
    await inventoryPage.openShoppingCart();

    // Verify that the selected item is visible in the cart.
    await inventoryPage.expectItemInCart();
  });
});
