import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  // Page instance.
  readonly page: Page;

  // Login locators.
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly productsTitle: Locator;

  // Set up the page object.
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'username' });
    this.passwordInput = page.getByRole('textbox', { name: 'password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.productsTitle = page.getByText('Products');
  }

  // Open the app.
  async openApplication(): Promise<void> {
    await this.page.goto('/');
  }

  // Fill the form and sign in.
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Submit the form as it is.
  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  // Confirm the user is on the inventory page.
  async assertSuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.productsTitle).toBeVisible();
  }

  // Confirm the username required message is visible.
  async assertUsernameRequiredError(): Promise<void> {
    await expect(this.errorMessage).toHaveText('Epic sadface: Username is required');
  }
}
