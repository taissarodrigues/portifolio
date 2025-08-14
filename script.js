// script.js
(function initHamburger() {
  const run = () => {
    const nav  = document.getElementById('hamburguer-nav');
    if (!nav) return;

    const icon = nav.querySelector('.hamburguer-icon');
    const menu = nav.querySelector('.menu-links');
    if (!icon || !menu) return;

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

    const toggleMenu = () => {
      menu.classList.contains('open') ? closeMenu() : openMenu();
    };

    // abre/fecha pelo botão
    icon.addEventListener('click', toggleMenu);

    // fecha ao clicar em qualquer link
    links.forEach(a => a.addEventListener('click', closeMenu));

    // fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });

    // fecha ao clicar fora do menu
    document.addEventListener('click', (e) => {
      const clickedOutside = !menu.contains(e.target) && !icon.contains(e.target);
      if (menu.classList.contains('open') && clickedOutside) closeMenu();
    });

    // ao voltar para desktop, fecha
    const mql = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => { if (mql.matches) closeMenu(); };
    mql.addEventListener ? mql.addEventListener('change', handleResize)
                         : mql.addListener(handleResize);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
