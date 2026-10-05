import { test } from '../../fixtures/base.fixture';
import { logger } from '../../utils/logger';

test.describe('Inventory - Cart', () => {
  test('add product to cart', async ({ inventoryPage, cartPage, authenticatedUser, productName }) => {
    logger.info('Starting inventory to cart flow.');

    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openShoppingCart();
    await cartPage.assertCartPage(productName);
  });
});
