import { expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { FormulasType } from '@types';

export class FormulasModalComponent extends BasePage {
  iframe = this.page.frameLocator('#WacFrame_Excel_0');
  container = this.iframe.locator('//div[contains(@class, "ms-Modal-scrollableContent")]');
  searchInput = this.container.locator('//input[@role="searchbox"]');
  formulaLocator = (text: string) =>
    this.page.locator(
      `//div[@data-automation-key="function"][contains(normalize-space(.), "${text}")]`
    );
  insertBtn = this.container.locator('//button[@aria-label="Insert"]');

  async fillSearchInput(text: FormulasType) {
    await this.searchInput.fill(text);
  }

  async clickFormula(text: FormulasType) {
    await this.formulaLocator(text).first().click();
  }

  async clickInsertBtn() {
    await this.insertBtn.click();
  }

  async expectModalVisible(visible = true) {
    await expect(this.container).toBeVisible({ visible });
    await expect(this.searchInput).toBeVisible({ visible });
  }
}
