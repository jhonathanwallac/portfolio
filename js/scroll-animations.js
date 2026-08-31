document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(
    ".container-conteudo-hero, .container-conteudo-sobre-mim, .container-conteudo-experiencias, .subtitulo-experiencias, .projeto-card, .container-conteudo-contato, .container-conteudo-projetos"
  );

  revealElements.forEach(function (element) {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
});
