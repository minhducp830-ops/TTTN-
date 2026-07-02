import React, { useState, useEffect } from 'react';

const AdminFooter = ({ 
  bgColor = "#fcc61a", 
  bottomBgColor = "#f4851a",
  logoUrl = "https://metik.vn/wp-content/uploads/2026/06/logometik.png",
  description = "METIK - một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.",
  contactTitle = "THÔNG TIN LIÊN HỆ",
  contactItems = [],
  copyrightText = "Copyright 2026 © METIK. All rights reserved"
}) => {
  // State để quản lý việc hiển thị nút cuộn lên đầu trang
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Lắng nghe sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hàm cuộn lên đầu trang mượt mà
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper để render Icon dựa trên iconType
  const renderIcon = (type) => {
    const iconClass = "w-6 h-6 text-gray-800 flex-shrink-0 mt-0.5";
    switch(type) {
      case 'phone':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'email':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'location':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <div className="w-6 h-6 bg-gray-800 rounded-full flex-shrink-0 mt-0.5"></div>
        );
    }
  };

  return (
    <footer className="w-full relative">
      
      {/* Khu vực Thông tin (Nền Vàng) */}
      <div style={{ backgroundColor: bgColor }} className="py-12 md:py-16">
        <div className="max-w-[1250px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          
          {/* Cột Trái (Giới thiệu) */}
          <div>
            {logoUrl && (
              <img src={logoUrl} alt="Logo METIK" className="w-[180px] md:w-[220px] mb-8" />
            )}
            <div 
              className="text-gray-800 text-[17px] md:text-lg leading-loose"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Cột Phải (Liên hệ) */}
          <div>
            {contactTitle && (
              <div className="border-b border-gray-400/30 pb-3 mb-8 max-w-sm">
                <h3 className="text-xl md:text-2xl font-bold text-[#48a842] uppercase tracking-wide m-0">
                  {contactTitle}
                </h3>
              </div>
            )}
            
            <div className="flex flex-col gap-6">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  {renderIcon(item.iconType)}
                  {item.url ? (
                    <a href={item.url} className="text-gray-800 text-[17px] hover:text-[#48a842] transition-colors leading-relaxed">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-800 text-[17px] leading-relaxed">
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {contactItems.length === 0 && (
              <div className="text-gray-600 italic">Chưa có thông tin liên hệ.</div>
            )}
          </div>

        </div>
      </div>

      {/* Khu vực Bản quyền (Dải nền Cam) */}
      <div style={{ backgroundColor: bottomBgColor }} className="py-4 px-4 text-center">
        <p className="text-white/90 text-[15px] m-0 font-medium">
          {copyrightText}
        </p>
      </div>

      {/* Nút Cuộn lên đầu trang (Floating Scroll to Top) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-transparent border-[3px] border-[#f4851a] hover:bg-[#f4851a] text-[#f4851a] hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 group"
          aria-label="Cuộn lên đầu trang"
        >
          <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

    </footer>
  );
};

export default AdminFooter;
