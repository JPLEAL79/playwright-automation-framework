import { test } from '../../fixtures/base.fixture';
import { logger } from '../../utils/logger';

test.describe('Inventory - Cart', () => {
  test('adds a T-shirt to the cart successfully', async ({ inventoryPage, authenticatedUser }) => {
    // Start the test with an authenticated user.
    authenticatedUser;
    logger.info('Starting inventory to cart flow.');

    // Add the item and open the cart.
    await inventoryPage.addItemToCart();
    await inventoryPage.openShoppingCart();

    // The user should land on the cart page.
    await inventoryPage.assertCartPage();
    logger.info('The cart page is visible after adding the item.');
  });
});
