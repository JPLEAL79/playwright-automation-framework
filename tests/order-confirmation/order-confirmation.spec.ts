import { test } from '../../fixtures/base.fixture';
import { checkoutData } from '../test-data/checkout/checkout.data';
import { logger } from '../../utils/logger';

test.describe('Order Confirmation', () => {
  // Complete the checkout flow and confirm the order.
  test('complete order successfully', async ({ cartPage, checkoutPage, orderPage, productInCart }) => {
    logger.info('Starting order confirmation flow.');

    await test.step('Go to checkout', async () => {
      await cartPage.clickCheckout();
    });

    await test.step('Fill out the checkout form', async () => {
      await checkoutPage.continueWithCheckoutInformation(checkoutData);
    });

    await test.step('Finish the order', async () => {
      await orderPage.clickFinish();
    });

    await test.step('Validate the confirmation page', async () => {
      await orderPage.assertOrderConfirmationPage();
    });
  });
});
