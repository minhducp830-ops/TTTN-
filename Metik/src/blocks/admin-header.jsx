import React, { useState, useEffect } from 'react';
import { SocialIcon, getSocialBgColor } from '../components/SocialIcons';

const AdminHeader = ({ logoUrl, menuItems = [], socialLinks = [], activeMenuIndex = -1 }) => {
  // State quản lý cuộn trang để thu nhỏ header
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tự động phát hiện URL hiện tại để tô sáng menu
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <header className={`w-full bg-white z-50 sticky top-0 transition-all duration-300 ${isScrolled ? 'shadow-md py-0' : 'shadow-sm py-2'}`}>
      <div className={`max-w-[1250px] mx-auto px-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-[70px]' : 'h-[100px]'}`}>
        {/* Logo */}
        <a href="/" className="flex-shrink-0 cursor-pointer">
          <img src={logoUrl} alt="METIK Logo" className={`object-contain transition-all duration-300 ${isScrolled ? 'h-[50px] md:h-[60px]' : 'h-[70px] md:h-[90px]'}`} />
        </a>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-gray-700">
          {menuItems && menuItems.map((item, idx) => {
            // Tự phát hiện active: so sánh URL menu với URL hiện tại
            const isActive = activeMenuIndex >= 0 
              ? idx === activeMenuIndex 
              : (item.url === '/' ? currentPath === '/' : currentPath.startsWith(item.url));
            return (
              <a 
                key={idx} 
                href={item.url} 
                className={`relative uppercase tracking-wide transition-colors py-2 group text-[15px] ${isActive ? 'text-[#f4851a]' : 'hover:text-[#f4851a]'}`}
              >
                {item.label}
                <span className={`absolute left-0 bottom-0 w-full h-[3px] bg-[#f4851a] origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </a>
            );
          })}
        </nav>

        {/* Social Icons */}
        <div className="hidden md:flex items-center gap-3">
          {socialLinks && socialLinks.map((social, idx) => (
            <div key={idx} className="relative group flex items-center justify-center">
              <a 
                href={social.url} 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${getSocialBgColor(social.platform)}`}
              >
                <SocialIcon platform={social.platform} />
              </a>
              {/* Tooltip */}
              <div className="absolute top-full mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 whitespace-nowrap bg-black text-white text-[13px] px-3 py-1.5 rounded-md shadow-lg font-medium">
                {social.tooltip}
                {/* Triangle */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-black"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
