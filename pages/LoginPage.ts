import { Locator, Page } from '@playwright/test';

export class LoginPage {
  // Store the Playwright page instance used by this page object.
  readonly page: Page;

  // Keep the login page locators in one place.
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  // Build the page object and map the elements we will use in the tests.
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'username' });
    this.passwordInput = page.getByRole('textbox', { name: 'password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Open the login page using the configured base URL.
  async openApplication(): Promise<void> {
    await this.page.goto('/');
  }

  // Fill the login form and submit it.
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Submit the form without typing credentials.
  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  // Read the validation message shown after a failed login attempt.
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }
}
