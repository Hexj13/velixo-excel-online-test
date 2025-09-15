import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SignInPage extends BasePage {
  emailInput = this.page.locator('//input[@type="email"]');
  nextBtn = this.page.locator('//input[@type="submit"]');
  usePasswordBtn = this.page.locator('//span[text()="Use your password"]');
  passwordInput = this.page.locator('//input[@type="password"]');
  nextBtnOnPasswordState = this.page.locator('//button[@type="submit"]');
  noBtn = this.page.locator('//button[text()="No"]');

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickUsePasswordBtn() {
    await this.usePasswordBtn.click();
  }

  async clickNextBtn() {
    await this.nextBtn.click();
  }

  async clickNextBtnOnPasswordState() {
    await this.nextBtnOnPasswordState.click();
  }

  async clickNoBtn() {
    await this.noBtn.click();
  }

  async stopAnimation() {
    await this.page.addStyleTag({
      content: `
      *,
      *:before,
      *:after {
        animation: none !important;
      }
    `,
    });
  }

  async expectPageVisible(state: 'email' | 'password') {
    if (state === 'email') {
      await expect(this.emailInput).toBeVisible();
      await expect(this.nextBtn).toBeVisible();
    } else if (state === 'password') {
      await expect(this.passwordInput).toBeVisible();
      await expect(this.nextBtnOnPasswordState).toBeVisible();
    }
  }
}
