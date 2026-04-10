import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  // Playwright page instance.
  readonly page: Page;

  // Login page locators.
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly productsTitle: Locator;

  // Initialize the page object.
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'username' });
    this.passwordInput = page.getByRole('textbox', { name: 'password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.productsTitle = page.getByText('Products');
  }

  // Open the login page.
  async openApplication(): Promise<void> {
    await this.page.goto('/');
  }

  // Fill the form and submit it.
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Submit the form as-is.
  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  // The user should land on the inventory page after login.
  async assertSuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.productsTitle).toBeVisible();
  }

  // The username required message should be visible.
  async assertUsernameRequiredError(): Promise<void> {
    await expect(this.errorMessage).toHaveText('Epic sadface: Username is required');
  }
}
