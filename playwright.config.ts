import { defineConfig, devices } from "@playwright/test";

/** Read environment variables from file. https://github.com/motdotla/dotenv */
// require('dotenv').config();

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	testDir: "./tests",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	webServer: {
		command: "yarn run dev",
		stderr: "pipe",
		stdout: "ignore",
		url: "http://127.0.0.1:8080",
	},
});
