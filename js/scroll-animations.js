document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  iniciarRevelacao();
});

function iniciarRevelacao() {
  const elementos = document.querySelectorAll(
    ".container-conteudo-sobre-mim, .subtitulo-experiencias, .experiencia-texto, .subtitulo-projetos, .projeto-card, .subtitulo-contato, .contato-texto, .contato-localizacao"
  );
  const gruposTags = document.querySelectorAll(".experiencia-texto .tags");

  elementos.forEach(function (elemento) {
    elemento.classList.add("revelar");
  });

  // As tags aparecem uma após a outra, em cascata.
  gruposTags.forEach(function (grupo) {
    grupo.classList.add("revelar-tags");
    grupo.querySelectorAll("span").forEach(function (tag, indice) {
      tag.style.setProperty("--atraso", Math.min(indice * 30, 600) + "ms");
    });
  });

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) {
        return;
      }

      const elemento = entrada.target;
      if (elemento.classList.contains("projeto-card")) {
        elemento.style.setProperty("--atraso", atrasoNaGrade(elemento) + "ms");
      }
      elemento.classList.add("revelado");
      observador.unobserve(elemento);
    });
  }, {
    rootMargin: "0px 0px -10% 0px"
  });

  elementos.forEach(function (elemento) {
    observador.observe(elemento);
  });
  gruposTags.forEach(function (grupo) {
    observador.observe(grupo);
  });
}

// Cards da mesma linha da grade entram da esquerda para a direita.
function atrasoNaGrade(card) {
  const grade = card.parentElement;
  const colunas = getComputedStyle(grade).gridTemplateColumns.split(" ").length;
  const indice = Array.prototype.indexOf.call(grade.children, card);
  return (indice % colunas) * 100;
}
