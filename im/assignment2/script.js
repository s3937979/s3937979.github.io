const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible"); // 사라지는 효과까지 원할 때
    }
  });
});

document.querySelectorAll(".fade-text").forEach((el) => observer.observe(el));

const lp = document.querySelector(".lp");
const clickZone = document.getElementById("click-zone");
const playButton = document.getElementById("play-button");
const audio = document.getElementById("player");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
let isPlaying = false;

clickZone.addEventListener("click", () => {
  isPlaying = !isPlaying;

  // LP 회전 제어
  lp.style.animationPlayState = isPlaying ? "running" : "paused";

  // 음악 재생/정지
  if (isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
});

const songs = [
  {
    title: "01. Intro - JANE with FKJ",
    src: "musics/01.mp3",
  },
  {
    title: "02. like JENNIE",
    src: "musics/02.mp3",
  },
  {
    title: "03. start a war",
    src: "musics/03.mp3",
  },
  {
    title: "04. Handlebars",
    src: "musics/04.mp3",
  },
  {
    title: "05. with the IE (way up)",
    src: "musics/05.mp3",
  },
  {
    title: "06. ExtraL",
    src: "musics/06.mp3",
  },
  {
    title: "07. Mantra",
    src: "musics/07.mp3",
  },
  {
    title: "08. Love Hangover",
    src: "musics/08.mp3",
  },
  {
    title: "09. ZEN",
    src: "musics/09.mp3",
  },
  {
    title: "10. Damn Right",
    src: "musics/10.mp3",
  },
  {
    title: "11. F.T.S.",
    src: "musics/11.mp3",
  },
  {
    title: "12. Filter",
    src: "musics/12.mp3",
  },
  {
    title: "13. Seoul City",
    src: "musics/13.mp3",
  },
  {
    title: "14. Starlight",
    src: "musics/14.mp3",
  },
  {
    title: "15. twin",
    src: "musics/15.mp3",
  },
];

let currentSongIndex = 0;

function loadSong(index) {
  const song = songs[index];
  if (!song) {
    console.warn("곡 정보 없음:", index);
    return;
  }
  audio.src = song.src;
  audio.load();
  audio.play().catch((err) => console.warn("재생 실패:", err));

  document.getElementById("song-title").textContent = `${song.title}`;
}

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  isPlaying = true;
  loadSong(currentSongIndex);
});

const repeatButton = document.getElementById("repeat-button");
let isRepeat = false;

repeatButton.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatButton.classList.toggle("active", isRepeat);
});

// 자동으로 다음 곡 또는 처음 곡으로 반복
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

loadSong(0);

const trackListItems = document.querySelectorAll("#tracklist li");

trackListItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // 모든 트랙에서 active 제거
    trackListItems.forEach((li) => li.classList.remove("active"));

    // 클릭한 트랙에 active 추가
    item.classList.add("active");

    // 곡 재생
    currentSongIndex = index;
    loadSong(currentSongIndex);
    isPlaying = true;
    audio.play().catch((err) => console.warn("재생 실패:", err));
    lp.style.animationPlayState = "running";
    playButton.src = "buttons/pause.png";
  });
});

const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

audio.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percent}%`;
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

const volumeContainer = document.querySelector(".volume-container");
const volumeSlider = document.getElementById("volume-slider");

let hideTimeout;

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

volumeContainer.addEventListener("mouseenter", () => {
  clearTimeout(hideTimeout); // 숨기기 취소
  volumeSlider.style.opacity = "1";
  volumeSlider.style.pointerEvents = "all";
});

volumeContainer.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => {
    volumeSlider.style.opacity = "0";
    volumeSlider.style.pointerEvents = "none";
  }, 800); // 800ms 후에 숨김
});
