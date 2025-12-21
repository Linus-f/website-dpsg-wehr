import { test, expect } from '@playwright/test';

test.describe('News Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/news');
    });

    test('should display the news heading', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Aktuelles' })).toBeVisible();
    });

    test('should list news posts and navigate to a post', async ({ page }) => {
        const posts = page.locator('article');
        const count = await posts.count();
        
        if (count > 0) {
            const firstPost = posts.first();
            const postTitle = await firstPost.locator('h2').innerText();
            
            // Click the first post
            await firstPost.click();
            
            // Verify navigation
            await expect(page).toHaveURL(/\/posts\//);
            await expect(page.getByRole('heading', { name: postTitle })).toBeVisible();
        } else {
            // If no posts, verify the empty state message
            await expect(page.getByText('Hier gibt\'s noch nichts zu sehen.')).toBeVisible();
        }
    });
});
