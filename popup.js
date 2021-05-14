chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  activeTab = tabs[0];
  //   alert(activeTab.url);
});
