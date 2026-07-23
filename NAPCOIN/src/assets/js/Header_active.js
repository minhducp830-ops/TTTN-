/**
 * Header_active.js
 * Highlights the active nav link based on the current page filename.
 */
(function () {
  const page = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase();

  const map = {
    'trang_chu': 'nav-trang-chu',
    'tro_choi':  'nav-tro-choi',
    'nap_game':  'nav-nap-game',
    'tin_tuc':   'nav-tin-tuc',
    'ho_tro':    'nav-ho-tro',
  };

  const activeId = map[page];
  if (activeId) {
    // Remove nav-active class from all nav items first
    document.querySelectorAll('.nav-link-item').forEach(el => {
      el.classList.remove('nav-active');
      // Reset Nap Game orange if not active
      if (el.id === 'nav-nap-game' && page !== 'nap_game') {
        el.style.color = '#093A88';
        el.style.fontWeight = '400';
      }
    });

    const activeEl = document.getElementById(activeId);
    if (activeEl) {
      activeEl.classList.add('nav-active');
    }
  }
})();
