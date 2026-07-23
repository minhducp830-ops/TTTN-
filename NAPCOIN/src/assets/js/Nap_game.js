/**
 * Nap_game.js – MYE Platform
 * Handles: filter tabs, pagination dots, search, header active state
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. FILTER TABS (category filtering)
     ============================================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards  = document.querySelectorAll('.game-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      gameCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      // Reset pagination to page 1 whenever filter changes
      setActiveDot(1);
    });
  });

  /* ============================================================
     2. SEARCH BOX – live filter by card name
     ============================================================ */
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

      gameCards.forEach(card => {
        const name     = card.querySelector('.game-card-name')?.textContent.toLowerCase() || '';
        const category = card.dataset.category;
        const matchCat = activeFilter === 'all' || category === activeFilter;
        const matchQ   = query === '' || name.includes(query);

        card.style.display = matchCat && matchQ ? 'flex' : 'none';
      });
    });
  }

  /* ============================================================
     3. PAGINATION DOTS
     ============================================================ */
  const dots = document.querySelectorAll('.dot');
  const CARDS_PER_PAGE = 15; // 5 columns × 3 rows

  function setActiveDot(page) {
    dots.forEach(d => {
      d.classList.toggle('active', parseInt(d.dataset.page) === page);
      d.setAttribute('aria-selected', parseInt(d.dataset.page) === page ? 'true' : 'false');
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const page = parseInt(dot.dataset.page);
      setActiveDot(page);

      /* In a real project this would fetch/render a new page of games.
         For now we just visually update the active dot. */
    });
  });

  /* ============================================================
     4. GAME CARD HOVER – subtle glow pulse (CSS handles the
        main transform; JS adds a ripple effect on click)
     ============================================================ */
  gameCards.forEach(card => {
    card.addEventListener('click', function (e) {
      // If card is an anchor it navigates automatically; otherwise
      // you could open a game detail modal here.
      const ripple = document.createElement('span');
      ripple.classList.add('card-ripple');
      this.querySelector('.game-card-mask')?.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
      `;

      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ============================================================
     5. HEADER SCROLL SHADOW
     ============================================================ */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
      }
    });
  }

});

/* ============================================================
   CSS Ripple injected by JS (avoids extra stylesheet)
   ============================================================ */
const style = document.createElement('style');
style.textContent = `
  .card-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transform: scale(0);
    animation: ripple-anim 0.5s linear;
    pointer-events: none;
    z-index: 9;
  }
  @keyframes ripple-anim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(style);
