// ===== FOOTER DATA & LOGIC =====

const LOGO_SVG_FOOTER = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
  <defs>
    <linearGradient id="mye-leaf-grad-footer" x1="0%" y1="0%" x2="100%" y2="0%">
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
  <path d="M 68,61 C 95,50 135,50 168,36 C 145,52 105,59 68,61 Z" fill="url(#mye-leaf-grad-footer)" />
</svg>
`;

const footerData = {
  brand: { href: "../index.html" },
  info: [
    { text: "Email: hotro@mye.vn" },
    { text: "Hotline: 0902 500 198" },
    { text: "CÔNG TY CỔ PHẦN MYE", bold: true },
    { text: "Chịu trách nhiệm quản lí nội dung: Ông Lâm Trung Hiệp" },
    { text: "Địa chỉ: 477/22 Âu Cơ, Phường Phú Trung, Quận Tân Phú, Thành phố Hồ Chí Minh, Việt Nam" },
    { text: "Giấy phép G1 số: Số 297/GP-BTTTT. Ngày cấp 14/07/2020, Nơi cấp Bộ Thông Tin và Truyền Thông" },
  ],
};

function renderFooter() {
  const { brand, info } = footerData;

  const infoHTML = info
    .map(item => item.bold
      ? `<p class="footer-info-line footer-info-bold">${item.text}</p>`
      : `<p class="footer-info-line">${item.text}</p>`)
    .join("");

  const footerHTML = `
    <footer id="site-footer">
      <div class="footer-inner">
        <a href="${brand.href}" class="footer-logo" aria-label="myE Home">
          ${LOGO_SVG_FOOTER}
        </a>
        <div class="footer-info">
          ${infoHTML}
        </div>
      </div>
    </footer>`;

  const container = document.getElementById("footer-container");
  if (container) container.innerHTML = footerHTML;
  else document.body.insertAdjacentHTML("beforeend", footerHTML);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderFooter);
} else {
  renderFooter();
}
