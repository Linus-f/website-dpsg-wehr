import { test, expect } from '@playwright/test';

test('has title and navigates to the news page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/DPSG Wehr/);

    await page.getByRole('link', { name: 'News' }).click();

    await expect(page).toHaveURL(/.*news/);

    await expect(page.getByRole('heading', { name: 'Aktuelles'})).toBeVisible();
});