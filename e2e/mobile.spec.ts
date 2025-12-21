import { test, expect } from '@playwright/test';

test.use({ 
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
});

test.describe('Mobile Menu', () => {
    test('should open and close the mobile sidebar', async ({ page }) => {
        await page.goto('/');

        // 1. Hamburger menu should be visible on mobile
        const menuButton = page.getByRole('button', { name: 'Toggle navigation' });
        await expect(menuButton).toBeVisible();

        // 2. Click to open sidebar
        await menuButton.click();

        // 3. Verify sidebar is visible
        // In Sidebar.tsx, it uses the "visible" class when isOpen is true
        const sidebar = page.locator('div.z-30.absolute.min-w-full');
        await expect(sidebar).toBeVisible();

        // 4. Close using the X button inside sidebar
        const closeButton = sidebar.getByRole('button');
        await closeButton.click();

        // 5. Verify sidebar is collapsed
        await expect(sidebar).not.toBeVisible();
    });
});
