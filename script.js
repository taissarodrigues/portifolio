// --- Lógica do Menu Hambúrguer (sem alterações) ---
(function initHamburger() {
  const run = () => {
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
      document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
      menu.classList.remove('open');
      icon.classList.remove('open');
      icon.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const toggleMenu = () => menu.classList.contains('open') ? closeMenu() : openMenu();
    icon.addEventListener('click', toggleMenu);
    links.forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });
    document.addEventListener('click', (e) => {
      const clickedOutside = !menu.contains(e.target) && !icon.contains(e.target);
      if (menu.classList.contains('open') && clickedOutside) closeMenu();
    });
    const mql = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => { if (mql.matches) closeMenu(); };
    mql.addEventListener ? mql.addEventListener('change', handleResize) : mql.addListener(handleResize);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

// --- Lógica ATUALIZADA para Animação de Scroll e Botão "Ver Mais" ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de Animação ao Rolar (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para a observação após animar
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do elemento está visível
    });

    // Observa todos os project-cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));

    // --- Lógica do Botão "Ver Todos os Projetos" ---
    const showMoreBtn = document.getElementById('show-more-btn');
    const moreProjectsContainer = document.getElementById('more-projects');

    if (showMoreBtn && moreProjectsContainer) {
        showMoreBtn.addEventListener('click', () => {
            // 1. Mostra o container dos projetos escondidos
            moreProjectsContainer.classList.remove('hidden');
            
            // 2. Pega os novos cards que acabaram de ser revelados
            const newCards = moreProjectsContainer.querySelectorAll('.project-card');
            
            // 3. Pede ao observer para começar a observar esses novos cards
            newCards.forEach(card => observer.observe(card));

            // 4. Esconde o botão
            showMoreBtn.style.display = 'none';
        });
    }
});