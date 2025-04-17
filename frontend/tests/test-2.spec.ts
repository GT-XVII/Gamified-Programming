import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('button', { name: 'Register' }).click();
});