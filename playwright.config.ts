import type { Config } from "@playwright/test";
import { devices } from "@playwright/test";

interface UseArgs {
  /* Base URL to use in actions like `await page.goto('/')`. */
  baseURL: string;
  /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  trace?: string;
  video?: string;
  storageState?: string;
  permissions?: string[];
  viewport?: { width: number; height: number };
  launchOptions?: any;
}

const config: Config<UseArgs> = {
  reporter: [
    ["html", { open: "never" }],
    ["json", { outputFile: "./playwright-report/test-results.json" }],
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.baseUrl ?? "http://localhost:9000",
    trace: "on-first-retry",
    video: "off",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  testDir: "./tests_e2e",
  testMatch: "**/*.spec.ts",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
        launchOptions: {
          args: ["--window-position=0,0"],
        },
      },
    },
  ],
  //   use: {
  //     browserName: 'chromium',
  //     visualViewport: { width: 1366, height: 400 },
  //     windowPosition: { x: 0, y: 0 },
  //     headless: true
  //   }
};

export default config;
