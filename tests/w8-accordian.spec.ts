import { test } from '@playwright/test';
import { AccordianPage } from '../pages/accordian.page';

test.describe('Accordian Widget Tests', () => {
  let accordianPage: AccordianPage;

  test.beforeEach(async ({ page }) => {
    accordianPage = new AccordianPage(page);
  });

  test('Verify accordion sections text and visibility state', async () => {
    await test.step('Open page and verify Section 1', async () => {
      await accordianPage.open();
      await accordianPage.verifySection1Visible();
      await accordianPage.verifySection1Text('Lorem Ipsum is simply dummy text');
    });

    await test.step('Open Section 2 and verify its text', async () => {
      await accordianPage.clickSection2();
      await accordianPage.verifySection1Hidden();
      await accordianPage.verifySection2Visible();
      await accordianPage.verifySection2Text('Contrary to popular belief');
    });

    await test.step('Open Section 3 and verify its text', async () => {
      await accordianPage.clickSection3();
      await accordianPage.verifySection2Hidden();
      await accordianPage.verifySection3Visible();
      await accordianPage.verifySection3Text('It is a long established fact');
    });

    await test.step('Collapse Section 3', async () => {
      await accordianPage.clickSection3();
      await accordianPage.verifySection3Hidden();
    });
  });
});