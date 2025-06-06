// Main game script with audio integration for background music and sound effects
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
let jumpQueue = 0;

// Maximum obstacles per stage
const maxObstacles = {
  1: 8,
  2: 13,
  3: 20,
};

window.onload = () => {
  // Load and play background music
  const bgm = document.getElementById("bgm");
  bgm.volume = 0.4;
  bgm.play().catch((e) => {
    console.warn("BGM play failed:", e);
  });

  // Load sound effect elements
  const sfxJump = document.getElementById("sfx-jump");
  const sfxGameOver = document.getElementById("sfx-gameover");
  const sfxClear = document.getElementById("sfx-clear");

  // Initialize DOM elements
  const stageStart = document.getElementById("stage-start");
  const scoreDisplay = document.getElementById("score");
  const tomato = document.getElementById("tomato2");
  const game = document.getElementById("game");

  // Display stage 1 announcement
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

  // Timed stage transitions and clear
  setTimeout(() => {
    if (!isGameOver) goToStage(2);
  }, 30000);

  setTimeout(() => {
    if (!isGameOver) {
      goToStage(3);
      setTimeout(() => {
        if (!isGameOver && currentStage === 3) {
          showGameClear();
        }
      }, 30000);
    }
  }, 60000);

  // Input events
  document.addEventListener("keydown", (e) => {
    if ((e.code === "Space" || e.code === "ArrowUp") && !isGameOver) {
      jumpTomato();
    }
  });

  document.addEventListener("click", () => {
    if (!isGameOver) {
      jumpTomato();
    }
  });

  // Jump function
  function jumpTomato() {
    if (isJumping) {
      jumpQueue++;
      return;
    }

    sfxJump.currentTime = 0;
    sfxJump.play();

    isJumping = true;
    tomato.style.bottom = "350px";
    tomato.style.transform = "scaleY(0.5)";

    setTimeout(() => {
      tomato.style.transform = "scaleY(1)";
    }, 150);

    setTimeout(() => {
      tomato.style.bottom = "70px";
    }, 790);

    setTimeout(() => {
      isJumping = false;
      if (jumpQueue > 0) {
        jumpQueue--;
        jumpTomato();
      }
    }, 1000);
  }

  // Create obstacle
  function createObstacle() {
    if (obstacleCount >= (maxObstacles[currentStage] || Infinity)) return;
    obstacleCount++;

    const obstacle = document.createElement("div");
    const obstacleStage = currentStage;
    obstacle.style.position = "absolute";
    obstacle.style.top = "465px";
    obstacle.style.left = window.innerWidth + "px";
    obstacle.style.width = obstacleStage === 3 ? "180px" : "150px";
    obstacle.style.height = obstacleStage === 3 ? "180px" : "200px";
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
    const speed = obstacleStage === 3 ? 11 : obstacleStage === 2 ? 8 : 5;

    const move = setInterval(() => {
      if (isGameOver || !allowObstacleMove) return;

      pos -= speed;
      obstacle.style.left = `${pos}px`;

      const tomatoBox = tomato.getBoundingClientRect();
      const obsBox = obstacle.getBoundingClientRect();
      const isColliding =
        tomatoBox.left + 60 < obsBox.right - 60 &&
        tomatoBox.right - 60 > obsBox.left + 60 &&
        tomatoBox.bottom > obsBox.top + 60 &&
        tomatoBox.top < obsBox.bottom - 60;

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

  // Obstacle interval
  function startObstacleInterval() {
    const delay = currentStage === 3 ? 1200 : currentStage === 2 ? 1800 : 3000;
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

  // Update character image by stage
  function updateTomatoImage(stage) {
    tomato.src =
      stage === 2
        ? "image/tomato3.png"
        : stage === 3
        ? "image/tomato4.png"
        : "image/tomato2.png";
  }

  // Game over
  function handleGameOver() {
    isGameOver = true;
    clearInterval(scoreInterval);
    clearInterval(obstacleInterval);
    game.classList.remove("scroll");
    game.classList.add("paused");

    sfxGameOver.currentTime = 0;
    sfxGameOver.play();

    document.getElementById("game-over").style.display = "flex";
    document.querySelectorAll(".obstacle").forEach((obs) => obs.remove());
  }

  // Stage transition
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

  // Game clear
  function showGameClear() {
    isGameOver = true;
    clearInterval(scoreInterval);
    clearInterval(obstacleInterval);
    game.classList.remove("scroll");
    game.classList.add("paused");

    sfxClear.currentTime = 0;
    sfxClear.play();

    document.getElementById("game-clear").style.display = "flex";
    document.querySelectorAll(".obstacle").forEach((obs) => obs.remove());
  }

  startObstacleInterval();
};
