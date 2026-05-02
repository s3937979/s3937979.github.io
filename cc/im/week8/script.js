const playlist = [
  {
    id: 1,
    src: "stardust.mp4",
    name: "Stardust",
  },
  {
    id: 2,
    src: "zenscape.mp4",
    name: "zenscape",
  },
  {
    id: 3,
    src: "stardust.mp4",
    name: "Music video",
  },
];

const myVideo = document.querySelector("#my-video");
console.log(myVideo);

const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

// listen to click on this button
playPauseButton.addEventListener("click", togglePlay);

// fetch the image so that we can change the icon
const playPauseImg = document.querySelector("#play-pause-button img");
console.log(playPauseImg);

// run this function when click happens
function togglePlay() {
  if (myVideo.paused || myVideo.ended) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
    myVideo.play();
  } else {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
    myVideo.pause();
  }
}

const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

muteUnmuteButton.addEventListener("click", toggleSound);

const muteUnmuteImg = document.querySelector("#mute-unmute-button img");
console.log(muteUnmuteImg);

function toggleSound() {
  if (myVideo.muted) {
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
    myVideo.muted = false;
  } else {
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
    myVideo.unmuted = true;
  }
}

const fastForwardButton = document.querySelector("#fast-forward-button");
console.log(fastForwardButton);

fastForwardButton.addEventListener("click", fastForward);

function fastForward() {
  if (myVideo.playbackRate === 1.0) {
    myVideo.playbackRate = 2.0;
  } else {
    myVideo.playbackRate = 1.0;
  }
}

const step1Button = document.querySelector("#step1-button");
console.log(step1Button);

step1Button.addEventListener("click", gotoStep1);

function gotoStep1() {
  myVideo.currnetTime = 17.0;
}

const step2Button = document.querySelector("#step2-button");
console.log(step2Button);

step2Button.addEventListener("click", gotoStep2);

function gotoStep2() {
  myVideo.currnetTime = 43.56;
}

const fullscreenButton = document.querySelector("#fullscreen-button");
console.log(fullscreenButton);

myVideo.addEventListener("dblclick", goFullscreen);
// can add togglePlay instead of goFullscreen

fullscreenButton.addEventListener("click", goFullscreen);

function goFullscreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

let likes = 0;

const likesContainer = document.querySelector("#likes");
console.log(likesContainer);

heartButton.addEventListener("click", updatelikes);

function updatesLikes() {
  likes++;
  likesContainer.textContent = likes;
}
const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);

myVideo.addEventListener("timeupdate", updateProgress);
function updateProgress() {
  let progress = (myVideo.currentTime / myVideo.duration) * 100;
  conosole.log(progress);
}
