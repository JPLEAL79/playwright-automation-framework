import { test } from '../../fixtures/base.fixture';
import { logger } from '../../utils/logger';

test.describe('Cart', () => {
  test('cart with added product', async ({ cartPage, productInCart, productName }) => {
    logger.info('Starting cart validation.');
    await cartPage.assertCartPage(productName);
  });
});
