/*
___________                      __                         ___________      .__                                      
\__    ___/_  _  __ ____ _____  |  | __ ___________  ______ \_   _____/ ____ |  |__ _____    ____   ____  ___________ 
  |    |  \ \/ \/ // __ \\__  \ |  |/ // __ \_  __ \/  ___/  |    __)_ /    \|  |  \\__  \  /    \_/ ___\/ __ \_  __ \
  |    |   \     /\  ___/ / __ \|    <\  ___/|  | \/\___ \   |        \   |  \   Y  \/ __ \|   |  \  \__\  ___/|  | \/
  |____|    \/\_/  \___  >____  /__|_ \\___  >__|  /____  > /_______  /___|  /___|  (____  /___|  /\___  >___  >__|   
                       \/     \/     \/    \/           \/          \/     \/     \/     \/     \/     \/    \/                                                                                                                
*/
let no_tweak = false;
const cookieBar = document.getElementById("koekieBar");

chrome.storage.local.get("noTweak", (data) => {
  no_tweak = data.noTweak;
  waitForLoad();
});

function waitForLoad() {
  if (document.readyState !== "loading") {
    removeThis(cookieBar, no_tweak);
    replaceVideo(no_tweak);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      removeThis(cookieBar, no_tweak);
      replaceVideo(no_tweak);
    });
  }
}
function isset(accessor) {
  try {
    return accessor() !== undefined && accessor() !== null;
  } catch (e) {
    return false;
  }
}

function removeThis(removeThis, bool) {
  if (isset(() => removeThis) && bool) {
    removeThis.remove();
  }
}

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

function replaceVideo() {
  if (no_tweak) {
    if (
      isset(
        () =>
          document
            .getElementsByClassName("click-to-load--modal")[0]
            .getElementsByClassName("ctaButton link")[0].href
      )
    ) {
      let videoId = getId(
        document
          .getElementsByClassName("click-to-load--modal")[0]
          .getElementsByClassName("ctaButton link")[0].href
      );
      let iframeMarkup =
        '<iframe width="980" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" height="551" src="//www.youtube.com/embed/' +
        videoId +
        '" frameborder="0" allowfullscreen></iframe>';
      videoContainer = document.getElementsByClassName(
        "video-container video-container--non-restrictive"
      )[0];
      videoContainer.classList.remove("video-container--non-restrictive");
      videoContainer.innerHTML = iframeMarkup;
    }
  }
}
