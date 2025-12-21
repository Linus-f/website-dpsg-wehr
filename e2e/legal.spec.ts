import { test, expect } from '@playwright/test';

test.describe('Legal Pages', () => {
    test('Impressum page should load', async ({ page }) => {
        await page.goto('/pages/impressum');
        await expect(page.getByRole('heading', { name: 'Impressum' })).toBeVisible();
    });

    test('Datenschutz page should load', async ({ page }) => {
        await page.goto('/pages/datenschutz');
        await expect(page.getByRole('heading', { name: 'Datenschutzerklärung' })).toBeVisible();
    });
});
