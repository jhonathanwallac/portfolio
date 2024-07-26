// script.js

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
  });
});

