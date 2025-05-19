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

const sendButton = document.querySelector("send-button");
const thirdPage = document.querySelector("third-page");

sendButton.addEventListener("click", () => {
  // 두 번째 페이지 숨기고
  secondPage.style.display = "none";
  // 세 번째 페이지 보여주기
  thirdPage.style.display = "flex";
});
