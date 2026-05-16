import { expect, Locator, Page } from '@playwright/test';

export class OrderPage {
  readonly page: Page;

  private readonly finishButton: Locator;
  private readonly backHomeButton: Locator;
  private readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    this.confirmationMessage = page.getByText('Thank you for your order!');
  }

  async assertOrderSummaryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async assertOrderConfirmationPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.confirmationMessage).toBeVisible();
  }

  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
