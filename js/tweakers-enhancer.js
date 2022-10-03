/*
___________                      __                         ___________      .__                                      
\__    ___/_  _  __ ____ _____  |  | __ ___________  ______ \_   _____/ ____ |  |__ _____    ____   ____  ___________ 
  |    |  \ \/ \/ // __ \\__  \ |  |/ // __ \_  __ \/  ___/  |    __)_ /    \|  |  \\__  \  /    \_/ ___\/ __ \_  __ \
  |    |   \     /\  ___/ / __ \|    <\  ___/|  | \/\___ \   |        \   |  \   Y  \/ __ \|   |  \  \__\  ___/|  | \/
  |____|    \/\_/  \___  >____  /__|_ \\___  >__|  /____  > /_______  /___|  /___|  (____  /___|  /\___  >___  >__|   
                       \/     \/     \/    \/           \/          \/     \/     \/     \/     \/     \/    \/       
*/
document.addEventListener("DOMContentLoaded", () => {
  var noTweak = false;

  var checkboxTweak = document.getElementById("checkboxTweak");
  var submitTweak = document.getElementById("submitTweak");

  var tab = null;

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    tab = tabArray[0];
  });

  chrome.storage.local.get("noTweak", (data) => {
    noTweak = !!data.noTweak;
    checkboxTweak.checked = noTweak;
  });

  submitTweak.onclick = () => {
    if (checkboxTweak.checked) {
      noTweak = true;
      chrome.storage.local.set({ noTweak: noTweak });
      setTimeout(function () {
        reloadTab(tab);
      });
    } else {
      noTweak = false;
      chrome.storage.local.set({ noTweak: noTweak });
      setTimeout(function () {
        reloadTab(tab);
      });
    }
  };

  function reloadTab() {
    const hostname = new URL(tab.url).hostname;
    if (hostname === "tweakers.net") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: doReload,
      });
    }
  }

  function doReload() {
    window.location.reload();
  }
});
