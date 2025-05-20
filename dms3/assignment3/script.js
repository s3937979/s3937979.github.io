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

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

// 캔버스 사이즈 세팅
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// 먼저 검은색으로 덮어줌 (중요!!)
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;

canvas.addEventListener("mousedown", () => {
  isDrawing = true;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2, false);
  ctx.fill();
});
