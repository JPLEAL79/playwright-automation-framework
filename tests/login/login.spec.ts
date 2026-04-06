import { test } from '../../fixtures/base.fixture';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Open the app before each login test.
    await loginPage.openApplication();
  });

  test('should login successfully with valid credentials', async ({ loginPage, credentials }) => {
    // Log in with the credentials from the active environment.
    await loginPage.login(credentials.username, credentials.password);

    // Verify the login completed successfully.
    await loginPage.expectSuccessfulLogin();
  });

  test('should show an error when credentials are empty', async ({ loginPage }) => {
    // Submit the form without entering any credentials.
    await loginPage.submitLogin();

    // Verify the message shown for a missing username.
    await loginPage.expectUsernameRequiredError();
  });
});
