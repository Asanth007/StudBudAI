chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "OPEN_HELP" && sender.tab?.windowId) {

    chrome.storage.local.set({
      problem: msg.data
    });

    chrome.sidePanel.open({
      windowId: sender.tab.windowId
    });
  }
});