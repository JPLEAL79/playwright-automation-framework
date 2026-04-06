import { test, expect } from '../../fixtures/base.fixture';
import { AUTH_ERROR_MESSAGES } from '../constants/auth.constants';
import { INVENTORY_ROUTES, INVENTORY_UI_TEXT } from '../constants/inventory.constants';

test.describe('Authentication - Login Flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Open the application before each login scenario.
    await loginPage.openApplication();
  });

  test('should login successfully with valid credentials', async ({ page, loginPage, credentials }) => {
    // Log in with environment-based credentials.
    await loginPage.login(credentials.username, credentials.password);

    // Verify that the inventory page is displayed.
    await expect(page).toHaveURL(INVENTORY_ROUTES.page);
    await expect(page.getByText(INVENTORY_UI_TEXT.title)).toBeVisible();
  });

  test('should show an error when credentials are empty', async ({ loginPage }) => {
    await loginPage.submitLogin();

    // Verify the validation message for missing username.
    expect(await loginPage.getErrorMessage()).toBe(AUTH_ERROR_MESSAGES.usernameRequired);
  });
});
