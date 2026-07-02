import React from 'react';

const AdminMap = ({ 
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.567585149659!2d106.53244777511364!3d10.920430789237209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b2d6619d65c51%3A0xaa40266b17ad7191!2zQ8O0bmcgdHkgQ-G7lSBQaOG6p24gT0NIQU8!5e0!3m2!1svi!2s!4v1782180477680!5m2!1svi!2s",
  height = "600",
  darkMode = false // Mặc định giống web gốc là sáng
}) => {
  // Bộ lọc CSS để biến Google Map sáng thành tối (Dark Mode)
  const mapStyle = darkMode 
    ? { border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)' } 
    : { border: 0, display: 'block' };

  return (
    <div className="w-full flex items-center justify-center">
      {mapUrl ? (
        <iframe 
          src={mapUrl} 
          width="100%" 
          height={height} 
          style={mapStyle} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      ) : (
        <div style={{ height: `${height}px` }} className="w-full flex items-center justify-center text-gray-500 border border-dashed border-gray-300">
          Chưa nhập link Google Maps
        </div>
      )}
    </div>
  );
};

export default AdminMap;
