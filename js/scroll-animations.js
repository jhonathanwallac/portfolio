document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(
    ".container-conteudo-hero, .container-conteudo-sobre-mim, .container-conteudo-experiencias, .subtitulo-experiencias, .experiencia-container, .projeto-card, .container-conteudo-contato, .container-conteudo-projetos"
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
    return;
  }

  revealElements.forEach(function (element) {
    element.classList.add("reveal");
  });

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: isMobile ? 0.12 : 0.18,
    rootMargin: isMobile ? "0px 0px -8vh 0px" : "0px 0px -12% 0px"
  });

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
});
