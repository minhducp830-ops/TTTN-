import React from 'react';

// Section component — container có background, padding, và children (slot).
const containerMap = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' };

const AdminSection = ({ container = 'lg', background = {}, padding_x = 4, padding_y = 4, children }) => {
  const bgStyle = {};
  if (background.type === 'color') bgStyle.backgroundColor = background.color || 'transparent';
  if (background.type === 'image' && background.bg_image) {
    bgStyle.backgroundImage = `url(${background.bg_image})`;
    bgStyle.backgroundSize = 'cover';
  }
  if (background.type === 'gradient') {
    bgStyle.background = `linear-gradient(${background.direction || 'to right'}, ${background.fromColor || '#fff'}, ${background.toColor || '#000'})`;
  }
  if (background.type === 'metik-theme') {
    bgStyle.background = 'radial-gradient(circle at top right, rgba(255,153,0,.22), transparent 32%), radial-gradient(circle at bottom left, rgba(255,193,7,.16), transparent 36%), linear-gradient(180deg, #ffffff 0%, #f7f7f7 35%, #fff6e8 70%, #ffe2b8 100%)';
  }
  if (background.opacity !== undefined) bgStyle.opacity = background.opacity;

  return (
    <section style={{ ...bgStyle, padding: `${(padding_y || 0) * 4}px ${(padding_x || 0) * 4}px` }}>
      <div style={{ maxWidth: containerMap[container] || '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
};

export default AdminSection;
