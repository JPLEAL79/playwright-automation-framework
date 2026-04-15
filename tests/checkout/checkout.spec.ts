import { test } from '../../fixtures/base.fixture';
import { checkoutData } from '../test-data/checkout/checkout.data';
import { logger } from '../../utils/logger';

test.describe('Checkout', () => {
  // Start with the T-shirt product in the cart and move to the order summary.
  test('checkout with valid information', async ({ cartPage, checkoutPage, orderPage, productInCart }) => {
    logger.info('Starting checkout flow.');

    await test.step('Go to checkout', async () => {
      await cartPage.clickCheckout();
    });

    await test.step('Fill out the checkout form', async () => {
      await checkoutPage.continueWithCheckoutInformation(checkoutData);
    });

    await test.step('Validate the order summary page', async () => {
      await orderPage.assertOrderSummaryPage();
    });
  });
});
