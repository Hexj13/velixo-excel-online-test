import { allure } from 'allure-playwright';
import { test as base } from '@playwright/test';
import { MainPage } from '../pageobjects/main.page';
import { SignInPage } from '../pageobjects/signIn.page';
import { loginSteps } from '../utils/loginSteps';
import { ExcelPage } from '../pageobjects/excel.page';
import { FormulasModalComponent } from '../pageobjects/components/formulasModal.component';
import { formulas } from '@constants';

let beforeEachStep: () => Promise<void>;
const todayDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

const test = base.extend<{
  mainPage: MainPage;
  signInPage: SignInPage;
  excelPage: ExcelPage;
  formulasModalComponent: FormulasModalComponent;
}>({
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await use(signInPage);
  },
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  },
  excelPage: async ({ page }, use) => {
    const excelPage = new ExcelPage(page);
    await use(excelPage);
  },
  formulasModalComponent: async ({ page }, use) => {
    const formulasModalComponent = new FormulasModalComponent(page);
    await use(formulasModalComponent);
  },
});

test.describe('Work with formulas', () => {
  test.beforeEach(async ({ mainPage, signInPage }) => {
    beforeEachStep = async () => await loginSteps(mainPage, signInPage);
  });

  test('Insert =today() formula in cell A2', async ({
    mainPage,
    excelPage,
    page,
    formulasModalComponent,
  }) => {
    allure.description(
      'Check the correctness of =today() formula and comparison with current date'
    );
    allure.parameter(
      ' ✅ Expected result',
      'Formula inserted in cell A2 and current date is the same as the date in the cell A2'
    );

    await test.step('Sign up new user', beforeEachStep);

    await test.step('Click create blank workbook button', async () => {
      await mainPage.clickCreateBlankWorkbookBtn();
    });

    await test.step('Check excel page visible', async () => {
      await Promise.all([
        excelPage.expectPageVisible(),
        page.waitForResponse(
          resp =>
            resp
              .url()
              .includes(
                'https://excel.officeapps.live.com/x/_vti_bin/DynamicGridContent.json/GetRangeContentJson'
              ) && resp.status() === 200
        ),
      ]);
    });

    await test.step('Fill box name', async () => {
      await excelPage.fillBoxName('A2');
    });

    await test.step('Click formula button', async () => {
      await excelPage.clickFormulaBtn();
    });

    await test.step('Expect formulas modal visible', async () => {
      await formulasModalComponent.expectModalVisible();
    });

    await test.step('Fill search input in modal', async () => {
      await formulasModalComponent.fillSearchInput(formulas.today);
    });

    await test.step('Click insert button in modal', async () => {
      await formulasModalComponent.clickInsertBtn();
    });

    await test.step('Expect formulas modal hidden', async () => {
      await formulasModalComponent.expectModalVisible(false);
    });

    await test.step('Fill box name', async () => {
      await excelPage.fillBoxName('A2');
    });

    await test.step('Check active cell content', async () => {
      await excelPage.checkActiveCellContent(todayDate);
      await allure.attachment('screenshot', await page.screenshot(), 'image/png');
    });
  });
});
