import { test } from '../../fixtures/base.fixture';
import { checkoutData } from '../test-data/checkout/checkout.data';
import { logger } from '../../utils/logger';

test.describe('Checkout', () => {
  // Start with the T-shirt in the cart and go to the order summary.
  test('checkout with valid information', async ({ cartPage, checkoutPage, orderPage, productInCart }) => {
    logger.info('Starting checkout flow.');
    await cartPage.clickCheckout();
    await checkoutPage.continueWithCheckoutInformation(checkoutData);
    await orderPage.assertOrderSummaryPage();
  });
});
