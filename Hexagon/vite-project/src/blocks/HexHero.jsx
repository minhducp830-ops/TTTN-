import React, { useEffect, useState, useRef } from 'react';
import { buildBgStyle } from './helpers';

// Component hiệu ứng đánh chữ (Typewriter) y chang live site
const Typewriter = ({
  words = [],
  speed = 80,
  eraseSpeed = 45,
  delay = 1500,
  animate = true,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [mode, setMode] = useState('type'); // 'type' | 'pause' | 'erase'

  useEffect(() => {
    if (words.length === 0) return;

    const activeWord = words[currentWordIndex % words.length];

    if (mode === 'type') {
      if (currentText.length < activeWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(activeWord.slice(0, currentText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setMode('pause');
        }, delay);
        return () => clearTimeout(timeout);
      }
    } else if (mode === 'pause') {
      const timeout = setTimeout(() => {
        setMode('erase');
      }, delay);
      return () => clearTimeout(timeout);
    } else if (mode === 'erase') {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, eraseSpeed);
        return () => clearTimeout(timeout);
      } else {
        setCurrentWordIndex((prev) => prev + 1);
        setMode('type');
      }
    }
  }, [currentText, mode, currentWordIndex, words, speed, eraseSpeed, delay]);

  if (words.length === 0) return null;

  return (
    <span>
      {currentText}
      {animate && (
        <span
          aria-hidden="true"
          className="inline-block w-[3px] h-[0.85em] ml-1 bg-current align-middle animate-pulse"
        ></span>
      )}
    </span>
  );
};

const HexHero = ({
  tagline = 'Công nghệ tương lai',
  title = 'HEXAGON Solutions',
  subtitle = 'Hexagon kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm, AI đến an ninh mạng, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
  buttons = [
    { text: 'Khám phá Dịch vụ', url: '#dich-vu', style: 'primary' },
    { text: 'Liên hệ Tư vấn', url: '#lien-he', style: 'secondary' },
  ],
  imageUrl = '/globalmyc.webp',
  background = { type: 'gradient', from: '#135237', to: '#41b67d', direction: 'to bottom right' },
  scrollLabel = 'Cuộn xuống để khám phá',
  scrollUrl = '#gioi-thieu',
  typewriterItems = [
    'Giải pháp công nghệ',
    'Giải pháp thi công & lắp đặt',
    'Cung cấp thiết bị CNTT',
    'Dịch vụ Công nghệ thông tin',
  ],
  animate = 'true',
}) => {
  const bgStyle = buildBgStyle(background);

  const words = typewriterItems
    ? typewriterItems.map((item) => (typeof item === 'object' ? item.text : item)).filter(Boolean)
    : [];

  return (
    <section
      id="trang-chu"
      className="fullscreen-section relative flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-[#135237] via-[#196B49] to-[#41b67d]"
      style={{ ...bgStyle, backgroundColor: '#196849' }}
    >
      <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div
            className="flex flex-col items-start text-left space-y-6 lg:pr-8"
            style={{ animation: (animate === true || animate === 'true') ? 'fadeInUp 0.8s ease both' : 'none' }}
          >
            {tagline && (
              <div className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 backdrop-blur-sm">
                <span className="text-yellow-500 text-sm font-bold tracking-wider uppercase">
                  {tagline}
                </span>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.15] tracking-tight">
              {words.length > 0 ? (
                <Typewriter words={words} animate={animate === true || animate === 'true'} />
              ) : (
                <span>Hexagon</span>
              )}
              <br />
              <span
                className="inline-block mt-2"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #a8e6d8 55%, #F7931E 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                {title}
              </span>
            </h1>

            {subtitle && (
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}

            {buttons && buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                {buttons.map((btn, index) => {
                  const isPrimary = btn.style === 'primary';
                  const btnClass = isPrimary
                    ? 'px-8 py-3.5 bg-[linear-gradient(to_right,#ff9902,#f2d337)] hover:brightness-110 !text-white rounded-lg transition-all shadow-lg text-center shadow-yellow-500/30 font-bold'
                    : 'px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 !text-white rounded-lg transition-colors backdrop-blur-sm text-center font-bold';

                  return (
                    <a key={index} href={btn.url || '#'} className={btnClass}>
                      {btn.text}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Globe Image */}
          <div
            className="relative w-full flex justify-center"
            style={{ animation: (animate === true || animate === 'true') ? 'fadeIn 1.2s ease both' : 'none' }}
          >
            {imageUrl && (
              <div className="relative w-full max-w-none aspect-square">
                <img
                  src={imageUrl}
                  alt="Hexagon Global"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      {scrollLabel && (
        <div className="absolute inset-x-0 bottom-8 flex justify-center animate-bounce z-20">
          <a
            href={scrollUrl || '#gioi-thieu'}
            className="text-gray-300 hover:text-white flex flex-col items-center gap-1 transition-colors"
          >
            <span className="text-sm font-medium tracking-wide">{scrollLabel}</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fullscreen-section {
          min-height: 100vh;
        }
      `}</style>
    </section>
  );
};

export default HexHero;
