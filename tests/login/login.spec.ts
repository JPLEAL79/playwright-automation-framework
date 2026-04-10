import { test } from '../../fixtures/base.fixture';
import { logger } from '../../utils/logger';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => await loginPage.openApplication());

  test('logs in successfully with valid credentials', async ({ loginPage, credentials }) => {
    logger.info('Starting valid login test.');
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.assertSuccessfulLogin();
    logger.info('Login completed successfully.');
  });

  test('does not allow login with empty credentials', async ({ loginPage }) => {
    logger.info('Starting empty login validation.');

    // Submit without credentials.
    await loginPage.submitLogin();
    await loginPage.assertUsernameRequiredError();
    logger.info('The username required message is visible.');
  });
});
