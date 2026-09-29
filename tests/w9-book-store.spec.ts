import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BookStorePage } from '../pages/book-store.page';
import { ProfilePage } from '../pages/profile.page';

test.describe('Book Store Application - E2E Flow', () => {
  let loginPage: LoginPage;
  let bookStorePage: BookStorePage;
  let profilePage: ProfilePage;

  // Credentials and test data
  const username = 'BookLover1';
  const password = 'Password1234!';
  const targetBook = 'Git Pocket Guide';
  const searchKeyword = 'Learning JavaScript';
  const otherBookTitle = 'Git Pocket Guide';
  const nonExistentBook = 'NonExistentBook12345';

  // Initialize Page Objects before each test run
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    bookStorePage = new BookStorePage(page);
    profilePage = new ProfilePage(page);
  });

<<<<<<< HEAD
  // -------------------------------------------------------------
  // Test suite requiring user authentication
  // -------------------------------------------------------------
  test.describe('Authenticated User Flow', { tag: '@auth' }, () => {
    test.beforeEach(async () => {
=======
  test('User can search, add, verify and delete a book from collection', async () => {
    await test.step('Login to the system', async () => {
      // expected that navidate will have some parameter e.g. loginPage.navigate("MainPage") or loginPage.navigate("LoginPage") to make it more flexible;
>>>>>>> a2ab41a6cdfdbeada4ab93b93f4b24b8acc48e16
      await loginPage.navigate();
      await loginPage.login(username, password);
    });

    test('User can search, add, verify and delete a book from collection', { tag: ['@smoke', '@ui'] }, async () => {
      await test.step('Search and add book to collection', async () => {
        await bookStorePage.clickSidebarMenu('Book Store');
        await bookStorePage.search.search(targetBook);
        await bookStorePage.table.clickBookTitle(targetBook);
        await bookStorePage.addCurrentBookToCollection();
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

    test('User can clear the entire book collection from the profile', { tag: '@ui' }, async () => {
      await test.step('Add a book to ensure the collection is not empty', async () => {
        await bookStorePage.clickSidebarMenu('Book Store');
        await bookStorePage.search.search(targetBook);
        await bookStorePage.table.clickBookTitle(targetBook);
        await bookStorePage.addCurrentBookToCollection();
      });

      await test.step('Go to profile and use the bulk delete feature', async () => {
        // Use direct navigation to prevent sidebar ad overlay issues
        await profilePage.navigate();
        await profilePage.deleteAllBooks();
      });

      await test.step('Verify the table no longer contains the added book', async () => {
        const bookRow = profilePage.table.getRowByTitle(targetBook);
        await profilePage.verifyElementVisibility(bookRow, false);
      });
    });

<<<<<<< HEAD
    test('User can clear the entire book collection from the profile via API', { tag: ['@smoke', '@api'] }, async ({ page, request }) => {
      await test.step('Add a book to ensure the collection is not empty', async () => {
        await bookStorePage.clickSidebarMenu('Book Store');
        await bookStorePage.search.search(targetBook);
        await bookStorePage.table.clickBookTitle(targetBook);
        await bookStorePage.addCurrentBookToCollection();
      });

      await test.step('Clear collection via API request', async () => {
        // Extract credentials stored in localStorage after UI login
        const userId = await page.evaluate(() => localStorage.getItem('userID'));
        const token = await page.evaluate(() => localStorage.getItem('token'));

        // Perform DELETE request to clear user collection
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
  test.describe('Guest User Search & Catalog Flow', { tag: '@guest' }, () => {
    test('User can filter books using search in the Book Store', { tag: ['@smoke', '@ui'] }, async () => {
      await test.step('Open book store directly', async () => {
        await bookStorePage.navigate();
      });

      await test.step('Use search component to filter the table', async () => {
        await bookStorePage.search.search(searchKeyword);
      });

      await test.step('Verify target book is visible and other books are hidden', async () => {
        const matchingRow = bookStorePage.table.getRowByTitle(searchKeyword);
        const hiddenRow = bookStorePage.table.getRowByTitle(otherBookTitle);

        await bookStorePage.verifyElementVisibility(matchingRow, true);
        await bookStorePage.verifyElementVisibility(hiddenRow, false);
      });
    });

    test('Search for a non-existent book returns empty results', { tag: '@ui' }, async () => {
      await test.step('Open book store', async () => {
        await bookStorePage.navigate();
      });

      await test.step('Search for something that does not exist', async () => {
        await bookStorePage.search.search(nonExistentBook);
      });

      await test.step('Verify the table row for this book is hidden', async () => {
        const row = bookStorePage.table.getRowByTitle(nonExistentBook);
        await bookStorePage.verifyElementVisibility(row, false);
      });
=======
    await test.step('Delete book from collection and confirm removal', async () => {
      
      bookRow = profilePage.table.getRowByTitle(targetBook);
      await profilePage.table.deleteBookByTitle(targetBook);
      await profilePage.confirmDeleteModalButton.click();
      await profilePage.verifyElementVisibility(bookRow, false);
    });
  });

test('User can clear the entire book collection from the profile', async () => {
    await test.step('Login to the system', async () => {
      //
      await loginPage.navigate();
      await loginPage.login(username, password);
    });

    await test.step('Add a book to ensure the collection is not empty', async () => {
      await bookStorePage.clickSidebarMenu('Book Store');
      await bookStorePage.search.search(targetBook);
      await bookStorePage.table.clickBookTitle(targetBook);
      await bookStorePage.addCurrentBookToCollection();
      //in this step only action no validations that action perform well ??? - for discuss
>>>>>>> a2ab41a6cdfdbeada4ab93b93f4b24b8acc48e16
    });

    test('User can open book details and return back to the store', { tag: '@ui' }, async () => {
      await test.step('Open book store', async () => {
        await bookStorePage.navigate();
      });

      await test.step('Click on the book title to view details', async () => {
        await bookStorePage.table.clickBookTitle(targetBook);
      });

      await test.step('Verify book details view is displayed', async () => {
        await expect(bookStorePage.backToStoreButton).toBeVisible();
      });

<<<<<<< HEAD
      await test.step('Navigate back to the store and verify table is visible', async () => {
        await bookStorePage.backToStoreButton.click();
        await bookStorePage.verifyElementVisibility(bookStorePage.table.table, true);
      });
=======
    await test.step('Open book store directly (guest user)', async () => {
      //
      await bookStorePage.navigate();
    });

    await test.step('Use search component to filter the table', async () => {
      await bookStorePage.search.search(searchKeyword);
    });

    await test.step('Verify target book is visible and other books are hidden', async () => {
      const matchingRow = bookStorePage.table.getRowByTitle(searchKeyword);
      const hiddenRow = bookStorePage.table.getRowByTitle(otherBookTitle);

      await profilePage.verifyElementVisibility(matchingRow, true);
      await profilePage.verifyElementVisibility(hiddenRow, false);
    });
  });

  test('Search for a non-existent book returns empty results', async () => {

    await test.step('Open book store', async () => {
      //
      await bookStorePage.navigate();
    });

    await test.step('Search for something that does not exist', async () => {
      await bookStorePage.search.search(nonExistentBook);
    });

    await test.step('Verify the table row for this book is hidden', async () => {
      const row = bookStorePage.table.getRowByTitle(nonExistentBook);
      await bookStorePage.verifyElementVisibility(row, false);
    });
  });

  test('User can open book details and return back to the store', async () => {
    await test.step('Open book store', async () => {
      // the same as previous
      await bookStorePage.navigate();
    });

    await test.step('Click on the book title to view details', async () => {
      await bookStorePage.table.clickBookTitle(targetBook);
    });

    await test.step('Verify book details view is displayed', async () => {
      await expect(bookStorePage.backToStoreButton).toBeVisible();
    });

    await test.step('Navigate back to the store and verify table is visible', async () => {
      await bookStorePage.backToStoreButton.click();
      await bookStorePage.verifyElementVisibility(bookStorePage.table.table, true);
>>>>>>> a2ab41a6cdfdbeada4ab93b93f4b24b8acc48e16
    });
  });
});