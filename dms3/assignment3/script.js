const heading = document.getElementById("heading");
const dialog = document.getElementById("myDialog");
const mainImage = document.getElementById("main-image");

heading.addEventListener("click", () => {
  document.querySelector(".main-page").style.display = "none";
  document.querySelector(".main-page-stars").style.display = "none";

  mainImage.src = "images/second-page.png";

  dialog.showModal();
});
