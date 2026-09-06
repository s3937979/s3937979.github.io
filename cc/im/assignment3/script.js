window.onload = () => {
  const buttons = document.getElementById("buttonGroup");

  // This block animates the entrance of the ketchup and tomato images, title text, and button group.
  // Each element is animated in sequence using setTimeout to create a playful, cinematic introduction.
  // The ketchup and tomato images appear with scaling effects, followed by the title and buttons.
  // This approach grabs attention and builds a visually engaging entrance experience for the player.
  setTimeout(() => {
    document.getElementById("ketchup").classList.add("pop");
  }, 900);

  setTimeout(() => {
    document.getElementById("tomato1").classList.add("pop");
  }, 900);

  setTimeout(() => {
    title.classList.add("pop");
  }, 1700);

  setTimeout(() => {
    buttons.classList.add("show");
  }, 2000);
};

// When the START button is clicked, this block fades out the screen and transitions to the main game page.
// It also stops any playing background music to ensure a clean audio transition to the game.
// The fade effect is controlled via CSS, while the navigation is delayed to sync with the animation.
document.getElementById("start-btn").addEventListener("click", () => {
  document.body.classList.add("fade-out");

  const bgm = document.getElementById("bgm-index");
  bgm.pause();
  bgm.currentTime = 0;

  setTimeout(() => {
    window.location.href = "game.html";
  }, 500);
});

// When the STORY button is clicked, this block shows the story popup and plays background music.
// If the music is not already playing, it starts playback with a slight volume.
// This interaction encourages user exploration and adds emotional depth to the experience.
document.getElementById("info-btn").addEventListener("click", () => {
  document.getElementById("story-popup").style.display = "block";

  const bgm = document.getElementById("bgm-index");
  if (bgm.paused) {
    bgm.volume = 0.5;
    bgm.play().catch((e) => {
      console.warn("Failed to play BGM:", e);
    });
  }
});

// Closes the story popup when the close button is clicked.
// This simply hides the popup by setting its display to none.
// No audio is affected, allowing the BGM to continue if it was playing.
document.getElementById("close-story").addEventListener("click", () => {
  document.getElementById("story-popup").style.display = "none";
});
