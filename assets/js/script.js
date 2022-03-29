"use strict";
/* Show Mobile Menu*/
const showMenu = (toggleEl, navEl) => {
  const toggle = document.getElementById(toggleEl);
  const navMenu = document.getElementById(navEl);

  toggle.addEventListener("click", () => {
    navMenu.classList.toggle("show__menu");
  });
};

showMenu("nav-toggle", "nav__menu");

/* Remove Mobile Menu */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav__menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show__menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/* Active Link While Scrolling Sections */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/* Form Validation */

const form = document.querySelector(".contact__form");
const emailInput = document.getElementById("email");
const textArea = document.getElementById("mensagem");
const errorEmail = document.getElementById("error-email");
const errorMsg = document.getElementById("error-msg");
const successSubmit = document.querySelector(".success");
const successValue = successSubmit.innerHTML;

/* When submit button is clicked, check the inputs */
form.addEventListener("submit", (event) => {
  /* Prevent submit from realoading the page */
  event.preventDefault();
  checkInputs();
});

function checkInputs() {
  const emailInputValue = emailInput.value.trim();

  if (!emailInputValue || emailInputValue.search("@") === -1) {
    errorEmail.classList.remove("hide");
  } else {
    const [usuario, dominio] = emailInput.value.split("@");
    const [subdominio, end] = dominio.split(".");

    if (!isValidUser(usuario) || !isValidSubDomain(subdominio) || !end) {
      console.log(`${usuario}, seu nome de usuário é inválido`);
      errorEmail.classList.remove("hide");
    } else {
      errorEmail.classList.add("hide");
    }

    if (!textArea.value) {
      errorMsg.classList.remove("hide");
    } else {
      errorMsg.classList.add("hide");
    }

    if (
      errorEmail.classList.contains("hide") &&
      errorMsg.classList.contains("hide")
    ) {
      const textMsg = successValue.split(",");
      successSubmit.textContent = textMsg[0] + ", " + usuario;
      successSubmit.classList.remove("hide");
    } else {
      successSubmit.classList.add("hide");
    }
  }
}

function isValidUser(str) {
  const regexUser = /^([a-zA-Z0-9\.]){1,32}$/;

  return regexUser.test(str);
}

function isValidSubDomain(str) {
  const regexDomain = /^([a-z0-9]){1,16}$/;

  return regexDomain.test(str);
}
