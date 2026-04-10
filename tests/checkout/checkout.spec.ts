import { test } from '../../fixtures/base.fixture';
import { checkoutData } from '../test-data/checkout/checkout.data';

test.describe('Checkout', () => {
  test('should continue to the order summary page', async ({ cartPage, checkoutPage, orderPage, itemInCart }) => {
    // Start the test with one item already in the cart.
    itemInCart;

    // Move from the cart page to checkout.
    await cartPage.clickCheckout();

    // Fill the checkout form and continue.
    await checkoutPage.fillCheckoutInformation(checkoutData);
    await checkoutPage.clickContinue();

    // The user should land on the order summary page.
    await orderPage.assertOrderSummaryPage();
  });
});
