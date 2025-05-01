const lp = document.getElementById("lp");
const audio = document.getElementById("player");
const clickZone = document.getElementById("click-zone");

let isPlaying = false;

clickZone.addEventListener("click", () => {
  isPlaying = !isPlaying;

  // LP 회전
  lp.style.animationPlayState = isPlaying ? "running" : "paused";

  // 음악 재생/정지
  if (isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
});
