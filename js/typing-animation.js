(function () {
  const codigo = document.querySelector(".codigo-pagina-inicial pre");

  if (!codigo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // A duração é fixa: o intervalo entre caracteres se ajusta ao tamanho do código.
  const ATRASO_INICIAL_MS = 300;
  const DURACAO_DIGITACAO_MS = 4000;
  // Uma quebra de linha "custa" o tempo de 4 caracteres, criando uma pequena pausa.
  const PESO_QUEBRA_LINHA = 4;

  const cursor = document.createElement("span");
  cursor.className = "cursor-digitacao";
  cursor.setAttribute("aria-hidden", "true");

  const nosTexto = [];
  const walker = document.createTreeWalker(codigo, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    nosTexto.push(walker.currentNode);
  }

  if (nosTexto.length === 0) {
    return;
  }

  // Evita que o cursor termine em uma linha vazia após o último "}".
  const ultimoNo = nosTexto[nosTexto.length - 1];
  ultimoNo.data = ultimoNo.data.trimEnd();

  // Cada nó de texto vira um trecho já digitado + o restante oculto, que continua
  // ocupando espaço. Assim o bloco não muda de tamanho durante a animação.
  const trechos = nosTexto.map(function (no) {
    const digitado = document.createTextNode("");
    const restante = document.createElement("span");
    restante.className = "texto-oculto";
    restante.textContent = no.data;
    no.replaceWith(digitado, restante);
    return { digitado: digitado, restante: restante };
  });

  trechos[0].digitado.after(cursor);

  // Espaços de indentação aparecem de uma vez, como um Tab.
  const pedacos = [];
  trechos.forEach(function (trecho) {
    const partes = trecho.restante.textContent.match(/ +|[\s\S]/g) || [];
    if (partes.length === 0) {
      trecho.restante.remove();
    }
    partes.forEach(function (texto) {
      pedacos.push({ trecho: trecho, texto: texto });
    });
  });

  let pesoAcumulado = 0;
  pedacos.forEach(function (pedaco) {
    pedaco.pesoAntes = pesoAcumulado;
    pesoAcumulado += pedaco.texto === "\n" ? PESO_QUEBRA_LINHA : 1;
  });
  pedacos.forEach(function (pedaco) {
    pedaco.momento = (pedaco.pesoAntes / pesoAcumulado) * DURACAO_DIGITACAO_MS;
  });

  function revelar(pedaco) {
    const restante = pedaco.trecho.restante;
    pedaco.trecho.digitado.data += pedaco.texto;
    restante.textContent = restante.textContent.slice(pedaco.texto.length);
    if (restante.textContent === "") {
      restante.remove();
    }
    pedaco.trecho.digitado.after(cursor);
  }

  let proximo = 0;
  let inicio = null;

  // Revela tudo o que já deveria ter aparecido até o quadro atual. Assim a
  // animação termina no tempo previsto mesmo que algum quadro atrase.
  function quadro(agora) {
    if (inicio === null) {
      inicio = agora;
    }
    const decorrido = agora - inicio - ATRASO_INICIAL_MS;

    while (proximo < pedacos.length && pedacos[proximo].momento <= decorrido) {
      revelar(pedacos[proximo]);
      proximo++;
    }

    if (proximo < pedacos.length) {
      requestAnimationFrame(quadro);
    } else {
      cursor.classList.add("piscando");
    }
  }

  requestAnimationFrame(quadro);
})();
