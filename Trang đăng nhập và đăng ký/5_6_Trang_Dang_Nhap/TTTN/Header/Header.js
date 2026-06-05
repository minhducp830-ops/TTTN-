// ===== HEADER DATA & LOGIC =====

const LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
  <defs>
    <linearGradient id="mye-leaf-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#99CC00" />
      <stop offset="50%" stop-color="#12B31C" />
      <stop offset="100%" stop-color="#063F93" />
    </linearGradient>
  </defs>
  <text x="12" y="54" font-family="'Fredoka', 'Comfortaa', 'Outfit', 'Inter', sans-serif" font-size="46" font-weight="700" font-style="italic" fill="#063F93" letter-spacing="-2">my</text>
  <g transform="translate(106, 12) skewX(-15)">
    <rect x="0" y="0" width="55" height="13" rx="5.5" fill="#12B31C" />
    <rect x="0" y="18" width="52" height="13" rx="5.5" fill="#FF9900" />
    <rect x="0" y="36" width="48" height="13" rx="5.5" fill="#0548A1" />
  </g>
  <path d="M 68,61 C 95,50 135,50 168,36 C 145,52 105,59 68,61 Z" fill="url(#mye-leaf-grad)" />
</svg>
`;

const headerData = {
  logo: { href: "../index.html" },
  navLinks: [
    { id: "nav-home",     label: "Trang Chủ", href: "#" },
    { id: "nav-games",    label: "Trò Chơi",  href: "#" },
    { id: "nav-recharge", label: "Nạp Game",  href: "#" },
    { id: "nav-news",     label: "Tin Tức",   href: "#" },
    { id: "nav-support",  label: "Hỗ Trợ",   href: "#" },
  ],
  action: {
    id:    "btn-header-login",
    label: "ĐĂNG NHẬP",
    href:  "../Dang_nhap/Dang_nhap.html",
  },
};

function renderHeader() {
  const { logo, navLinks, action } = headerData;

  const navLinksHTML = navLinks
    .map(link => `<a id="${link.id}" href="${link.href}" class="nav-link">${link.label}</a>`)
    .join("");

  const headerHTML = `
    <header id="site-header">
      <div class="header-inner">
        <a href="${logo.href}" class="header-logo" aria-label="myE Home">
          ${LOGO_SVG}
        </a>
        <nav class="header-nav">
          ${navLinksHTML}
        </nav>
        <div class="header-actions">
          <a id="${action.id}" href="${action.href}" class="btn-header-login">
            ${action.label}
          </a>
        </div>
        <button id="menu-toggle-btn" class="menu-toggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <div id="mobile-menu" class="mobile-menu">
      ${navLinksHTML}
      <div class="mobile-menu-actions">
        <a href="${action.href}" class="btn-header-login">${action.label}</a>
      </div>
    </div>`;

  const container = document.getElementById("header-container");
  if (container) container.innerHTML = headerHTML;
  else document.body.insertAdjacentHTML("afterbegin", headerHTML);

  initHeaderBehavior();
}

function initHeaderBehavior() {
  const header     = document.getElementById("site-header");
  const menuBtn    = document.getElementById("menu-toggle-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  menuBtn?.addEventListener("click", () => {
    const open = menuBtn.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
  });

  const currentPath = window.location.pathname;
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href && href !== "#" && currentPath.includes(href.replace("../", "").split("/")[0])) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      menuBtn?.classList.remove("open");
      mobileMenu?.classList.remove("open");
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderHeader);
} else {
  renderHeader();
}
