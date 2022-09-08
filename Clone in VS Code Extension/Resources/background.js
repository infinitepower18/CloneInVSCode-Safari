chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get(
    {
      protocol: "HTTPS",
    },
    function (items) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const url = new URL(tabs[0].url);
        const path = url.pathname.split("/");
        if (path[1] !== undefined && path[2] !== undefined) {
          if (items.protocol == "HTTPS") {
            chrome.tabs.create({
              url:
                "vscode://vscode.git/clone?url=https://" +
                url.hostname +
                "/" +
                path[1] +
                "/" +
                path[2] +
                ".git",
            });
          } else if (items.protocol == "SSH") {
            chrome.tabs.create({
              url:
                "vscode://vscode.git/clone?url=git@" +
                url.hostname +
                ":" +
                path[1] +
                "/" +
                path[2] +
                ".git",
            });
          }
        }
      });
    }
  );
});
