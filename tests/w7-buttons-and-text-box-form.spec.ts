import { test } from '@playwright/test';
import { ButtonsPage } from '../pages/buttons-page';
import { TextBoxPage } from '../pages/text-box.page';

test.describe('Elements Widget Tests', () => {
  let buttonsPage: ButtonsPage;
  let textBoxPage: TextBoxPage;

  test.beforeEach(async ({ page }) => {
    buttonsPage = new ButtonsPage(page);
    textBoxPage = new TextBoxPage(page);
  });

  test('Checking buttons', async () => {
    await test.step('Open buttons page', async () => {
      await buttonsPage.open();
    });

    await test.step('Perform double, right, and dynamic clicks', async () => {
      await buttonsPage.performDoubleClick();
      await buttonsPage.performRightClick();
      await buttonsPage.performDynamicClick();
    });

    await test.step('Verify click messages', async () => {
      await buttonsPage.checkDoubleClickMessage();
      await buttonsPage.checkRightClickMessage();
      await buttonsPage.checkDynamicClickMessage();
    });
  });

  test('Filling up and sending Text Box form', async () => {
    await test.step('Open text box page', async () => {
      await textBoxPage.open();
    });

    await test.step('Fill form with user details', async () => {
      await textBoxPage.fillForm(
        'John Bruck',
        'john@example.com',
        '123 Main St',
        '456 Secondary St'
      );
    });

    await test.step('Submit form and verify submitted data output', async () => {
      await textBoxPage.submit();
      await textBoxPage.verifyOutput('John Bruck', 'john@example.com');
    });
  });
});