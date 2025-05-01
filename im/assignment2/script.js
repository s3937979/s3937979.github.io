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

audio.src = "musics/01.mp3";

const songs = [
  {
    title: "Intro - JANE with FKJ",
    src: "musics/01.mp3",
    lyrics: [
      { time: 0.01, text: "Run like this, run, I" },
      { time: 5.0, text: "Run like this, run, love you" },
      { time: 10.0, text: "But you run like this, run like" },
      { time: 14.0, text: "Run like this, run, love you" },
      { time: 20.0, text: "Like" },
      { time: 30.0, text: "Like" },
      { time: 39.0, text: "Like" },
      { time: 49.0, text: "Run like" },
      { time: 59.0, text: "Like" },
      { time: 69.0, text: "Like" },
      { time: 76.0, text: "Like, like, like" },
      { time: 78.0, text: "Run like this, run, I" },
      { time: 83.0, text: "Run like this, run, love you" },
      { time: 87.0, text: "But you run like this, run, I" },
      { time: 93.0, text: "Run like this, run, love" },
    ],
  },
  {
    title: "like JENNIE",
    src: "musics/02.mp3",
    lyrics: [
      { time: 0.01, text: "Ha, c'mon, it's gon' be fucking hard" },
      { time: 10.0, text: "Special edition and your AI couldn't copy" },
      {
        time: 13.0,
        text: "I'm leaving clues in the fittin' room and it's hot tea",
      },
      {
        time: 17.0,
        text: "No, I'm not thinking about no exes, know they miss me",
      },
      { time: 20.0, text: "I got the whole room spinning like it's tipsy" },
      { time: 24.0, text: "Don't bore us, take you to the chorus" },
      { time: 26.0, text: "Who wanna rock with JENNIE?" },
      { time: 28.0, text: "Keep your hair done, nails done like JENNIE" },
      { time: 30.0, text: "Who else got 'em obsessed like JENNIE?" },
      { time: 32.0, text: "Like, like, like (JENNIE, JENNIE, JENNIE, JENNIE)" },
      { time: 34.0, text: "I think I really like (JENNIE, JENNIE, JENNIE)" },
      {
        time: 36.0,
        text: "Haters, they don't really like (JENNIE, JENNIE, JENNIE, JENNIE)",
      },
      {
        time: 37.0,
        text: "'Cause they could never ever be (JENNIE, JENNIE, JENNIE)",
      },
      {
        time: 40.0,
        text: "But have you ever met JENNIE, JENNIE, JENNIE, JENNIE?",
      },
      { time: 44.0, text: "It's JENNIE, JENNIE, JENNIE, JENNIE, JENNIE" },
      { time: 47.0, text: "But have you ever met?" },
      { time: 51.0, text: "But have you ever met?" },
      { time: 55.0, text: "But have you ever met?" },
      { time: 55.5, text: "얼말 줘도 못해 서커스짓" },
      { time: 57.0, text: "포징한번에 만들어 mosh pit" },
      { time: 59.0, text: "They can't deal with me 'cause I'm priceless" },
      { time: 61.0, text: "여러 셀럽들 속에 내 DNA" },
      { time: 63.0, text: "Get, get outta my way" },
      { time: 65.0, text: "바비가 처키가 되기 전에" },
      { time: 66.0, text: "Name, shame, blame tryna burst my bubble" },
      { time: 68.0, text: "터트려봐 그럼 더 큰 홀에서 만나는 거야 제니를" },
      { time: 71.0, text: "keep shading" },
      { time: 72.0, text: "예술작품엔 필요해 frame이" },
      { time: 74.0, text: "I've slayed it, and I graved it" },
      { time: 76.0, text: "Yes, I'm guilty 잘난 게 죄니 (Mmh)" },

      { time: 78.0, text: "Who wanna rock with JENNIE?" },
      { time: 80.0, text: "Keep your hair done, nails done like JENNIE" },
      { time: 82.0, text: "Who else got 'em obsessed like JENNIE?" },
      { time: 84.0, text: "Like, like, like" },
      { time: 86.0, text: "I think I really like JENNIE" },
      { time: 88.0, text: "Haters, they don't really like JENNIE" },
      { time: 90.0, text: "'Cause they could never ever be JENNIE" },
      {
        time: 92.0,
        text: "But have you ever met JENNIE, JENNIE, JENNIE, JENNIE?",
      },
      {
        time: 96.0,
        text: "That's JENNIE, JENNIE, JENNIE, JENNIE, JENNIE, JENNIE, JENNIE",
      },

      { time: 99.0, text: "Like JENNIE, JENNIE, JENNIE, JENNIE, JENNIE" },
      { time: 103.0, text: "Rock with JENNIE" },
      { time: 104.0, text: "Keep your hair done, nails done like JENNIE" },
      { time: 106.0, text: "Who else got 'em obsessed, like" },

      { time: 114.0, text: "But have you ever met JENNIE?" },
      { time: 116.0, text: "But have you ever met?" },
      { time: 118.0, text: "JENNIE, JENNIE, JENNIE" },
      { time: 120.0, text: "It's JENNIE, JENNIE, JENNIE, JENNIE" },
    ],
  },
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

  currentLyrics.forEach((line) => {
    const p = document.createElement("p");
    p.classList.add("lyric-line");
    p.textContent = line.text;
    lyricsBox.appendChild(p);
  });

  // 🔒 LP 정지
  lp.style.animationPlayState = "paused";
  isPlaying = false;
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
audio.play();
lp.style.animationPlayState = "running";
isPlaying = true;
// });

// 첫 곡 자동 로드
loadSong(0);
