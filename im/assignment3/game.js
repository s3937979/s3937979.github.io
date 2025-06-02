const tomato = document.getElementById("tomato");
let isJumping = false;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !isJumping) {
    isJumping = true;
    tomato.style.bottom = "120px"; // 점프

    setTimeout(() => {
      tomato.style.bottom = "20px"; // 착지
      setTimeout(() => {
        isJumping = false;
      }, 300);
    }, 300);
  }
});
