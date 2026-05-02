const logoPage = document.getElementById("logoPage");
const splash1Page = document.getElementById("splash1Page");
const splash2Page = document.getElementById("splash2Page");
const splash3Page = document.getElementById("splash3Page");

let startX = 0;
let startY = 0;

setTimeout(() => {
  logoPage.classList.remove("active");
  splash1Page.classList.add("active");
}, 3000);

splash1Page.addEventListener("pointerdown", (event) => {
  startX = event.clientX;
  startY = event.clientY;
});

splash1Page.addEventListener("pointerup", (event) => {
  const moveX = event.clientX - startX;
  const moveY = event.clientY - startY;

  if (moveX < -50 && Math.abs(moveX) > Math.abs(moveY)) {
    splash1Page.classList.remove("active");
    splash2Page.classList.add("active");
  }
});

splash2Page.addEventListener("pointerdown", (event) => {
  startX = event.clientX;
  startY = event.clientY;
});

splash2Page.addEventListener("pointerup", (event) => {
  const moveX = event.clientX - startX;
  const moveY = event.clientY - startY;

  if (moveX > 50 && Math.abs(moveX) > Math.abs(moveY)) {
    splash2Page.classList.remove("active");
    splash1Page.classList.add("active");
  }

  if (moveX < -50 && Math.abs(moveX) > Math.abs(moveY)) {
    splash2Page.classList.remove("active");
    splash3Page.classList.add("active");
  }
});

splash3Page.addEventListener("pointerdown", (event) => {
  startX = event.clientX;
  startY = event.clientY;
});

splash3Page.addEventListener("pointerup", (event) => {
  const moveX = event.clientX - startX;
  const moveY = event.clientY - startY;

  if (moveX > 50 && Math.abs(moveX) > Math.abs(moveY)) {
    splash3Page.classList.remove("active");
    splash2Page.classList.add("active");
  }
});
