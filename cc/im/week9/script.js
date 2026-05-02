const mybutton = document.getElementById("my-button");

mybutton.addEventListener("click", moveInput);

const myDuck = document.getElementById("my-duck");

let clicked = false;

function moveInput() {
  if (!clicked) {
    myDuck.style.translate = "-10px -20px";
    clicked = true;
  } else {
    myDuck.style.translate = "0px 0px";
    clicked = false;
  }
}
