import { test, expect } from '@playwright/test';
import { navigationLinks } from '../lib/config';

const groups = navigationLinks.find(n => n.label === 'Gruppen')?.links || [];

test.describe('Group Pages', () => {
    for (const group of groups) {
        test(`should load the ${group.label} page correctly`, async ({ page }) => {
            await page.goto('/');

            await page.goto(group.link);

            await expect(page.getByRole('heading', { name: group.label, level: 2})).toBeVisible();

            // 5. Verify images are present and loading
            const images = page.locator('img');
            await expect(images.first()).toBeVisible();

            // Ensure the image actually loads and decodes
            const isLoaded = await images.first().evaluate(async (img: HTMLImageElement) => {
                if (img.complete) {
                    return img.naturalWidth > 0;
                }
                await new Promise((resolve) => {
                    img.onload = () => resolve(img.naturalWidth > 0);
                    img.onerror = () => resolve(false);
                });
                return img.naturalWidth > 0;
            });
            expect(isLoaded).toBe(true);
        });
    }
});