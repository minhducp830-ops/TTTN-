import React, { useState } from 'react';
import { buildBgStyle } from './helpers';

const HOVER_IMG = 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png';

// ServiceCard y chang live site
const ServiceCard = ({ href, title, description, image, heightClass = 'h-[400px]' }) => (
  <a
    href={href || '#'}
    className={`group relative block w-full ${heightClass} rounded-xl overflow-hidden cursor-pointer shadow-lg transition-transform duration-300 hover:-translate-y-2`}
  >
    {/* Background image */}
    {image ? (
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f5c38] to-[#1A6B49]" />
    )}

    {/* Hover overlay image */}
    <img
      src={HOVER_IMG}
      alt=""
      aria-hidden="true"
      loading="eager"
      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
      style={{ willChange: 'opacity' }}
    />

    {/* Content overlay */}
    <div className="absolute inset-0 p-6 flex flex-col justify-start">
      <div>
        <h3 className="text-xl font-bold text-yellow-400 mb-0 group-hover:mb-3 transition-all duration-300">
          {title}
        </h3>
        <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
          <p className="text-gray-200 text-sm mb-4 line-clamp-3">{description}</p>
          <span className="inline-block text-blue-400 font-bold text-sm">Xem chi tiết →</span>
        </div>
      </div>
    </div>
  </a>
);

// Card trái — nền trắng/be, hiển thị nội dung item đang active
const ServiceCardActive = ({ title, description, href, accentColor = '#1A6B49' }) => (
  <a
    href={href || '#'}
    className="group relative block w-full h-[400px] rounded-xl overflow-hidden cursor-pointer shadow-lg transition-transform duration-300 hover:-translate-y-2 bg-amber-50"
  >
    <div className="absolute inset-0 p-6 flex flex-col justify-start">
      <h3 className="text-xl font-bold mb-3" style={{ color: accentColor }}>{title}</h3>
      <p className="text-black text-sm leading-relaxed line-clamp-5">{description}</p>
      <span className="inline-block mt-4 font-bold text-sm" style={{ color: accentColor }}>
        Xem chi tiết →
      </span>
    </div>
  </a>
);

const HexServices = ({
  title = 'Lĩnh vực hoạt động',
  subtitle = 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:',
  items = [],
  sectionId = 'dich-vu',
  background = { type: 'color', color: '#f8fafc' },
  accentColor = '#1A6B49',
  animate = true,
}) => {
  const bgStyle = buildBgStyle(background);

  return (
    <section
      id={sectionId}
      className="py-8"
      style={bgStyle}
    >
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">{title}</h2>
          <p className="text-gray-700 mt-2 text-sm sm:text-base leading-relaxed px-4">{subtitle}</p>
        </div>

        {/* Grid: 4 card ảnh đều nhau */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {items.map((item, index) => (
              <ServiceCard
                key={index}
                href={item.url || '#'}
                title={item.name}
                description={item.description}
                image={item.imageUrl}
                heightClass="h-[400px]"
              />
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

export default HexServices;
