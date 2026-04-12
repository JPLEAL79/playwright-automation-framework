import { test } from '../../fixtures/base.fixture';
import { checkoutData } from '../test-data/checkout/checkout.data';
import { logger } from '../../utils/logger';

test.describe('Checkout', () => {
  test('checkout with valid information', async ({ cartPage, checkoutPage, orderPage, productInCart }) => {
    logger.info('Starting checkout flow.');

    // Start with one product in the cart and continue to the summary step.
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInformation(checkoutData);
    await checkoutPage.clickContinue();
    await orderPage.assertOrderSummaryPage();
  });
});
