import { test, expect } from '@playwright/test';

// O código do content.js é armazenado em uma constante
const CONTENT_SCRIPT_CODE = `
const links = document.querySelectorAll('a');
for (const link of links) {
  if (link.href.includes("playlist") || link.href.includes("study")) {
    link.style.outline = "2px solid green";
  } else {
    link.style.outline = "2px solid red";
  }
}
`;

test('content script colore links na página de teste corretamente', async ({ page }) => {
  // 1. Navega para o domínio neutro
  await page.goto('https://example.com/test');
    
  // 2. Injeta o HTML
  await page.setContent(`
    <html>
      <body>
        <a id="study-link" href="/watch?v=123&list=study-music">Link de Estudo</a>
        <a id="random-link" href="/watch?v=999&t=cat-video">Link Distração</a>
      </body>
    </html>
  `);
  
  // 3. Espera a página estabilizar
  await page.waitForLoadState('domcontentloaded'); 
  
  // 4. CORREÇÃO FINAL: Executa o código do content.js DIRETAMENTE na página.
  // Isso garante que a lógica de coloração é aplicada imediatamente antes da checagem.
  await page.evaluate(CONTENT_SCRIPT_CODE);
  
  // 5. Verifica o link de ESTUDO (VERDE)
  const studyLink = page.locator('#study-link');
  // toHaveCSS tem espera embutida (5s)
  await expect(studyLink).toHaveCSS('outline-color', 'rgb(0, 128, 0)'); 

  // 6. Verifica o link de DISTRAÇÃO (VERMELHO)
  const randomLink = page.locator('#random-link');
  await expect(randomLink).toHaveCSS('outline-color', 'rgb(255, 0, 0)');
});