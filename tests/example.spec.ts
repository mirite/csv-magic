import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("http://127.0.0.1:8080");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/CSV Magic/);
});

test("Can open file", async ({ page }) => {
	await openTestFile(page);
	expect(await page.locator("table tbody tr").count()).toBe(2);
});

test("Can duplicate row", async ({ page }) => {
	await openTestFile(page);
	expect(await page.locator('span[data-id="2,1"]').textContent()).toBe("1");
	await page.getByText("Duplicate").first().click();
	expect(await page.locator("table tbody tr").count()).toBe(3);
	expect(await page.locator('span[data-id="2,1"]').textContent()).toBe("A");
});

/**
 * Opens the test file in the editor.
 *
 * @param page The page to open the test file on.
 */
async function openTestFile(page: Page) {
	await page.goto("http://localhost:8080/");
	await page.getByLabel("File:").click();
	await page.getByLabel("File:").setInputFiles("tests/test.csv");
	await page.getByRole("button", { name: "Open" }).click();
}
