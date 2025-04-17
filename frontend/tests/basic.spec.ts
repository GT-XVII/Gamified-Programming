import { test, expect } from '@playwright/test'

test('visit homepage', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page).toHaveTitle(/Gamified Programming/i)
})
