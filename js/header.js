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

  // Destaca no menu o link da seção que está na tela.
  const secoes = document.querySelectorAll("main[id], section[id]");
  const linksSecao = document.querySelectorAll(".nav-links-desktop a, .nav-links a");
  let agendado = false;

  function marcarSecaoAtual() {
    agendado = false;
    const linhaReferencia = window.innerHeight * 0.4;
    const chegouAoFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let secaoAtual = secoes[0];

    secoes.forEach(function (secao) {
      if (secao.getBoundingClientRect().top <= linhaReferencia) {
        secaoAtual = secao;
      }
    });

    // A última seção pode ser curta demais para alcançar a linha de referência.
    if (chegouAoFim) {
      secaoAtual = secoes[secoes.length - 1];
    }

    linksSecao.forEach(function (link) {
      const ativo = link.getAttribute("href") === "#" + secaoAtual.id;
      link.classList.toggle("ativo", ativo);
      if (ativo) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function agendarMarcacao() {
    if (!agendado) {
      agendado = true;
      requestAnimationFrame(marcarSecaoAtual);
    }
  }

  if (secoes.length > 0) {
    window.addEventListener("scroll", agendarMarcacao, { passive: true });
    window.addEventListener("resize", agendarMarcacao);
    marcarSecaoAtual();
  }
});