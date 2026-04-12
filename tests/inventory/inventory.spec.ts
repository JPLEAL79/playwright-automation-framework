import { test } from '../../fixtures/base.fixture';
import { addDefaultProductAndOpenCart } from '../../flows/purchase.flow';
import { logger } from '../../utils/logger';

test.describe('Inventory - Cart', () => {
  test('add product to cart', async ({ inventoryPage, authenticatedUser }) => {
    logger.info('Starting inventory to cart flow.');

    // Start from an authenticated session and move the default product to the cart.
    await addDefaultProductAndOpenCart(inventoryPage);
    await inventoryPage.assertCartPage();
  });
});
