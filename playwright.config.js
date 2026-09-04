import { defineConfig } from '@playwright/test';

const widths = [1440, 1024, 768, 430, 390, 360];
const port = Number(process.env.PORT || 4173);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['line'], ['html', { open: 'never' }]] : 'line',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: 'node scripts/serve.mjs',
    url: baseURL,
    reuseExistingServer: !process.env.CI
  },
  projects: widths.map(width => ({
    name: `chromium-${width}`,
    use: {
      browserName: 'chromium',
      viewport: { width, height: 900 }
    }
  }))
});

