import { test } from '../../fixtures/base.fixture';
import { checkoutData } from '../test-data/checkout/checkout.data';
import { logger } from '../../utils/logger';

test.describe('Order Confirmation', () => {
  // Complete the checkout flow and confirm the order.
  test('complete order successfully', async ({ cartPage, checkoutPage, orderPage, productInCart }) => {
    logger.info('Starting order confirmation flow.');
    await cartPage.clickCheckout();
    await checkoutPage.continueWithCheckoutInformation(checkoutData);
    await orderPage.clickFinish();
    await orderPage.assertOrderConfirmationPage();
  });
});
