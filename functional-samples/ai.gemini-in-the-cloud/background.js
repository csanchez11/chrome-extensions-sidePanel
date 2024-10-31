chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

  // background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "autofill",
    title: "Autofill from Label",
    contexts: ["editable", "all"] // Show on editable elements like input fields
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Background.js",info)
  if (info.menuItemId === "autofill") {
    (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      const response = await chrome.tabs.sendMessage(tab.id, {action: "autofill"});
      // do something with response here, not outside the function
      if (response.success){
        // save Job to google doc
        console.log(response.message);
      }
    })();
  }
});
