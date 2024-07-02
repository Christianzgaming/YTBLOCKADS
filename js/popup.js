const extpay = ExtPay('fadblock')

function getArtefacts() {
    fetch('https://raw.githubusercontent.com/Christianzgaming/fadblock/master/fadblock.json', { 
      method: 'GET'
    })
    .then(function(response) { return response.json(); })
    .then(function(json) {
      chrome.storage.local.set({ "isAd" : json.isAd, "videoContainer" : json.videoContainer , "videoPlayer" : json.videoPlayer, "previewText" : json.previewText, "staticAds" : json.staticAds, "skipButton" : json.skipButton, "skipButtonAlt" : json.skipButtonAlt, "surveyButton" : json.surveyButton });
    });
}

// update counter
chrome.storage.local.get(['skipCount'], function(res) {
  document.querySelector("#skipCount").value = res.skipCount;
  document.querySelector(".vad").innerHTML = res.skipCount;
});

chrome.tabs.query({active:true,currentWindow:true},function(tab) {

  if (String(tab[0].url).includes("youtube.com")) {
    if (String(tab[0].url).includes("/watch")) {
      document.querySelector("#video-feed").classList.add("type-active");
      document.querySelector("#video-feed").firstChild.src = "../assets/popup/video-feed-active.svg";
      document.querySelector("#suggested-feed").classList.add("type-active");
      document.querySelector("#suggested-feed").firstChild.src = "../assets/popup/suggested-feed-active.svg";
    } else {
      document.querySelector("#home-feed").classList.add("type-active");
      document.querySelector("#home-feed").firstChild.src = "../assets/popup/home-feed-active.svg";
    }
  }
});

extpay.getUser().then(user => {
    if (!user.paid) {
      if (document.querySelector("#skipCount").value >= 9999999) {
        document.querySelector('.card-plan').style.display = 'flex';
        document.querySelector('.card-payment-button').style.display = 'block';
        document.querySelector('#note').style.display = 'none';
        document.querySelector('.dono-text').style.display = 'inline';
      }
    }
}).catch(err => {
    document.querySelector('#note').innerHTML = "Check that you're connected to the Internet"
    document.querySelector('#note').style.display = 'block';
})

// show more dropdown
document.querySelector('#more').addEventListener('click', function(e) {
  document.querySelector("#more-select").classList.toggle("countactive");
});

// fetch latest patch
document.querySelector('#update').addEventListener('click', function(e) {
  getArtefacts();
  document.querySelector('#update').textContent="Updated!";
});

document.querySelector('button').addEventListener('click', extpay.openPaymentPage)