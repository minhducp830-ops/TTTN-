import React, { useState } from 'react';
import { LANG_KEY } from '../lib/constants';

// Helper: build background style from background field
export const buildBgStyle = (bg = {}) => {
  const type = bg.type || 'color';
  const style = {};

  if (type === 'color') {
    style.backgroundColor = bg.color || '#ffffff';
  } else if (type === 'gradient') {
    style.background = `linear-gradient(${bg.direction || 'to bottom right'}, ${bg.from || '#1A6B49'}, ${bg.to || '#41b67d'})`;
  } else if (type === 'image') {
    style.backgroundImage = `url('${bg.imageUrl || ''}')`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
  } else if (type === 'image+gradient') {
    style.backgroundImage = `linear-gradient(${bg.direction || 'to bottom right'}, ${bg.from || 'rgba(26,107,73,0.8)'}, ${bg.to || 'rgba(65,182,125,0.7)'}), url('${bg.imageUrl || ''}')`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
  } else if (type === 'image+color') {
    style.backgroundImage = `linear-gradient(${bg.overlayColor || 'rgba(26,107,73,0.7)'}, ${bg.overlayColor || 'rgba(26,107,73,0.7)'}), url('${bg.imageUrl || ''}')`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
  }

  return style;
};

// Vietnam flag SVG
export const FlagVN = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-6 h-4 object-cover rounded-sm">
    <rect fill="#da251d" width="640" height="480" />
    <polygon fill="#ff0" points="320,90 370,233 490,233 395,310 430,453 320,375 210,453 245,310 150,233 270,233" />
  </svg>
);

// UK flag SVG
export const FlagEN = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-6 h-4 object-cover rounded-sm">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
    <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
    <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
    <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
  </svg>
);

export default { buildBgStyle, FlagVN, FlagEN };
