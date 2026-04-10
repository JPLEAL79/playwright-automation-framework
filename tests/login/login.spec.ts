import { test } from '../../fixtures/base.fixture';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => await loginPage.openApplication());

  test('logs in successfully with valid credentials', async ({ loginPage, credentials }) => {
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.assertSuccessfulLogin();
  });

  test('does not allow login with empty credentials', async ({ loginPage }) => {
    // Submit without credentials.
    await loginPage.submitLogin();
    await loginPage.assertUsernameRequiredError();
  });
});
