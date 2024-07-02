const extpay = ExtPay('fadblock');

const taimuRipu = async () => {
  await new Promise((resolve, _reject) => {
    const setTimeoutHandler = () => {
      chrome.storage.local.get(['skipCount', 'isAd', 'videoContainer', 'videoPlayer', 'previewText', 'previewTextAlt', 'skipButton', 'skipButtonAlt', 'surveyButton', 'staticAds'], function(result) {
          const isAd = document.querySelector(result.isAd);
          const videoPlayer = document.querySelector(result.videoPlayer);
          const preText = document.querySelector(result.previewText);
          const preTextAlt = document.querySelector(result.previewTextAlt);
          if (isAd && (preText || preTextAlt)) {
            if (videoPlayer.readyState === 4) {
                videoPlayer.volume = 0;
                videoPlayer.currentTime = videoPlayer.duration - 0.1;
                videoPlayer.pause() && videoPlayer.play()
                // CLICK ON THE SKIP AD BTN
                document.querySelector(result.skipButton)?.click();
                document.querySelector(result.skipButtonAlt)?.click();
                // CLICK ON THE SKIP SURVEY BTN
                document.querySelector(result.surveyButton)?.click();
                chrome.storage.local.set({ 'skipCount' : result.skipCount + 1 });
            }
          }

          result.staticAds.forEach((ad) => {
              const bannerAd = document.querySelector(ad);
              if (bannerAd) {
                bannerAd.style.display = "none";
              }
          });
      });
      resolve();
    };

    // RUN IT ONLY AFTER 100 MILLISECONDS
    setTimeout(setTimeoutHandler, 10);
  });

  taimuRipu();
};

taimuRipu();