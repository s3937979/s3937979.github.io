const logoPage = document.getElementById("logoPage");
const splash1Page = document.getElementById("splash1Page");

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
