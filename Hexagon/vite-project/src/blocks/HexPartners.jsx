import React from 'react';
import { buildBgStyle } from './helpers';

const ECOBOOK_SVG = (
  <div className="flex flex-col items-center justify-center">
    <svg viewBox="0 0 80 40" width="80" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
      <path d="M 15 25 C 25 15, 38 15, 40 20 C 42 15, 55 15, 65 25 C 55 18, 42 18, 40 23 C 38 18, 25 18, 15 25 Z" fill="#22c55e"></path>
      <path d="M 18 18 C 26 10, 38 10, 40 15 C 42 10, 54 10, 62 18 C 54 12, 42 12, 40 17 C 38 12, 26 12, 18 18 Z" fill="#eab308"></path>
      <path d="M 22 11 C 28 5, 38 5, 40 10 C 42 5, 52 5, 58 11 C 52 7, 42 7, 40 12 C 38 7, 28 7, 22 11 Z" fill="#22c55e"></path>
    </svg>
    <div className="text-[11px] font-extrabold tracking-wider text-green-700">ECOBOOK</div>
  </div>
);

const COMOON_SVG = (
  <div className="flex flex-col items-center justify-center">
    <svg viewBox="0 0 80 40" width="80" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
      <path d="M 20 12 C 30 5, 50 5, 60 12 C 55 18, 45 18, 40 18 C 35 18, 25 18, 20 12 Z" fill="#15803d"></path>
      <path d="M 22 17 C 30 11, 50 11, 58 17 C 53 23, 47 23, 40 23 C 33 23, 27 23, 22 17 Z" fill="#eab308"></path>
      <path d="M 25 22 C 32 17, 48 17, 55 22 C 50 30, 45 32, 40 32 C 35 32, 30 30, 25 22 Z" fill="#15803d"></path>
    </svg>
    <div className="text-[11px] font-extrabold tracking-wider text-green-700">COMOON</div>
  </div>
);

const HexPartners = ({
  title = 'Các đối tác liên kết',
  logos = [
    { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi E.png', alt: 'Khối E' },
    { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi C.png', alt: 'Khối C' },
    { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi D.png', alt: 'Khối D' },
    { imageUrl: 'https://webdemo.hexagon.xyz/medias/Happy Food.png', alt: 'Happy Food' },
    { isSvg: true, svgType: 'ecobook', alt: 'ECOBOOK' },
    { isSvg: true, svgType: 'comoon', alt: 'COMOON' },
    { imageUrl: 'https://webdemo.hexagon.xyz/medias/B.png', alt: 'Binh Minh' },
    { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi F.png', alt: 'Khối F' },
  ],
  background = { type: 'gradient', from: '#0f826b', to: '#86efac', direction: 'to bottom' },
  animate = 'true',
}) => {
  const bgStyle = buildBgStyle(background);
  const doubledLogos = [...logos, ...logos];

  return (
    <div style={{ ...bgStyle, padding: '36px 0', overflow: 'hidden', position: 'relative', zIndex: 10 }} className="sponsor-bar">
      <div className="container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8 text-center">{title}</h2>
        )}
      </div>
      <div className="relative w-full overflow-hidden flex logo-marquee" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div
          className="flex gap-6 marquee-track"
          style={{
            width: 'max-content',
            animation: (animate === true || animate === 'true') ? 'marquee 24s linear infinite' : 'none',
          }}
          onMouseEnter={(e) => { if (animate === true || animate === 'true') e.currentTarget.style.animationPlayState = 'paused'; }}
          onMouseLeave={(e) => { if (animate === true || animate === 'true') e.currentTarget.style.animationPlayState = 'running'; }}
        >
          {doubledLogos.map((logo, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl flex items-center justify-center p-4 hover:-translate-y-1 transition-transform logo-card"
              style={{ width: 180, height: 108, flexShrink: 0, boxShadow: '0 4px 12px rgba(10,37,64,0.06)' }}
            >
              {logo.isSvg ? (
                logo.svgType === 'ecobook' ? ECOBOOK_SVG : COMOON_SVG
              ) : (
                <img
                  src={logo.imageUrl}
                  alt={logo.alt}
                  style={{ maxHeight: 64, maxWidth: 140, objectFit: 'contain' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default HexPartners;
