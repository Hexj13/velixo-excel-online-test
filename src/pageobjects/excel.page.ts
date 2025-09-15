import { expect } from '@playwright/test';
import { BasePage } from './base.page';
// import { FormulasType } from '@types';

export class ExcelPage extends BasePage {
  iframe = this.page.frameLocator('#WacFrame_Excel_0');
  boxNameInput = this.iframe.locator('//div[@data-unique-id="FormulaBar-NameBox"]//input');
  formulaInput = this.iframe.locator(
    '//div[@id="formulaBarTextDivId_textElement"]/div[@class="ewa-rteLine"]'
  );
  activeCellDiv = this.iframe.locator(
    '//div[@id="m_excelWebRenderer_ewaCtl_readoutElementWrapper"]'
  );
  activeCellLabel1 = this.activeCellDiv.locator(
    '//label[@id="m_excelWebRenderer_ewaCtl_readoutElement1"]'
  );
  activeCellLabel2 = this.activeCellDiv.locator(
    '//label[@id="m_excelWebRenderer_ewaCtl_readoutElement2"]'
  );
  formulaBtn = this.iframe.locator('//div[@id="m_excelWebRenderer_ewaCtl_functionboxButton"]');
  comitBtn = this.iframe.locator('//div[@id="m_excelWebRenderer_ewaCtl_okboxButton"]');

  async fillBoxName(name: string) {
    await this.boxNameInput.click();
    await this.page.waitForTimeout(1000);
    await this.boxNameInput.fill(name);
    await this.boxNameInput.press('Enter');
    await this.page.waitForTimeout(1000);
  }

  async clickFormulaBtn() {
    await this.formulaBtn.click();
  }

  async checkActiveCellContent(content: string) {
    const label1 = await this.activeCellLabel1.getAttribute('aria-label');
    const label2 = await this.activeCellLabel2.getAttribute('aria-label');
    const normalizedContent = content.replace(/^0+/, '');
    expect(label1).toContain(normalizedContent);
    expect(label2).toContain(normalizedContent);
  }

  async expectPageVisible() {
    await expect(this.boxNameInput).toBeVisible({ timeout: 30000 });
    await expect(this.formulaInput).toBeVisible({ timeout: 30000 });
  }
}
