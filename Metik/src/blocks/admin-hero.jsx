import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { checkIsEditor } from '../utils/env';

// Hero component — banner với title, subtitle, buttons.
const AdminHero = ({ title, subtitle, buttons = [], background = {}, layout = {}, parallax = true, typingEffect = true }) => {
  const alignClass = layout.align === 'left' ? 'text-left' : layout.align === 'right' ? 'text-right' : 'text-center';
  const alignFlex = layout.align === 'left' ? 'justify-start' : layout.align === 'right' ? 'justify-end' : 'justify-center';
  const alignItems = layout.align === 'left' ? 'items-start' : layout.align === 'right' ? 'items-end' : 'items-center';

  const getBackgroundStyle = () => {
    const bg = background || {};
    let style = {};
    if (bg.type === 'gradient') {
      style = { background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#667eea'}, ${bg.gradientTo || '#764ba2'})` };
    } else if (bg.type === 'image' && bg.imageUrl) {
      style = { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
      if (parallax) style.backgroundAttachment = 'fixed';
    } else {
      style = { backgroundColor: bg.color || '#ffffff' };
    }
    return style;
  };

  const getButtonClass = (style) => {
    const base = 'inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all uppercase text-sm tracking-wider';
    switch (style) {
      case 'primary': return `${base} bg-[#f4851a] text-white hover:bg-orange-600 shadow-lg`;
      case 'outline': return `${base} border-2 border-white text-white hover:bg-white hover:text-[#f4851a]`;
      default: return `${base} bg-[#48a842] text-white hover:bg-green-700 shadow-lg`;
    }
  };

  const isEditor = checkIsEditor();

  return (
    <section className="relative py-32 px-4 overflow-hidden" style={getBackgroundStyle()}>
      <div className={`relative mx-auto max-w-7xl ${alignClass} flex flex-col ${alignItems}`}>
        {title && (
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-white drop-shadow-md uppercase tracking-tight min-h-[1.5em]" {...(isEditor ? {} : { 'data-aos': 'fade-up' })}>
            {typingEffect ? (
              <TypeAnimation
                sequence={[title, 1000]}
                wrapper="span"
                cursor={true}
                repeat={0}
              />
            ) : (
              title
            )}
          </h1>
        )}
        {subtitle && <p className="text-lg md:text-xl mb-8 text-white max-w-3xl drop-shadow" {...(isEditor ? {} : { 'data-aos': 'fade-up', 'data-aos-delay': 200 })}>{subtitle}</p>}
        {buttons && buttons.length > 0 && (
          <div className={`flex flex-wrap ${alignFlex} gap-4 mb-8`} {...(isEditor ? {} : { 'data-aos': 'zoom-in', 'data-aos-delay': 400 })}>
            {buttons.map((btn, idx) => (
              <a key={idx} href={btn.url || '#'} className={getButtonClass(btn.style || 'primary')}>
                {btn.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminHero;
