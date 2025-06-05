let score = 0;
let scoreInterval;
let isJumping = false;
let isGameOver = false;
let currentStage = 1;
let allowCollision = true;
let allowObstacleMove = true;
let allowObstacleCreate = true;
let obstacleInterval;
let obstacleCount = 0;
const maxObstacles = {
  1: 8, // Stage 1은 무제한
  2: 13, // Stage 2는 10개까지만
  3: 15, // Stage 3은 15개까지만
};

window.onload = () => {
  const stageStart = document.getElementById("stage-start");
  const scoreDisplay = document.getElementById("score");
  const tomato = document.getElementById("tomato2");
  const game = document.getElementById("game");

  stageStart.textContent = "Stage 1";
  stageStart.style.display = "flex";
  stageStart.style.opacity = "1";

  setTimeout(() => {
    stageStart.style.opacity = "0";
  }, 2000);

  setTimeout(() => {
    stageStart.style.display = "none";
    game.classList.add("scroll");
    scoreInterval = setInterval(() => {
      if (!isGameOver) {
        score++;
        scoreDisplay.textContent = score;
      }
    }, 100);
  }, 2600);

  setTimeout(() => {
    if (!isGameOver) goToStage(2);
  }, 30000);
  setTimeout(() => {
    if (!isGameOver) goToStage(3);
  }, 60000);

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

  function createObstacle() {
    if (obstacleCount >= (maxObstacles[currentStage] || Infinity)) return;
    obstacleCount++;

    const obstacle = document.createElement("div");
    const obstacleStage = currentStage;
    obstacle.style.position = "absolute";
    obstacle.style.top = "465px";
    obstacle.style.left = window.innerWidth + "px";
    obstacle.style.width = obstacleStage === 2 ? "150px" : "150px";
    obstacle.style.height = obstacleStage === 2 ? "200px" : "200px";
    obstacle.style.backgroundImage =
      obstacleStage === 3
        ? "url('image/obstacle3.png')"
        : obstacleStage === 2
        ? "url('image/obstacle2.png')"
        : "url('image/obstacle1.png')";
    obstacle.style.backgroundSize = "contain";
    obstacle.style.backgroundRepeat = "no-repeat";
    obstacle.style.zIndex = "1000";
    obstacle.classList.add("obstacle");
    game.appendChild(obstacle);

    let pos = window.innerWidth;
    const speed = obstacleStage === 2 ? 8 : 5;

    const move = setInterval(() => {
      if (isGameOver || !allowObstacleMove) return;
      pos -= speed;
      obstacle.style.left = `${pos}px`;
      const tomatoBox = tomato.getBoundingClientRect();
      const obsBox = obstacle.getBoundingClientRect();
      const isColliding =
        tomatoBox.left + 50 < obsBox.right - 50 &&
        tomatoBox.right - 50 > obsBox.left + 50 &&
        tomatoBox.bottom > obsBox.top + 50 &&
        tomatoBox.top < obsBox.bottom - 50;
      if (isColliding && allowCollision && !isGameOver) {
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

  function startObstacleInterval() {
    const delay = currentStage === 2 ? 1800 : 3000;
    obstacleInterval = setInterval(() => {
      if (!isGameOver && allowObstacleCreate) {
        createObstacle();
      }
    }, delay);
  }

  function resetObstacleInterval() {
    clearInterval(obstacleInterval);
    startObstacleInterval();
  }

  function updateTomatoImage(stage) {
    if (stage === 2) {
      tomato.src = "image/tomato3.png";
    } else if (stage === 3) {
      tomato.src = "image/tomato4.png";
    } else {
      tomato.src = "image/tomato2.png";
    }
  }

  function handleGameOver() {
    isGameOver = true;
    clearInterval(scoreInterval);
    clearInterval(obstacleInterval);
    game.classList.remove("scroll");
    game.classList.add("paused");
    document.getElementById("game-over").style.display = "flex";
    document.querySelectorAll(".obstacle").forEach((obs) => obs.remove());
  }

  function goToStage(stageNumber) {
    currentStage = stageNumber;
    obstacleCount = 0;
    allowCollision = false;
    allowObstacleMove = false;
    allowObstacleCreate = false;
    game.classList.remove("scroll");
    game.style.backgroundImage = `url('image/bg-stage${stageNumber}.jpg')`;
    updateTomatoImage(stageNumber);
    stageStart.textContent = `Stage ${stageNumber}`;
    stageStart.style.display = "flex";
    stageStart.style.opacity = "1";
    setTimeout(() => {
      stageStart.style.opacity = "0";
    }, 2000);
    setTimeout(() => {
      stageStart.style.display = "none";
      game.classList.add("scroll");
      allowCollision = true;
      allowObstacleMove = true;
      allowObstacleCreate = true;
      resetObstacleInterval();
    }, 2600);
  }

  startObstacleInterval();
};
