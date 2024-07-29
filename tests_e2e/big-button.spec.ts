import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("clicks on button that displays shuffled array", async ({ page }) => {
  // Get the button and click it and await the dialog
  const button = page.getByTestId("big-button-shuffler");
  await button.click();
  const textArea = page.getByTestId("textarea-big-button-shuffler");
  // Get the text content of the text area
  const text = await textArea.textContent();
  for (const item of ["Larry", "Curly", "Moe"]) {
    expect(text).toContain(item);
  }
});

test("clicks on button that alerts the current day", async ({ page }) => {
  // Dismiss the alert as soon as it appears
  page.on("dialog", (dialog) => dialog.dismiss());
  // Set up days of week (the displayed message will be one of these days)
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Set up a waitForEvent on an alert
  const dialogPromise = page.waitForEvent("dialog");

  // Get the button and click it and await the dialog
  const button = page.getByTestId("big-button-get-current-day");
  await button.click();
  const dialog = await dialogPromise;

  // Assert the dialog type is alert and the message is one of the days
  expect(dialog.type()).toBe("alert");
  expect(days).toContain(dialog.message());
});

test("clicks on button that triggers an error", async ({ page }) => {
  // Get the button that will trigger the console.log
  const button = page.getByTestId("big-button-throw-error");
  const consolePromise = page.waitForEvent("pageerror");

  // Click the  button which triggers the console.log and trap the message
  await button.click();
  const msg = await consolePromise;

  // Assert the console message matches expectation
  expect(msg).not.toBeNull();
  expect(msg.message).toMatch(/error/gim);
});

test("clicks on button that triggers console.log", async ({ page }) => {
  // Get the button that will trigger the console.log
  const button = page.getByTestId("big-button-console-log");
  const consolePromise = page.waitForEvent("console");

  // Click the  button which triggers the console.log
  await button.click();

  // Trap the console.log message
  const msg = await consolePromise;

  // Assert the console message matches expectation
  expect(msg.text()).toContain("Katie");
});
