const lp = document.querySelector(".lp");
const tonearm = document.querySelector(".tonearm");

let isPlaying = false;

tonearm.addEventListener("click", () => {
  isPlaying = !isPlaying;
  lp.style.animationPlayState = isPlaying ? "running" : "paused";
});
