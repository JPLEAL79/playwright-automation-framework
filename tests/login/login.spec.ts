import { test, expect } from '../../fixtures/base.fixture';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => await loginPage.openApplication());

  test('should login successfully with valid credentials', async ({ loginPage, credentials }) => {
    // Log in with valid credentials.
    await loginPage.login(credentials.username, credentials.password);

    // The Products title should be visible.
    await expect(loginPage.page.getByText('Products')).toBeVisible();
  });

  test('should show an error when credentials are empty', async ({ loginPage }) => {
    // Submit without credentials.
    await loginPage.submitLogin();
    await loginPage.assertUsernameRequiredError();
  });
});
