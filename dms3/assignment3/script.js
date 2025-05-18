const heading = document.getElementById("heading");
const mainImage = document.getElementById("main-image");
const secondPage = document.getElementById("second-page");
const dialog = document.getElementById("myDialog");

heading.addEventListener("click", () => {
  document.querySelector(".main-page").style.display = "none";
  document.querySelector(".main-page-stars").style.display = "none";
  document.querySelector(".second-page").style.display = "block";
  document.querySelector(".star-character").style.display = "block";

  const dialog = document.getElementById("myDialog");
  dialog.showModal();
});
