// ================= TEMA CLARO / ESCURO =================
(function initTheme() {
  const root = document.documentElement;
  const toggles = document.querySelectorAll('.theme-toggle');
  if (!toggles.length) return;

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('portfolio-theme');
  } catch (_) {
    savedTheme = null;
  }

  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    root.dataset.theme = theme;

    toggles.forEach((toggle) => {
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
      const icon = toggle.querySelector('.theme-icon');
      if (icon) icon.textContent = isDark ? '☾' : '☼';
    });
  };

  applyTheme(savedTheme || preferredTheme);

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try {
        localStorage.setItem('portfolio-theme', nextTheme);
      } catch (_) {
        // O tema continua funcionando mesmo quando o armazenamento está bloqueado.
      }
    });
  });
})();

// ================= MENU HAMBURGUER =================
(function initHamburger() {
  const nav = document.getElementById('hamburguer-nav');
  if (!nav) return;

  const icon = nav.querySelector('.hamburguer-icon');
  const menu = nav.querySelector('.menu-links');
  if (!icon || !menu) return;

  const links = menu.querySelectorAll('a');

  const openMenu = () => {
    menu.classList.add('open');
    icon.classList.add('open');
    icon.setAttribute('aria-expanded', 'true');
    icon.setAttribute('aria-label', 'Fechar menu');
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    icon.classList.remove('open');
    icon.setAttribute('aria-expanded', 'false');
    icon.setAttribute('aria-label', 'Abrir menu');
  };

  icon.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  links.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


// ================= ANIMAÇÃO SCROLL =================
document.addEventListener('DOMContentLoaded', () => {

  const projectsContainer = document.querySelector('#Projects .projects-container');
  if (projectsContainer) {
    const projectOrder = [
      'Skedou',
      'Underlined',
      'Apego',
      'Monitor de Deputados',
      'Witch Game para visionOS',
      'Cocoa Track',
      'DominoMath'
    ];

    const projectCards = Array.from(projectsContainer.querySelectorAll('.project-card'));
    projectOrder.forEach((projectName) => {
      const card = projectCards.find((item) =>
        item.querySelector('h3')?.textContent.trim() === projectName
      );
      if (card) projectsContainer.appendChild(card);
    });
  }

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
