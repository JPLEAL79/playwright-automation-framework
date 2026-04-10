import { expect, Locator, Page } from '@playwright/test';

export class OrderPage {
  // Playwright page instance.
  readonly page: Page;

  // Order flow locators.
  private readonly finishButton: Locator;
  private readonly backHomeButton: Locator;
  private readonly confirmationMessage: Locator;

  // Initialize the page object.
  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    this.confirmationMessage = page.getByText('Thank you for your order!');
  }

  // The user should land on the order summary page.
  async assertOrderSummaryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  // Finish the order from the summary page.
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  // The order confirmation message should be visible.
  async assertOrderConfirmationPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.confirmationMessage).toBeVisible();
  }

  // Return to the inventory page.
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
