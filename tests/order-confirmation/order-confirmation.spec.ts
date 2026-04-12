import { test } from '../../fixtures/base.fixture';
import { completeOrder } from '../../flows/purchase.flow';
import { checkoutData } from '../test-data/checkout/checkout.data';
import { logger } from '../../utils/logger';

test.describe('Order Confirmation', () => {
  test('complete order successfully', async ({ cartPage, checkoutPage, orderPage, productInCart }) => {
    logger.info('Starting order confirmation flow.');

    // Complete the purchase flow and verify the confirmation screen.
    await completeOrder(cartPage, checkoutPage, orderPage, checkoutData);
    await orderPage.assertOrderConfirmationPage();
  });
});
