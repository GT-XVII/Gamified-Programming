import { test, expect } from '@playwright/test';

test('Go to Quiz button should navigate to the correct URL', async ({ page }) => {
  // Step 1: Navigate to the Content Page
  await page.goto('http://localhost:5173/');  // Adjust the URL if needed

  // Step 2: Simulate clicking the first button (for selecting a course)
  await page.locator('article').filter({ hasText: 'Progress 0/20BooleansSome descriptive text about booleans􀊄View Course' }).getByRole('button').click();

  // Step 3: Click on "Go to Quiz" button
  await page.getByRole('button', { name: 'Go to Quiz' }).click();

  // Step 4: Verify that the URL has changed to the quiz page (allowing any courseId)
  await expect(page).toHaveURL(/\/quiz\/.+/);  // This allows any string after "/quiz/"
});
