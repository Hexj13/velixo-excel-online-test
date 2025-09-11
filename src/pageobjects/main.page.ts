import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class MainPage extends BasePage {
  override pageUrl = 'https://excel.cloud.microsoft/';
  createBlankWorkbookButton = this.page.locator('//button[@data-testid="0300"]');
  signInButton = this.page.locator('//button[@data-testid="0100"]');
  appLogo = this.page.locator('//div[@id="appLogoContainer"]');
  signedInLogo = this.page.locator('//div[@id="meInitialsButton"]');

  async clickCreateBlankWorkbookBtn() {
    await this.createBlankWorkbookButton.click();
  }

  async clickSignInBtn() {
    await this.signInButton.click();
  }

  async expectAppLogoVisible(visible = true) {
    await expect(this.appLogo).toBeVisible({ visible });
  }

  async expectPageVisible(stage: 'unsigned' | 'signed') {
    if (stage === 'unsigned') {
      await expect(this.signInButton).toBeVisible();
    } else if (stage === 'signed') {
      await expect(this.signedInLogo).toBeVisible();
    }
    await expect(this.createBlankWorkbookButton).toBeVisible();
  }
}
