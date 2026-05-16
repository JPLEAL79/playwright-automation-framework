import { expect, Locator, Page } from '@playwright/test';

export type CheckoutInformation = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage {
  readonly page: Page;

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillCheckoutInformation(data: CheckoutInformation): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.postalCodeInput.fill(data.postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async continueWithCheckoutInformation(data: CheckoutInformation): Promise<void> {
    await this.fillCheckoutInformation(data);
    await this.clickContinue();
  }

  async assertFirstNameRequiredError(): Promise<void> {
    await expect(this.errorMessage).toHaveText('Error: First Name is required');
  }
}
