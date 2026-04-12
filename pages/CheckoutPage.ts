import { expect, Locator, Page } from '@playwright/test';

export type CheckoutInformation = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage {
  // Playwright page instance.
  readonly page: Page;

  // Checkout form locators.
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  // Initialize the page object.
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Fill the checkout form.
  async fillCheckoutInformation(data: CheckoutInformation): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.postalCodeInput.fill(data.postalCode);
  }

  // Continue to the next checkout step.
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  // Fill the form and continue in one business action.
  async continueWithCheckoutInformation(data: CheckoutInformation): Promise<void> {
    await this.fillCheckoutInformation(data);
    await this.clickContinue();
  }

  // The checkout page should show the first-name-required validation.
  async assertFirstNameRequiredError(): Promise<void> {
    await expect(this.errorMessage).toHaveText('Error: First Name is required');
  }
}
