const heading = document.getElementById("heading");
const mainImage = document.getElementById("main-image");
const secondPage = document.getElementById("second-page");
const dialog = document.getElementById("myDialog");

heading.addEventListener("click", () => {
  document.querySelector(".main-page").style.display = "none";
  document.querySelector(".main-page-stars").style.display = "none";
  document.querySelector(".second-page").style.display = "block";

  // 별 캐릭터 먼저 보여주기 (예: 나타났다 사라지게 만들 수도 있음)
  const star = document.querySelector(".star-character");
  star.style.display = "block";

  // 💡 dialog는 2초 뒤에 열기
  setTimeout(() => {
    dialog.showModal();
  }, 4000); // 2000ms = 2초
});

document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.querySelector(".send-button");
  const secondPage = document.querySelector(".second-page");
  const thirdPage = document.querySelector(".third-page");

  if (sendButton) {
    sendButton.addEventListener("click", () => {
      secondPage.style.display = "none";
      thirdPage.style.display = "flex";
    });
  } else {
    console.warn("sendButton not found!");
  }
});

const sendButton = document.querySelector(".send-button");
const thirdPage = document.querySelector(".third-page");
const emotionSelect = document.getElementById("emotion-select");
const emotionStar = document.getElementById("emotion-star");

sendButton.addEventListener("click", () => {
  const rawEmotion = emotionSelect.value;
  const emotion = rawEmotion.replace("#", "").toLowerCase(); // "#Happy" → "happy"

  emotionStar.src = `images/${emotion}-star.png`;

  secondPage.style.display = "none";
  thirdPage.style.display = "block";

  const fadeText = document.getElementById("fade-text");

  // 문구가 다시 나타날 수 있도록 animation 초기화 → 재적용
  fadeText.style.animation = "none";
  fadeText.offsetHeight; // reflow 트릭
  fadeText.style.animation = "fadeInOut 3s ease forwards";
});
