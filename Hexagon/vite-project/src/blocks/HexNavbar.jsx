import React, { useState, useEffect } from 'react';
import { buildBgStyle, FlagVN, FlagEN } from './helpers';
import { LANG_KEY } from '../lib/constants';

const HexNavbar = ({
  logoUrl,
  logoText,
  menuItems = [],
  showLangSwitcher = true,
  background = { type: 'color', color: '#1A6B49' },
  textColor = '#ffffff',
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || 'vi');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLang = (newLang) => {
    localStorage.setItem(LANG_KEY, newLang);
    setLang(newLang);
    // Redirect to correct lang path
    const pathname = window.location.pathname;
    if (newLang === 'en') {
      if (!pathname.startsWith('/en/') && pathname !== '/en') {
        const slug = pathname.replace(/^\//, '') || 'trang-chu';
        window.location.href = `/en/${slug}`;
      }
    } else {
      if (pathname.startsWith('/en/')) {
        const slug = pathname.replace(/^\/en\//, '') || 'trang-chu';
        window.location.href = `/${slug}`;
      }
    }
  };

  const bgStyle = buildBgStyle(background);

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        ...bgStyle,
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.2)' : 'none',
      }}
    >
      <nav
        className="mx-auto py-3 flex justify-between items-center"
        style={{ paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          {logoUrl && (
            <img src={logoUrl} alt="Logo" className="w-14 h-14 object-contain" />
          )}
          {logoText && (
            <span className="text-xl font-bold" style={{ color: textColor }}>
              {logoText}
            </span>
          )}
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, i) => (
            <a
              key={i}
              href={item.url || '#'}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: textColor }}
            >
              {item.label}
            </a>
          ))}
          {showLangSwitcher && (
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => switchLang('vi')}
                style={{ opacity: lang === 'vi' ? 1 : 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                title="Tiếng Việt"
              >
                <FlagVN />
              </button>
              <button
                onClick={() => switchLang('en')}
                style={{ opacity: lang === 'en' ? 1 : 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                title="English"
              >
                <FlagEN />
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: textColor, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-gray-100">
          {menuItems.map((item, i) => (
            <a
              key={i}
              href={item.url || '#'}
              className="block py-3 px-6 text-gray-800 hover:text-[#1A6B49] font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {showLangSwitcher && (
            <div className="flex items-center gap-4 px-6 py-3 border-t border-gray-100">
              <button onClick={() => switchLang('vi')} style={{ opacity: lang === 'vi' ? 1 : 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} title="Tiếng Việt"><FlagVN /></button>
              <button onClick={() => switchLang('en')} style={{ opacity: lang === 'en' ? 1 : 0.4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} title="English"><FlagEN /></button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default HexNavbar;
