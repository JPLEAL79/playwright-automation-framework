import { test } from '../../fixtures/base.fixture';

test.describe('Cart', () => {
  test('should display the cart page with the selected item', async ({ cartPage, itemInCart }) => {
    // Start the test with one item already in the cart.
    itemInCart;

    // The cart page should show the selected item.
    await cartPage.assertCartPage();
  });
});
