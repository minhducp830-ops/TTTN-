import React from 'react';
import { buildBgStyle } from './helpers';

const HexNews = ({
  title = 'Tin tức',
  subtitle = 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.',
  items = [],
  readMoreLabel = 'Xem chi tiết',
  viewAllLabel = 'Xem tất cả bài viết',
  viewAllUrl = '/vi/bai-viet',
  background = { type: 'color', color: '#ffffff' },
  sectionId = 'tin-tuc',
  animate = 'true',
}) => {
  const bgStyle = buildBgStyle(background);

  return (
    <section id={sectionId} className="py-10 md:py-16" style={bgStyle}>
      <div className="container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-700 mt-2 text-sm sm:text-base leading-relaxed px-4">
              {subtitle}
            </p>
          )}
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Custom News Grid matching the demo layout */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
            {items.map((item, i) => {
              // Row 1: First 2 items span 3/6 columns (50% each on large screens)
              // Row 2: Subsequent items span 2/6 columns (33% each on large screens)
              const colSpan = i < 2 ? 'lg:col-span-3' : 'lg:col-span-2';

              return (
                <a
                  key={i}
                  href={item.url || '#'}
                  className={`${colSpan} group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-yellow-400/50`}
                  style={{
                    animation: (animate === true || animate === 'true') ? `fadeInUp 0.6s ${i * 0.1}s ease both` : 'none',
                  }}
                >
                  {/* Cover Image */}
                  {item.imageUrl ? (
                    <div className="overflow-hidden h-48 sm:h-52">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : (
                    <div className="h-48 sm:h-52 bg-gradient-to-br from-gray-100 to-slate-200 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M8 10a2 2 0 100-4 2 2 0 000 4z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                      {item.excerpt}
                    </p>

                    {/* Footer Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {item.date && (
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3 text-yellow-500 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {item.date}
                          </span>
                        )}
                      </div>
                      <span className="text-yellow-600 text-xs font-semibold group-hover:underline">
                        {readMoreLabel} →
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
        )}

        {/* View All Button at bottom */}
        {items.length > 0 && viewAllLabel && (
          <div className="text-center mt-10">
            <a
              href={viewAllUrl}
              className="inline-flex items-center gap-2 px-8 py-3 text-white font-bold rounded-lg bg-gradient-to-r from-[#008374] to-[#89BA16] hover:from-[#007164] hover:to-[#78A614] hover:ring-2 hover:ring-green-500 transition-all duration-200"
            >
              {viewAllLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
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

export default HexNews;
