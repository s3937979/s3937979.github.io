let score = 0;
let scoreInterval;
let isJumping = false;
let isGameOver = false;
let currentStage = 1;

window.onload = () => {
  const stageStart = document.getElementById("stage-start");
  const scoreDisplay = document.getElementById("score");
  const tomato = document.getElementById("tomato2");
  const game = document.getElementById("game");

  setTimeout(() => {
    if (!isGameOver) {
      goToStage2();
    }
  }, 30000); // 30초 후 Stage 2

  // 1. Stage 1 메시지 보여주기
  setTimeout(() => {
    stageStart.style.opacity = "0";
  }, 2000);

  // 2. Stage 1 사라진 후 → 점수 시작 + 배경 스크롤
  setTimeout(() => {
    stageStart.style.display = "none";

    // ✅ 점수 증가 시작
    scoreInterval = setInterval(() => {
      if (!isGameOver) {
        score++;
        scoreDisplay.textContent = score;
      }
    }, 100); // 0.1초마다 +1

    // ✅ 배경 스크롤 시작
    game.classList.add("scroll");
  }, 2600);

  // 3. 점프 이벤트
  document.addEventListener("keydown", (e) => {
    if (
      (e.code === "Space" || e.code === "ArrowUp") &&
      !isJumping &&
      !isGameOver
    ) {
      jumpTomato();
    }
  });

  document.addEventListener("click", () => {
    if (!isJumping && !isGameOver) {
      jumpTomato();
    }
  });

  function jumpTomato() {
    isJumping = true;
    tomato.style.bottom = "300px";

    setTimeout(() => {
      tomato.style.bottom = "79px";
    }, 800);

    setTimeout(() => {
      isJumping = false;
    }, 1600);

    tomato.style.transform = "scaleY(0.5)";
    setTimeout(() => {
      tomato.style.transform = "scaleY(1)";
    }, 150);
  }

  // 4. 장애물 생성
  function createObstacle() {
    const obstacle = document.createElement("div");

    obstacle.style.position = "absolute";
    obstacle.style.top = "465px";
    obstacle.style.left = window.innerWidth + "px";
    obstacle.style.width = "150px";
    obstacle.style.height = "200px";
    obstacle.style.backgroundImage = "url('image/obstacle1.png')";
    obstacle.style.backgroundSize = "contain";
    obstacle.style.backgroundRepeat = "no-repeat";
    obstacle.style.zIndex = "1000";
    obstacle.classList.add("obstacle");

    game.appendChild(obstacle);

    let pos = window.innerWidth;

    const move = setInterval(() => {
      if (isGameOver) {
        clearInterval(move);
        return;
      }

      pos -= 5;
      obstacle.style.left = `${pos}px`;

      const tomatoBox = tomato.getBoundingClientRect();
      const obsBox = obstacle.getBoundingClientRect();

      const isColliding =
        tomatoBox.left + 50 < obsBox.right - 50 &&
        tomatoBox.right - 50 > obsBox.left + 50 &&
        tomatoBox.bottom > obsBox.top + 50 &&
        tomatoBox.top < obsBox.bottom - 50;

      if (isColliding) {
        clearInterval(move);
        obstacle.remove();
        handleGameOver();
      }

      if (pos < -150) {
        clearInterval(move);
        obstacle.remove();
      }
    }, 16);
  }

  // 5. 게임 오버 처리
  function handleGameOver() {
    isGameOver = true;
    clearInterval(scoreInterval);

    game.classList.remove("scroll");
    game.classList.add("paused");

    document.getElementById("game-over").style.display = "flex";

    document.querySelectorAll(".obstacle").forEach((obs) => obs.remove());
  }

  // 6. 일정 간격으로 장애물 생성
  setInterval(() => {
    if (!isGameOver) {
      createObstacle();
    }
  }, 3000);

  function goToStage2() {
    currentStage = 2;

    // Stage 2 메시지 표시
    const stageStart = document.getElementById("stage-start");
    stageStart.textContent = "Stage 2";
    stageStart.style.opacity = "1";
    stageStart.style.display = "flex";

    // 메시지 잠깐 보여줌
    setTimeout(() => {
      stageStart.style.opacity = "0";
    }, 2000);
    setTimeout(() => {
      stageStart.style.display = "none";
    }, 2600);

    // (선택) Stage 2 효과: 장애물 더 자주 나오게 하기 등
  }
};
