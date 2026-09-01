document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = navLinks ? navLinks.querySelectorAll("a") : [];

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("open");
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }
});