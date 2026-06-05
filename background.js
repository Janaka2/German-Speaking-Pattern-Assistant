// Open the side panel when the toolbar icon is clicked.
// Side panel (not popup) is used on purpose: a popup closes the moment you
// click back into Zoom/Meet. The side panel stays open beside your class.

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((err) => console.error("sidePanel setup failed:", err));
});
