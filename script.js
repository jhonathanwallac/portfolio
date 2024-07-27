document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = navLinks.querySelectorAll('a'); // Seleciona todos os links dentro do menu

  menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
  });

  // Adiciona um event listener a cada link para fechar o menu ao clicar
  links.forEach(function(link) {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
});
