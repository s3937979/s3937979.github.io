window.onload = () => {
  const buttons = document.getElementById("buttonGroup");
  setTimeout(() => {
    document.getElementById("ketchup").classList.add("pop");
  }, 900); // 0.6초 후 화면에 '팍!' 등장

  // JS 코드에서 이게 실행돼야 토마토 보임
  setTimeout(() => {
    document.getElementById("tomato1").classList.add("pop");
  }, 900);

  setTimeout(() => {
    title.classList.add("pop");
  }, 1700); // 토마토보다 늦게 등장

  setTimeout(() => {
    buttons.classList.add("show");
  }, 2000);
};

document.getElementById("start-btn").addEventListener("click", () => {
  document.body.classList.add("fade-out"); // 페이드 아웃 클래스 추가

  setTimeout(() => {
    window.location.href = "game.html";
  }, 500); // 0.5초 후 페이지 이동
});
