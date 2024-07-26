import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('clicks on shuffler', async ({ page }) => {
  // Set up flags 
  let dialogCalled = false;
  let dialogDismissed = false;
  let dialogMessage = '';

  // Set up a listener for the alert function 
  page.on('dialog', async dialog => {
    // Toggle the dialogCalled flag
    dialogCalled = true;
    dialogMessage = dialog.message();
    await dialog.dismiss();
    dialogDismissed = true;
  });
  
  // Get the button
  const button = page.getByTestId('big-button-shuffler')
  await expect(button).toBeVisible();
  await button.click();
  // Assertions 
  expect(dialogCalled).toBe(true);
  expect(dialogDismissed).toBe(true);
  expect(dialogMessage).toContain('Larry');
});

test("clicks on console.log", async ({ page }) => {
  const button = page.locator('[data-testid*="console-log"]');
  // Assert that the word "foo" is in the console log
  await button.click();
  // Get the contents of the console.log() and assert that it contains 'Katie'
  const consoleLog = await page.$eval("text=foo", (el) => el.textContent);

  // const consoleLog = await page.$eval("text=foo", (el) => el.textContent);
  // expect(consoleLog).toContain("Katie poured coffee on father's grey suit");
});
