import { expect, Locator, Page } from '@playwright/test';

export class OrderPage {
  // Page instance.
  readonly page: Page;

  // Order flow locators.
  private readonly finishButton: Locator;
  private readonly backHomeButton: Locator;
  private readonly confirmationMessage: Locator;

  // Set up the page object.
  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    this.confirmationMessage = page.getByText('Thank you for your order!');
  }

  // Confirm the order summary page is open.
  async assertOrderSummaryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  // Finish the order.
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  // Confirm the order confirmation message is visible.
  async assertOrderConfirmationPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.confirmationMessage).toBeVisible();
  }

  // Go back to the inventory page.
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
