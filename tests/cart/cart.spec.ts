import { test } from '../../fixtures/base.fixture';
import { logger } from '../../utils/logger';

test.describe('Cart', () => {
  test('should display the cart page with the selected item', async ({ cartPage, itemInCart }) => {
    // Start the test with one item already in the cart.
    itemInCart;
    logger.info('Starting cart validation.');

    // The cart page should show the selected item.
    await cartPage.assertCartPage();
    logger.info('The selected item is visible in the cart.');
  });
});
