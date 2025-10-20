const btn = document.getElementById('closeDistract');
const status = document.getElementById('status');

btn.addEventListener('click', async () => {
  const res = await chrome.runtime.sendMessage({ type: 'CLOSE_DISTRACT' });
  status.textContent = res.closed > 0
    ? `Abas fechadas: ${res.closed}`
    : "Nenhuma aba de distração aberta.";
});
