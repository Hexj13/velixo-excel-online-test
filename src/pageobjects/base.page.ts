import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly pageUrl: string;

  constructor(page: Page, pageUrl: string = '') {
    this.page = page;
    this.pageUrl = pageUrl;
  }

  async navigate(
    waitUntil: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' = 'domcontentloaded'
  ) {
    await this.page.goto(this.pageUrl, { waitUntil });
  }
}
