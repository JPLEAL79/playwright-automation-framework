import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Carga config/environments/.env.<TEST_ENV> antes de que Playwright lea la configuración.
const testEnvironment = process.env.TEST_ENV ?? 'dev';
const environmentFile = path.resolve(
  __dirname,
  'config',
  'environments',
  `.env.${testEnvironment}`
);

dotenv.config({ path: environmentFile, quiet: true });

// Falla de inmediato en vez de ejecutar en silencio contra la aplicación equivocada.
if (!process.env.BASE_URL) {
  throw new Error(`BASE_URL no está definida. Revisa ${environmentFile}.`);
}

// PW_WORKERS reemplaza el valor por defecto: 1 worker en local, 2 en CI.
const workerCount = process.env.PW_WORKERS
  ? Number(process.env.PW_WORKERS)
  : process.env.CI
    ? 2
    : 1;

/**
 * Ver https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  // Tiempo máximo por test y por aserción.
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  fullyParallel: false,
  // Hace fallar el build de CI si quedó un test.only en el código.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: workerCount,
  reporter: [['allure-playwright']],

  use: {
    // Headless por defecto; usa PW_HEADED=1 para ver el navegador.
    headless: process.env.PW_HEADED !== '1',
    // Permite navegar con rutas relativas, por ejemplo page.goto('/').
    baseURL: process.env.BASE_URL,
    // Guarda evidencia solo cuando un test falla.
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
    },
  ],
});
