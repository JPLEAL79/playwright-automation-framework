import { test } from '../../fixtures/base.fixture';
import { continueToOrderSummary } from '../../flows/purchase.flow';
import { checkoutData } from '../test-data/checkout/checkout.data';
import { logger } from '../../utils/logger';

test.describe('Checkout', () => {
  test('checkout with valid information', async ({ cartPage, checkoutPage, orderPage, productInCart }) => {
    logger.info('Starting checkout flow.');

    // Start with one product in the cart and continue to the summary step.
    await continueToOrderSummary(cartPage, checkoutPage, checkoutData);
    await orderPage.assertOrderSummaryPage();
  });
});
