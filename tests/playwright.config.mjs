import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://demo.winwin.travel',
    headless: true,
  },
});
