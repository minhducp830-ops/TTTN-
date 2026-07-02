import React from 'react';
import CountUp from 'react-countup';
import { checkIsEditor } from '../utils/env';

const AdminCounter = ({ items = [], bgColor = '#ffffff' }) => {
  const isEditor = checkIsEditor();

  return (
    <div className="w-full py-16" style={{ backgroundColor: bgColor }}>
      <div className="max-w-[1250px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center p-6 text-center"
              {...(isEditor ? {} : { 'data-aos': 'zoom-in', 'data-aos-delay': index * 150 })}
            >
              {/* Vòng tròn Icon (Nếu có ảnh hoặc SVG) */}
              <div className="w-20 h-20 mb-4 bg-gray-50 rounded-full flex items-center justify-center shadow-inner border border-gray-100 overflow-hidden">
                {item.iconUrl ? (
                  <img src={item.iconUrl} alt="icon" className="w-12 h-12 object-contain" loading="lazy" />
                ) : (
                  <svg className="w-10 h-10 text-[#48a842]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                )}
              </div>
              
              {/* Số đếm chạy */}
              <div className="text-4xl md:text-5xl font-black text-[#f4851a] mb-2 font-[Lato]">
                <CountUp 
                  start={0} 
                  end={item.targetNumber || 100} 
                  duration={2.5} 
                  separator="," 
                  enableScrollSpy={true} 
                  scrollSpyOnce={true}
                />
                {item.suffix && <span>{item.suffix}</span>}
              </div>
              
              {/* Tiêu đề ngắn gọn */}
              <div className="text-gray-700 font-bold uppercase tracking-wider text-sm mt-2">
                {item.title || 'Thống kê'}
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="col-span-full py-10 border-2 border-dashed border-gray-400 text-center text-gray-500 font-medium">
              Chưa có dữ liệu thống kê. Bấm [+] để thêm bộ đếm.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCounter;
