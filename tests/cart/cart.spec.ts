import { test } from '../../fixtures/base.fixture';
import { logger } from '../../utils/logger';

test.describe('Cart', () => {
  // Start with the T-shirt product already in the cart.
  test('cart with added product', async ({ cartPage, productInCart }) => {
    logger.info('Starting cart validation.');
    await cartPage.assertCartPage();
  });
});
