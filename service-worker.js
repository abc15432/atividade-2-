chrome.runtime.onInstalled.addListener(() => {
  console.log('Foco Rápido instalado.');
});

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === 'CLOSE_DISTRACT') {
    let closedCount = 0;
    const tabs = await chrome.tabs.query({});
    const distractSites = ["facebook.com", "instagram.com", "tiktok.com"];
    
    for (const tab of tabs) {
      if (distractSites.some(site => tab.url.includes(site))) {
        await chrome.tabs.remove(tab.id);
        closedCount++;
      }
    }
    
    sendResponse({ closed: closedCount });
  }
});
