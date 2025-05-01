const lp = document.querySelector(".lp");
const clickZone = document.getElementById("click-zone");

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

const audio = document.getElementById("player");
const lyricsBox = document.getElementById("lyrics-box");
const nextButton = document.getElementById("next-button");
const title = document.getElementById("song-title");

const songs = [
  {
    title: "Intro - JANE with FKJ",
    src: "musics/01. Intro - JANE with FKJ.mp3",
    lyrics: [
      { time: 0.0, text: "Run like this, run, I" },
      { time: 2.0, text: "Run like this, run, love you" },
      { time: 4.1, text: "But you run like this, run like" },
      { time: 6.2, text: "Run like this, run, love you" },
      { time: 10.0, text: "Like" },
      { time: 10.7, text: "Like" },
      { time: 11.5, text: "Like" },
      { time: 12.3, text: "Run like" },
      { time: 13.1, text: "Like" },
      { time: 13.8, text: "Like" },
      { time: 14.5, text: "Like, like, like" },
      { time: 20.0, text: "Run like this, run, I" },
      { time: 22.0, text: "Run like this, run, love you" },
      { time: 24.1, text: "But you run like this, run, I" },
      { time: 26.3, text: "Run like this, run, love" },
      { time: 30.0, text: "Like" },
      { time: 30.7, text: "Like" },
      { time: 31.5, text: "Like" },
      { time: 32.3, text: "Run like" },
      { time: 33.1, text: "Like" },
      { time: 33.8, text: "Like" },
      { time: 34.5, text: "Like, like, like" },
      { time: 40.0, text: "Run like this, run, I" },
      { time: 42.0, text: "Run like this, run, love you" },
      { time: 44.1, text: "But you run like this, run, I" },
      { time: 46.3, text: "Run like this, run, love" },
    ],
  },
  // 여기에 song2, song3... 추가 가능
];

let currentSongIndex = 0;
let currentLyrics = songs[0].lyrics;
let currentLine = 0;

function loadSong(index) {
  const song = songs[index];
  title.textContent = `🎵 ${song.title}`;
  audio.src = song.src;
  currentLyrics = song.lyrics;
  currentLine = 0;
  lyricsBox.innerHTML = "";
  audio.play();
}

audio.addEventListener("timeupdate", () => {
  const time = audio.currentTime;

  if (
    currentLine < currentLyrics.length &&
    time >= currentLyrics[currentLine].time
  ) {
    const line = document.createElement("p");
    line.textContent = currentLyrics[currentLine].text;
    lyricsBox.appendChild(line);
    lyricsBox.scrollTop = lyricsBox.scrollHeight;
    currentLine++;
  }
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
});

// 첫 곡 자동 로드
loadSong(0);
