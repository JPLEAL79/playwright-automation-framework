import { test } from '../../fixtures/base.fixture';

test.describe('Inventory - Cart', () => {
  test('adds a T-shirt to the cart successfully', async ({ inventoryPage, authenticatedUser }) => {
    // Start the test with an authenticated user.
    authenticatedUser;

    // Add the item and open the cart.
    await inventoryPage.addItemToCart();
    await inventoryPage.openShoppingCart();

    // The user should land on the cart page.
    await inventoryPage.assertCartPage();
  });
});
