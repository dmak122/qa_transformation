import { test } from '@playwright/test';
import { AccordianPage } from '../pages/accordian.page';

test.describe('Accordian Widget Tests', () => {
  test('Verify accordion sections text and visibility state', async ({ page }) => {
    const accordianPage = new AccordianPage(page);

    // Step 1: Open page and verify Section 1
    await accordianPage.open();
    await accordianPage.verifySection1Visible();
    await accordianPage.verifySection1Text('Lorem Ipsum is simply dummy text');

    // Step 2: Open Section 2 and verify its text
    await accordianPage.clickSection2();
    await accordianPage.verifySection1Hidden();
    await accordianPage.verifySection2Visible();
    await accordianPage.verifySection2Text('Contrary to popular belief');

    // Step 3: Open Section 3 and verify its text
    await accordianPage.clickSection3();
    await accordianPage.verifySection2Hidden();
    await accordianPage.verifySection3Visible();
    await accordianPage.verifySection3Text('It is a long established fact');

    // Step 4: Collapse Section 3
    await accordianPage.clickSection3();
    await accordianPage.verifySection3Hidden();
  });
});