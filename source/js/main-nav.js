const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");
const navText = document.querySelector(".main-nav__toggle-button");

if (navMain.classList.contains("main-nav--nojs")) {
  navMain.classList.remove("main-nav--nojs");
}
if (navMain.classList.contains("main-nav--opened")) {
  navMain.classList.remove("main-nav--opened");
}
if (!navMain.classList.contains("main-nav--closed")) {
  navMain.classList.add("main-nav--closed");
}

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
    navText.textContent = "Закрыть меню";
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
    navText.textContent = "Открыть меню";
  }
});
