// Use IntersectionObserver to create a scroll-triggered fade-in animation effect.
// This enhances user engagement as content reveals itself while scrolling, adding smooth UX.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
});

// Observe elements with the fade-text class for scroll effect
document.querySelectorAll(".fade-text").forEach((el) => observer.observe(el));

// DOM elements for playback controls
const lp = document.querySelector(".lp");
const clickZone = document.getElementById("click-zone");
const playButton = document.getElementById("play-button");
const audio = document.getElementById("player");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
let isPlaying = false;

// Clicking the tonearm area toggles play/pause state.
// LP spins when music is playing to simulate a vinyl record, supporting the analog visual theme.
clickZone.addEventListener("click", () => {
  isPlaying = !isPlaying;

  lp.style.animationPlayState = isPlaying ? "running" : "paused";

  if (isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
});

// Define track list. Titles and src paths are matched for all 15 songs.
// The LP interface gives a nostalgic nod to the analog theme of Jennie's 'Ruby' album.
const songs = [
  { title: "01. Intro - JANE with FKJ", src: "musics/01.mp3" },
  { title: "02. like JENNIE", src: "musics/02.mp3" },
  { title: "03. start a war", src: "musics/03.mp3" },
  { title: "04. Handlebars", src: "musics/04.mp3" },
  { title: "05. with the IE (way up)", src: "musics/05.mp3" },
  { title: "06. ExtraL", src: "musics/06.mp3" },
  { title: "07. Mantra", src: "musics/07.mp3" },
  { title: "08. Love Hangover", src: "musics/08.mp3" },
  { title: "09. ZEN", src: "musics/09.mp3" },
  { title: "10. Damn Right", src: "musics/10.mp3" },
  { title: "11. F.T.S.", src: "musics/11.mp3" },
  { title: "12. Filter", src: "musics/12.mp3" },
  { title: "13. Seoul City", src: "musics/13.mp3" },
  { title: "14. Starlight", src: "musics/14.mp3" },
  { title: "15. twin", src: "musics/15.mp3" },
];

let currentSongIndex = 0;

// Function to load and play a song based on index.
// Updates LP, title display, and audio source.
function loadSong(index) {
  const song = songs[index];

  audio.src = song.src;
  audio.load();
  audio.play().catch((err) => console.warn("Playback failed:", err));

  document.getElementById("song-title").textContent = `${song.title}`;
}

// Next and previous buttons cycle through songs in the list
nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  isPlaying = true;
  loadSong(currentSongIndex);
});

// Repeat button toggles automatic track cycling behavior
const repeatButton = document.getElementById("repeat-button");
let isRepeat = false;

repeatButton.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatButton.classList.toggle("active", isRepeat);
});

// When audio ends, go to next song automatically if repeat is enabled.
// This keeps the listening experience seamless without user input.
audio.addEventListener("ended", () => {
  if (isRepeat) {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    lp.style.animationPlayState = "running";
    isPlaying = true;
  } else {
    isPlaying = false;
    playButton.src = "buttons/play.png";
    lp.style.animationPlayState = "paused";
  }
});

loadSong(0); // Load first song on page load

// Tracklist click interaction: clicking a song title in the list loads and plays it
const trackListItems = document.querySelectorAll("#tracklist li");

trackListItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    trackListItems.forEach((li) => li.classList.remove("active"));

    item.classList.add("active");

    currentSongIndex = index;
    loadSong(currentSongIndex);
    isPlaying = true;
    audio.play().catch((err) => console.warn("Playback failed:", err));
    lp.style.animationPlayState = "running";
    playButton.src = "buttons/pause.png";
  });
});

// Progress bar for song playback position
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");

// Utility to format seconds into M:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Show total duration when song metadata loads
audio.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audio.duration);
});

// Update current time and progress bar during playback
audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percent}%`;
});

// Clicking the progress bar allows seeking to a new position
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

// Volume slider appears on hover and allows fine-grained control of volume level
const volumeContainer = document.querySelector(".volume-container");
const volumeSlider = document.getElementById("volume-slider");

let hideTimeout;

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

volumeContainer.addEventListener("mouseenter", () => {
  clearTimeout(hideTimeout);
  volumeSlider.style.opacity = "1";
  volumeSlider.style.pointerEvents = "all";
});

volumeContainer.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => {
    volumeSlider.style.opacity = "0";
    volumeSlider.style.pointerEvents = "none";
  }, 800);
});
