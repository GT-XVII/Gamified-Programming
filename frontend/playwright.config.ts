import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // 👈 where your tests live
  use: {
    headless: false,
    baseURL: 'http://localhost:5173/', // change if needed
  },
});
