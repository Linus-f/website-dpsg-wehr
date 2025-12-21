import { test, expect } from '@playwright/test';
import { navigationLinks } from '../lib/config';

const groups = navigationLinks.find(n => n.label === 'Gruppen')?.links || [];

test.describe('Group Pages', () => {
    for (const group of groups) {
        test(`should load the ${group.label} page correctly`, async ({ page }) => {
            await page.goto('/');

            await page.goto(group.link);

            await expect(page.getByRole('heading', { name: group.label, level: 2})).toBeVisible();

            // Verify that there is at least one image
            const images = page.locator('img');
            await expect(images.first()).toBeVisible();

            // Ensure the image actually loads
            const isLoaded = await images.first().evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0);
            expect(isLoaded).toBe(true);
        });
    }
});