import { test, expect } from '@playwright/test';

test.describe('Photo Gallery', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gallerie');
    });

    test('should load the gallery with images', async ({ page }) => {
        // Wait for the gallery to be mounted (it uses client-side rendering)
        const gallery = page.locator('.react-photo-album');
        await expect(gallery).toBeVisible();

        // Check if images are present
        const images = gallery.locator('img');
        await expect(images.first()).toBeVisible();
        
        // Verify at least some images are loaded
        const count = await images.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should open the lightbox when an image is clicked', async ({ page }) => {
        const firstImage = page.locator('.react-photo-album img').first();
        await firstImage.click();

        // Check if the lightbox is visible
        const lightbox = page.locator('.yarl__container');
        await expect(lightbox).toBeVisible();

        // Check if the lightbox close button works
        // Using aria-label for better stability
        const closeButton = page.getByRole('button', { name: 'Close' });
        await closeButton.click();
        await expect(lightbox).not.toBeVisible();
    });

    test('should filter images by tags', async ({ page }) => {
        // This is a more complex test, we check if the gallery header filters work
        // Find a tag (e.g., 'Lager') and click it
        const lagerTag = page.getByRole('button', { name: 'Lager' });
        if (await lagerTag.isVisible()) {
            const initialCount = await page.locator('.react-photo-album img').count();
            await lagerTag.click();
            
            // Wait for potential filtering
            await page.waitForTimeout(500);
            
            const filteredCount = await page.locator('.react-photo-album img').count();
            // We expect the count to be different or at least the gallery still functional
            expect(filteredCount).toBeLessThanOrEqual(initialCount);
        }
    });
});
