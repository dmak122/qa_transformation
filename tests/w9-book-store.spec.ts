import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProfilePage } from '../pages/profile.page';
import { BookStoreLocators } from '../pages/book-store/book-store.locators';
import { BookStoreActions } from '../pages/book-store/book-store.actions';
import { BookStoreVerifications } from '../pages/book-store/book-store.verifications';

test.describe('Book Store Application - E2E Flow', () => {
  let loginPage: LoginPage;
  let profilePage: ProfilePage;
  let bookStoreLocators: BookStoreLocators;
  let bookStoreActions: BookStoreActions;
  let bookStoreVerifications: BookStoreVerifications;

  // Credentials and test data
  const username = 'BookLover1';
  const password = 'Password1234!';
  const targetBook = 'Git Pocket Guide';
  const searchKeyword = 'Learning JavaScript';
  const otherBookTitle = 'Git Pocket Guide';
  const nonExistentBook = 'NonExistentBook12345';

  // Initialize Page Objects and layers before each test run
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    bookStoreLocators = new BookStoreLocators(page);
    bookStoreActions = new BookStoreActions(bookStoreLocators);
    bookStoreVerifications = new BookStoreVerifications(bookStoreLocators);
  });

  // -------------------------------------------------------------
  // Test suite requiring user authentication
  // -------------------------------------------------------------
  test.describe('Authenticated User Flow', () => {
    test.beforeEach(async () => {
      await loginPage.navigate();
      await loginPage.login(username, password);
    });

    test('User can search, add, verify and delete a book from collection', { tag: '@smoke' }, async () => {
      await test.step('Search and add book to collection', async () => {
        await profilePage.clickSidebarMenu('Book Store');
        await bookStoreLocators.search.search(targetBook);
        await bookStoreLocators.table.clickBookTitle(targetBook);
        await bookStoreActions.addCurrentBookToCollection();
      });

      await test.step('Verify book exists in Profile collection', async () => {
        await profilePage.navigate();
        await profilePage.search.search(targetBook);
        const bookRow = profilePage.table.getRowByTitle(targetBook);
        await profilePage.verifyElementVisibility(bookRow, true);
      });

      await test.step('Delete book from collection and confirm removal', async () => {
        const bookRow = profilePage.table.getRowByTitle(targetBook);
        await profilePage.table.deleteBookByTitle(targetBook);
        await profilePage.confirmDeleteModalButton.click();
        await profilePage.verifyElementVisibility(bookRow, false);
      });
    });

    test('User can clear the entire book collection from the profile', { tag: '@regression' }, async () => {
      await test.step('Add a book to ensure the collection is not empty', async () => {
        await profilePage.clickSidebarMenu('Book Store');
        await bookStoreLocators.search.search(targetBook);
        await bookStoreLocators.table.clickBookTitle(targetBook);
        await bookStoreActions.addCurrentBookToCollection();
      });

      await test.step('Go to profile and use the bulk delete feature', async () => {
        await profilePage.navigate();
        await profilePage.deleteAllBooks();
      });

      await test.step('Verify the table no longer contains the added book', async () => {
        const bookRow = profilePage.table.getRowByTitle(targetBook);
        await profilePage.verifyElementVisibility(bookRow, false);
      });
    });

    test('User can clear the entire book collection from the profile via API', { tag: '@regression' }, async ({ page, request }) => {
      await test.step('Add a book to ensure the collection is not empty', async () => {
        await profilePage.clickSidebarMenu('Book Store');
        await bookStoreLocators.search.search(targetBook);
        await bookStoreLocators.table.clickBookTitle(targetBook);
        await bookStoreActions.addCurrentBookToCollection();
      });

      await test.step('Clear collection via API request', async () => {
        const userId = await page.evaluate(() => localStorage.getItem('userID'));
        const token = await page.evaluate(() => localStorage.getItem('token'));

        const response = await request.delete('/BookStore/v1/Books', {
          params: {
            UserId: userId || '',
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        expect(response.status()).toBe(204);
      });

      await test.step('Verify the table no longer contains the added book', async () => {
        await profilePage.navigate();
        const bookRow = profilePage.table.getRowByTitle(targetBook);
        await profilePage.verifyElementVisibility(bookRow, false);
      });
    });
  });

  // -------------------------------------------------------------
  // Test suite for guest / public features (no authentication required)
  // -------------------------------------------------------------
  test.describe('Guest User Search & Catalog Flow', () => {
    test('User can filter books using search in the Book Store', { tag: '@smoke' }, async () => {
      await test.step('Open book store directly', async () => {
        await bookStoreActions.navigate();
      });

      await test.step('Use search component to filter the table', async () => {
        await bookStoreLocators.search.search(searchKeyword);
      });

      await test.step('Verify target book is visible and other books are hidden', async () => {
        const matchingRow = bookStoreLocators.table.getRowByTitle(searchKeyword);
        const hiddenRow = bookStoreLocators.table.getRowByTitle(otherBookTitle);

        await profilePage.verifyElementVisibility(matchingRow, true);
        await profilePage.verifyElementVisibility(hiddenRow, false);
      });
    });

    test('Search for a non-existent book returns empty results', { tag: '@regression' }, async () => {
      await test.step('Open book store', async () => {
        await bookStoreActions.navigate();
      });

      await test.step('Search for something that does not exist', async () => {
        await bookStoreLocators.search.search(nonExistentBook);
      });

      await test.step('Verify the table row for this book is hidden', async () => {
        const row = bookStoreLocators.table.getRowByTitle(nonExistentBook);
        await profilePage.verifyElementVisibility(row, false);
      });
    });

    test('User can open book details and return back to the store', { tag: '@regression' }, async () => {
      await test.step('Open book store', async () => {
        await bookStoreActions.navigate();
      });

      await test.step('Click on the book title to view details', async () => {
        await bookStoreLocators.table.clickBookTitle(targetBook);
      });

      await test.step('Verify book details view is displayed', async () => {
        await bookStoreVerifications.verifyBackToStoreButtonVisible();
      });

      await test.step('Navigate back to the store and verify table is visible', async () => {
        await bookStoreActions.clickBackToStore();
        await profilePage.verifyElementVisibility(bookStoreLocators.table.table, true);
      });
    });
  });
});