function typeWriterDOM(sourceEl, targetEl, speed = 14) {
  function cloneEmpty(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode('');
    }
    const clone = node.cloneNode(false); // mantém a tag e as classes, sem os filhos
    node.childNodes.forEach((child) => clone.appendChild(cloneEmpty(child)));
    return clone;
  }

  const target = cloneEmpty(sourceEl);
  while (target.firstChild) {
    targetEl.appendChild(target.firstChild);
  }

  function collectTextPairs(orig, targ, list = []) {
    const origChildren = orig.childNodes;
    const targChildren = targ.childNodes;
    for (let i = 0; i < origChildren.length; i++) {
      const o = origChildren[i];
      const t = targChildren[i];
      if (o.nodeType === Node.TEXT_NODE) {
        list.push([o, t]);
      } else {
        collectTextPairs(o, t, list);
      }
    }
    return list;
  }

  const pairs = collectTextPairs(sourceEl, targetEl);
  let pairIndex = 0;
  let charIndex = 0;

  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor-caret';
  cursor.textContent = '▌';
  cursor.setAttribute('aria-hidden', 'true');

  function placeCursorAfter(node) {
    node.parentNode.insertBefore(cursor, node.nextSibling);
  }

  if (pairs.length > 0) {
    placeCursorAfter(pairs[0][1]);
  }

  function tick() {
    if (pairIndex >= pairs.length) {
      return;
    }

    const [origNode, targNode] = pairs[pairIndex];
    const fullText = origNode.textContent;

    charIndex++;
    targNode.textContent = fullText.slice(0, charIndex);
    placeCursorAfter(targNode);

    if (charIndex >= fullText.length) {
      pairIndex++;
      charIndex = 0;
      if (pairIndex < pairs.length) {
        placeCursorAfter(pairs[pairIndex][1]);
      }
    }

    const delay = fullText[charIndex - 1] === '\n' ? speed * 6 : speed;
    setTimeout(tick, delay);
  }

  tick();
}

document.addEventListener('DOMContentLoaded', () => {
  const original = document.querySelector('.codigo-original');
  const typing = document.querySelector('.codigo-typing');
  if (original && typing) {
    typeWriterDOM(original, typing, 14);
  }
});