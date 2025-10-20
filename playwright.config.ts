import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

// Define o caminho absoluto para a pasta 'dist'
const distPath = path.join(__dirname, '..', 'dist');

export default defineConfig({
  testDir: __dirname,
  // Define como serão os relatórios (lista no terminal e html para ver no navegador)
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: true, // Roda sem abrir a janela (ideal para o notebook e CI)
  },
  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            // ARGUMENTOS CRUCIAIS: Dizem ao Chromium para carregar sua extensão
            `--disable-extensions-except=${distPath}`,
            `--load-extension=${distPath}`
          ]
        }
      }
    }
  ]
});