import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly productsTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'username' });
    this.passwordInput = page.getByRole('textbox', { name: 'password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.productsTitle = page.getByText('Products');
  }

  async openApplication(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertSuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.productsTitle).toBeVisible();
  }

  async assertUsernameRequiredError(): Promise<void> {
    await expect(this.errorMessage).toHaveText('Epic sadface: Username is required');
  }
}
