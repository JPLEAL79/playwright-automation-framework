import { test } from '../../fixtures/base.fixture';
import { logger } from '../../utils/logger';

test.describe('Cart', () => {
  test('cart with added product', async ({ cartPage, productInCart }) => {
    logger.info('Starting cart validation.');

    // Start from a cart that already contains the default product.
    await cartPage.assertCartPage();
  });
});
