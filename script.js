document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = navLinks.querySelectorAll("a");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  const slide = document.querySelector(".slide");
  const setaEsquerda = document.querySelector(".seta-esquerda");
  const setaDireita = document.querySelector(".seta-direita");

  if (slide && setaEsquerda && setaDireita) {
    const card = slide.querySelector(".card");
    let scrollAmount = card ? card.offsetWidth + 24 : 300;

    setaEsquerda.addEventListener("click", () => {
      slide.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    setaDireita.addEventListener("click", () => {
      slide.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
});
