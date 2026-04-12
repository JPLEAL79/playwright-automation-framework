import { test } from '../../fixtures/base.fixture';
import { logger } from '../../utils/logger';

test.describe('Inventory - Cart', () => {
  test('add product to cart', async ({ inventoryPage, authenticatedUser }) => {
    logger.info('Starting inventory to cart flow.');

    // Start logged in, add the T-shirt product, and open the cart.
    await inventoryPage.addProductToCart();
    await inventoryPage.openShoppingCart();
    await inventoryPage.assertCartPage();
  });
});
