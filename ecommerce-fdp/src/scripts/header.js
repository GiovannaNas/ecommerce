document.addEventListener('DOMContentLoaded', function () {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = header.parentElement;
      parent.classList.toggle('active');
    });
  });

  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('show');
  });
});
