import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { TextBoxPage } from '../pages/text-box.page';
import { CheckBoxPage } from '../pages/checkbox.page';

test.describe('Home Page functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('Checking Contained text', async () => {
    await homePage.checkCopyright();
  });

  test('Checking page elements urls', async () => {
    await homePage.checkCategoryLinks();
  });
});

test('Filling up Text Box', async ({ page }) => {
  const textBoxPage = new TextBoxPage(page);

  await textBoxPage.open();
  await textBoxPage.fillForm(
    'Carl Woldberg',
    'test3434@gogo.com',
    'Sunny av., 78, apt. 23',
    'Moon str,, 1 apt. 23'
  );
  await textBoxPage.submit();
  await textBoxPage.verifyOutput('Carl Woldberg', 'test3434@gogo.com');
});

test('Checking Check Box', async ({ page }) => {
  const checkBoxPage = new CheckBoxPage(page);

  await checkBoxPage.open();
  await checkBoxPage.expandFolder();
  await checkBoxPage.selectDocuments();
  await checkBoxPage.checkResultText(
    'You have selected :documentsworkspaceofficereactangularveupublicprivateclassifiedgeneral'
  );
});