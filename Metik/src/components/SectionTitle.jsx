import React from 'react';

/**
 * Component hiển thị Tiêu đề của một mục (Section) với phong cách thiết kế
 * chữ xanh lá, in hoa, và một vệt màu vàng làm nền phía sau.
 * 
 * @param {Object} props
 * @param {string} props.title - Nội dung tiêu đề
 * @param {boolean} [props.isEditor=false] - Cờ kiểm tra môi trường editor để tắt AOS
 */
const SectionTitle = ({ title, isEditor = false }) => {
  if (!title) return null;

  return (
    <div className="mb-6 relative inline-block z-0" {...(isEditor ? {} : { 'data-aos': 'fade-up' })}>
      {/* Vệt vàng nổi bật phía sau */}
      <div className="absolute left-[20px] bottom-[4px] w-[calc(100%+30px)] h-[12px] bg-[#ffd000] -z-10"></div>
      <h2 className="text-2xl md:text-3xl font-black text-[#48a842] uppercase tracking-wide m-0 px-2">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
