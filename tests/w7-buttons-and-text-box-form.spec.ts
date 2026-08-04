import { expect, test, Locator, Page } from '@playwright/test';
import { ButtonsPage } from '../pages/buttons-page';
import { TextBoxPage } from '../pages/text-box.page';

test('Checking buttons', async ({ page }) => {

const buttonsPage = new ButtonsPage(page);
await buttonsPage.open();

await buttonsPage.performDoubleClick();
await buttonsPage.performRightClick();
await buttonsPage.performDynamicClick();

await buttonsPage.checkDoubleClickMessage();
await buttonsPage.checkRightClickMessage();
await buttonsPage.checkDynamicClickMessage();
})


test('Filling up and sending Text Box form', async ({ page }) => {

const textBoxPage = new TextBoxPage(page);
await textBoxPage.open();

await textBoxPage.fillForm('John Bruck', 'john@example.com', '123 Main St', '456 Secondary St');

await textBoxPage.submit();
await textBoxPage.verifyOutput('John Bruck', 'john@example.com');
});