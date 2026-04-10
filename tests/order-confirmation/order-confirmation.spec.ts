import { test } from '../../fixtures/base.fixture';
import { checkoutData } from '../test-data/checkout/checkout.data';
import { logger } from '../../utils/logger';

test.describe('Order Confirmation', () => {
  test('should complete the order successfully', async ({ cartPage, checkoutPage, orderPage, itemInCart }) => {
    // Start the test with one item already in the cart.
    itemInCart;
    logger.info('Starting order confirmation flow.');

    // Move from the cart page to checkout.
    await cartPage.clickCheckout();

    // Fill the checkout form and continue.
    await checkoutPage.fillCheckoutInformation(checkoutData);
    logger.info('Checkout information was entered successfully.');
    await checkoutPage.clickContinue();

    // Finish the order from the order page.
    await orderPage.clickFinish();

    // The confirmation page should be visible.
    await orderPage.assertOrderConfirmationPage();
    logger.info('The order confirmation page is visible.');
  });
});
