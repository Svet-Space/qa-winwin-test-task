import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('https://demo.winwin.travel/landings/en/?utm_source=hr&utm_medium=testtask&utm_campaign=qal');
});

test('Max adults cannot exceed limit', async ({ page }) => {
	await page.getByRole('button', { name: /search/i }).click();

	// открыть guests
	await page.getByText(/adults/i).first().click();

	const plus = page.getByRole('button', { name: '+' }).first();

	for (let i = 0; i < 20; i++) {
		await plus.click();
	}

	await expect(page.locator('body')).toContainText('10');
});

test('All pet weight options selectable', async ({ page }) => {
	await page.getByRole('button', { name: /search/i }).click();
	await page.getByText(/pets/i).first().click();

	const options = ['<1kg', '1-5', '5-10', '15-20', '>20'];

	for (const w of options) {
		const opt = page.getByText(w);
		if (await opt.isVisible()) {
			await opt.click();
			await expect(page.locator('body')).toContainText(w);
		}
	}
});

test('Filter changes URL', async ({ page }) => {
	await page.getByRole('button', { name: /search/i }).click();

	const before = page.url();

	await page.getByText(/Breakfast/i).click();

	await expect.poll(() => page.url()).not.toBe(before);
});
