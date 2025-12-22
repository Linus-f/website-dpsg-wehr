import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
    test('should switch between light and dark mode', async ({ page }) => {
        await page.goto('/');

        // 1. Initial state (assuming light mode default, or just checking toggle)
        const html = page.locator('html');
        const themeToggle = page.getByRole('button', { name: 'Toggle dark mode' });

        await expect(themeToggle).toBeVisible();

        // 2. Click toggle to switch mode
        const initialClass = (await html.getAttribute('class')) || '';
        await themeToggle.click();

        // 3. Verify class changed
        await expect(async () => {
            const currentClass = (await html.getAttribute('class')) || '';
            expect(currentClass).not.toBe(initialClass);
        }).toPass();

        // 4. Click again to return to initial
        await themeToggle.click();
        await expect(html).toHaveAttribute('class', initialClass);
    });
});
