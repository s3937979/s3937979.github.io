document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");
  const heading = document.getElementById("heading");
  const mainPage = document.querySelector(".main-page");
  const mainStars = document.querySelector(".main-page-stars");
  const secondPage = document.querySelector(".second-page");
  const thirdPage = document.querySelector(".third-page");
  const dialog = document.getElementById("myDialog");
  const sendButton = document.querySelector(".send-button");
  const emotionSelect = document.getElementById("emotion-select");
  const emotionStar = document.getElementById("emotion-star");
  const fadeText = document.getElementById("fade-text");
  const backText = document.getElementById("back-text");
  const star = document.querySelector(".star-character");

  // 🔊 유저 클릭 시 배경음악 실행
  document.addEventListener("click", () => {
    bgMusic.muted = false;
    bgMusic.play().catch((err) => {
      console.warn("배경음악 재생 실패:", err);
    });
  });

  // 🌟 heading 누르면 second page 보여주기
  heading.addEventListener("click", () => {
    mainPage.style.display = "none";
    mainStars.style.display = "none";
    secondPage.style.display = "block";

    // 캐릭터 잠깐 등장
    star.style.display = "block";

    setTimeout(() => {
      dialog.showModal();
    }, 4000);
  });

  // 📤 send 버튼 누르면 third page로 이동
  sendButton.addEventListener("click", () => {
    const rawEmotion = emotionSelect.value;
    const emotion = rawEmotion.replace("#", "").toLowerCase(); // "#Happy" → "happy"

    emotionStar.src = `images/${emotion}-star.png`;

    secondPage.style.display = "none";
    thirdPage.style.display = "block";

    // 문장 애니메이션 실행
    fadeText.style.animation = "none"; // 초기화
    fadeText.offsetHeight; // 강제 재계산
    fadeText.style.animation = "fadeInOut 20s ease forwards";
  });
});
