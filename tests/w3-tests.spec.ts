import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { TextBoxPage } from '../pages/text-box.page';
import { CheckBoxPage } from '../pages/checkbox.page';

test.describe('Home and Elements Page Tests', () => {
  let homePage: HomePage;
  let textBoxPage: TextBoxPage;
  let checkBoxPage: CheckBoxPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    textBoxPage = new TextBoxPage(page);
    checkBoxPage = new CheckBoxPage(page);
  });

  test.describe('Home Page functionality', () => {
    test.beforeEach(async () => {
      await homePage.open();
    });

    test('Checking Contained text', async () => {
      await test.step('Verify footer copyright text', async () => {
        await homePage.checkCopyright();
      });
    });

    test('Checking page elements urls', async () => {
      await test.step('Verify category cards redirection links', async () => {
        await homePage.checkCategoryLinks();
      });
    });
  });

  test('Filling up Text Box', async () => {
    await test.step('Open text box page', async () => {
      await textBoxPage.open();
    });

    await test.step('Fill form with user data', async () => {
      await textBoxPage.fillForm(
        'Carl Woldberg',
        'test3434@gogo.com',
        'Sunny av., 78, apt. 23',
        'Moon str,, 1 apt. 23'
      );
    });

    await test.step('Submit form and verify output', async () => {
      await textBoxPage.submit();
      await textBoxPage.verifyOutput('Carl Woldberg', 'test3434@gogo.com');
    });
  });

  test('Checking Check Box', async () => {
    await test.step('Open check box page', async () => {
      await checkBoxPage.open();
    });

    await test.step('Expand folder structure and select Documents', async () => {
      await checkBoxPage.expandFolder();
      await checkBoxPage.selectDocuments();
    });

    await test.step('Verify selected items result text', async () => {
      await checkBoxPage.checkResultText(
        'You have selected :documentsworkspaceofficereactangularveupublicprivateclassifiedgeneral'
      );
    });
  });
});