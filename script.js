const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const mobileQuery = window.matchMedia('(max-width: 680px)');

if (menuToggle && nav) {
  const closeMenu = ({ returnFocus = false } = {}) => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    if (returnFocus) menuToggle.focus();
  };

  const openMenu = () => {
    nav.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    const firstLink = nav.querySelector('a');
    if (firstLink) firstLink.focus();
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu({ returnFocus: true });
    }
  });

  document.addEventListener('click', event => {
    if (
      mobileQuery.matches &&
      nav.classList.contains('open') &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  mobileQuery.addEventListener('change', event => {
    if (!event.matches) closeMenu();
  });
}
