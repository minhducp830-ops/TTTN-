import React from 'react';
import { buildBgStyle } from './helpers';

const HexBanner = ({
  title = 'Sẵn sàng bứt phá cùng Hexagon?',
  subtitle = 'Liên hệ ngay hôm nay để nhận tư vấn miễn phí từ đội ngũ chuyên gia.',
  buttons = [],
  background = { type: 'gradient', from: '#1A6B49', to: '#41b67d', direction: 'to right' },
  textColor = '#ffffff',
  animate = 'true',
}) => {
  const bgStyle = buildBgStyle(background);

  const getButtonClass = (style) => {
    const base = 'inline-block px-10 py-4 rounded-full font-bold text-base transition-all shadow-lg text-center';
    if (style === 'outline') {
      return `${base} border-2 border-white text-white hover:bg-white hover:text-[#1A6B49]`;
    }
    return `${base} bg-yellow-400 text-gray-900 hover:bg-yellow-300`; // Primary
  };

  return (
    <section
      className="py-20 text-center"
      style={bgStyle}
    >
      <div
        className="container max-w-[900px] mx-auto px-4"
        style={{ animation: (animate === true || animate === 'true') ? 'fadeInUp 0.7s ease both' : 'none' }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: textColor }}>{title}</h2>
        {subtitle && <p className="text-lg mb-8 opacity-90" style={{ color: textColor }}>{subtitle}</p>}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {buttons.map((btn, index) => (
              <a
                key={index}
                href={btn.url || '#'}
                className={getButtonClass(btn.style)}
              >
                {btn.text || 'Nút'}
              </a>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HexBanner;
