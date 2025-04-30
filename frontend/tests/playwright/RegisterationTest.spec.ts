import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('ehs.goodarzi.23@lehre.mosbach.dhbw.de');
  
  
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1234567891');
  await page.locator('form').getByRole('button', { name: 'Register' }).click();

});