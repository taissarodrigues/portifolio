// ================= MENU HAMBURGUER =================
(function initHamburger() {
  const nav = document.getElementById('hamburguer-nav');
  if (!nav) return;

  const icon = nav.querySelector('.hamburguer-icon');
  const menu = nav.querySelector('.menu-links');
  const links = menu.querySelectorAll('a');

  const openMenu = () => {
    menu.classList.add('open');
    icon.classList.add('open');
    icon.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    icon.classList.remove('open');
    icon.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  icon.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  links.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


// ================= ANIMAÇÃO SCROLL =================
document.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => observer.observe(card));

});