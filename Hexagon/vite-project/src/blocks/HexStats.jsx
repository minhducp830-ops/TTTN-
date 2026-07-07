import React from 'react';
import { buildBgStyle } from './helpers';

const HexStats = ({
  items = [
    { number: '50+', label: 'Dự án hoàn thành', icon: '🚀' },
    { number: '30+', label: 'Đối tác tin cậy', icon: '🤝' },
    { number: '5+', label: 'Năm kinh nghiệm', icon: '📅' },
    { number: '99%', label: 'Khách hàng hài lòng', icon: '⭐' },
  ],
  background = { type: 'gradient', from: '#1A6B49', to: '#41b67d', direction: 'to right' },
  textColor = '#ffffff',
  animate = 'true',
}) => {
  const bgStyle = buildBgStyle(background);

  return (
    <section className="py-16" style={bgStyle}>
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="text-center"
              style={{ animation: (animate === true || animate === 'true') ? `fadeInUp 0.6s ${i * 0.15}s ease both` : 'none' }}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-4xl sm:text-5xl font-black mb-2" style={{ color: textColor }}>{item.number}</div>
              <div className="text-sm font-medium opacity-80" style={{ color: textColor }}>{item.label}</div>
            </div>
          ))}
        </div>
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

export default HexStats;
