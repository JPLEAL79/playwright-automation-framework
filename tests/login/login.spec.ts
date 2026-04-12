import { test } from '../../fixtures/base.fixture';
import { logger } from '../../utils/logger';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.openApplication();
  });

  test('login with valid credentials', async ({ loginPage, credentials }) => {
    logger.info('Starting valid login test.');
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.assertSuccessfulLogin();
  });

  test('login with empty credentials', async ({ loginPage }) => {
    logger.info('Starting empty login validation.');
    await loginPage.submitLogin();
    await loginPage.assertUsernameRequiredError();
  });
});
