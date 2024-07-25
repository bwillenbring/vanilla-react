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

test('clicks on getCurrentDay', async ({ page }) => {
  const button = page.locator('[data-testid*="get-current-day"]');
});
