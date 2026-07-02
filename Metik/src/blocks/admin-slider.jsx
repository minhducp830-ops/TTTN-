import React, { useState, useEffect } from 'react';

const AdminSlider = ({ slides = [], autoPlayInterval = 4 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (slides.length <= 1 || autoPlayInterval <= 0) return;
    
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval * 1000);
    
    return () => clearInterval(intervalId);
  }, [slides.length, autoPlayInterval]);

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-200 border-2 border-dashed border-gray-400">
        <p className="text-gray-500 font-bold">Chưa có ảnh trong Slider</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden group bg-gray-100">
      {/* Slider Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="w-full flex-shrink-0 relative">
            <a href={slide.url || '#'} className={slide.url ? 'cursor-pointer' : 'cursor-default pointer-events-none'}>
              <img 
                src={slide.imageUrl} 
                alt={slide.altText || `Slide ${idx + 1}`} 
                className="w-full h-auto object-cover md:min-h-[400px] lg:min-h-[500px]" 
              />
            </a>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      {slides.length > 1 && (
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-40 hover:bg-opacity-80 transition shadow text-white hover:text-[#f4851a] z-10 opacity-0 group-hover:opacity-100"
          aria-label="Trang trước"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next Button */}
      {slides.length > 1 && (
        <button 
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-40 hover:bg-opacity-80 transition shadow text-white hover:text-[#f4851a] z-10 opacity-0 group-hover:opacity-100"
          aria-label="Trang sau"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-[#f4851a] scale-125' : 'bg-white bg-opacity-60 hover:bg-opacity-100'}`}
              aria-label={`Chuyển đến slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSlider;
