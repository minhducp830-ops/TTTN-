import React from 'react';
import { buildBgStyle } from './helpers';

const HexAbout = ({
  imageUrl = 'https://beta.hexagon.xyz/assets/images/VPX16.jpg',
  quoteText = '"Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"',
  quoteAuthor = 'Hexagon Culture',
  title = 'Về Hexagon',
  description = 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số.',
  cards = [
    { title: 'Sứ mệnh', content: 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.' },
    { title: 'Tầm nhìn', content: 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.' },
    { title: 'Giá trị cốt lõi', content: 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.' },
    { title: 'Nền tảng', content: 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.' },
  ],
  background = { type: 'color', color: '#ffffff' },
  accentColor = '#1D6A49',
  sectionId = 'gioi-thieu',
  animate = true,
}) => {
  const bgStyle = buildBgStyle(background);

  return (
    <section id={sectionId} className="py-16 lg:py-24" style={bgStyle}>
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image col */}
          <div className="w-full h-full flex items-center justify-center order-2 md:order-1 relative">
            <div className="relative p-3 w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl transform rotate-2"></div>
              <img
                src={imageUrl}
                alt="About Hexagon"
                className="relative rounded-lg shadow-2xl object-cover max-h-[500px] w-full"
              />
            </div>
            {quoteText && (
              <div className="absolute -bottom-4 right-4 md:bottom-8 md:-right-8 bg-white p-5 rounded-xl shadow-[0_10px_40px_rgba(217,119,6,0.3)] max-w-[280px] z-10 transition-transform hover:-translate-y-2 duration-300">
                <p className="text-sm italic text-gray-900 font-medium leading-relaxed">{quoteText}</p>
                {quoteAuthor && <p className="text-yellow-500 text-xs mt-2 font-bold uppercase tracking-wider text-right">— {quoteAuthor}</p>}
              </div>
            )}
          </div>

          {/* Text col */}
          <div className="text-left order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{title}</h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">{description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              {cards.map((card, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-base sm:text-lg mb-2" style={{ color: accentColor }}>{card.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{card.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HexAbout;
