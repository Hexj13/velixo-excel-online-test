import { MainPage } from '../pageobjects/main.page';
import { SignInPage } from '../pageobjects/signIn.page';
import { test } from '@playwright/test';

export async function loginSteps(mainPage: MainPage, signInPage: SignInPage): Promise<void> {
  await test.step('Navigate to main page', async () => {
    await mainPage.navigate();
  });

  await test.step('Expect main page visible in unsigned state', async () => {
    await mainPage.expectPageVisible('unsigned');
  });

  await test.step('Click sign in button', async () => {
    await mainPage.clickSignInBtn();
  });

  await test.step('Expect sign in page visible with email form', async () => {
    await signInPage.expectPageVisible('email');
  });

  await test.step('Stop animation on sign in page', async () => {
    await signInPage.stopAnimation();
  });

  await test.step('Fill email field', async () => {
    await signInPage.fillEmail(process.env.USER_EMAIL!);
  });

  await test.step('Click next button after email', async () => {
    await signInPage.clickNextBtn();
  });

  await test.step('Click use password button', async () => {
    await signInPage.clickUsePasswordBtn();
  });

  await test.step('Expect sign in page visible with password form', async () => {
    await signInPage.expectPageVisible('password');
  });

  await test.step('Fill password field', async () => {
    await signInPage.fillPassword(process.env.USER_PASSWORD!);
  });

  await test.step('Click next button after password', async () => {
    await signInPage.clickNextBtnOnPasswordState();
  });

  await test.step('Click no button (decline additional options)', async () => {
    await signInPage.clickNoBtn();
  });

  await test.step('Expect app logo visible', async () => {
    await mainPage.expectAppLogoVisible();
  });

  await test.step('Wait for drive API response', async () => {
    await mainPage.page.waitForResponse(
      resp => resp.url().includes('/v1.0/me/drive') && resp.status() === 200
    );
  });

  await test.step('Expect app logo hidden after loading', async () => {
    await mainPage.expectAppLogoVisible(false);
  });

  await test.step('Expect main page visible in signed state', async () => {
    await mainPage.expectPageVisible('signed');
  });
}
