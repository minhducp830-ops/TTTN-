import React, { useState } from 'react';

const SidebarSlider = ({ services, title = "Dịch vụ của chúng tôi", seeAllText = "Xem tất cả dịch vụ >", seeAllUrl = "/#dich-vu" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!services || services.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };
  
  const currentService = services[currentIndex];
  
  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#3f3f46] overflow-hidden shadow-xl mt-4">
      <div className="bg-[#0f5c38] text-white font-bold text-center py-4 px-4 text-sm tracking-wider uppercase">
        {title}
      </div>
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={currentService.imageUrl} 
          alt={currentService.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          onError={(e) => { e.target.src = 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg' }}
        />
        {/* Navigation arrows */}
        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 text-white rounded-full hover:bg-black/90 transition-colors z-10" aria-label="Previous service">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 text-white rounded-full hover:bg-black/90 transition-colors z-10" aria-label="Next service">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
      <div className="p-6 bg-[#1a1a1a]">
        <h3 className="text-lg font-bold text-white mb-2">{currentService.title}</h3>
        <p className="text-gray-400 text-xs mb-4 line-clamp-3 leading-relaxed">{currentService.description}</p>
        <a href={currentService.url} className="text-[#f59e0b] font-medium hover:text-[#d97706] transition-colors text-xs">Tìm hiểu thêm &gt;</a>
        
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {services.map((_, idx) => (
             <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-[#f59e0b]' : 'bg-[#3f3f46] hover:bg-gray-500'}`}
                aria-label={`Go to slide ${idx + 1}`}
             />
          ))}
        </div>
      </div>
      <div className="border-t border-[#3f3f46] p-3 text-center bg-[#1a1a1a] hover:bg-[#262626] transition-colors">
        <a href={seeAllUrl} className="text-[#f59e0b] font-medium hover:text-[#d97706] transition-colors text-xs w-full block">{seeAllText}</a>
      </div>
    </div>
  );
};

export default SidebarSlider;
