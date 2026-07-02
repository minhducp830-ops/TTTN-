import React from 'react';
import { checkIsEditor } from '../utils/env';

const AdminVideoBlock = ({ 
  title = "VỀ CHÚNG TÔI", 
  content = "",
  videoUrl = "",
  videoPoster = "",
  layout = "right",
  radiusTL = 10, 
  radiusTR = 10, 
  radiusBR = 10, 
  radiusBL = 10,
  bgColor = "#faf5f0"
}) => {
  const isEditor = checkIsEditor();

  // Chuỗi CSS cho bo góc Video
  const videoRadiusStyle = {
    borderRadius: `${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px`
  };

  // Xác định vị trí video
  const isVideoLeft = layout === 'left';

  return (
    <div className="w-full py-16 overflow-hidden" style={{ backgroundColor: bgColor }}>
      <div className="max-w-[1250px] mx-auto px-4">
        
        {/* Phần Tiêu đề chung */}
        {title && (
          <div 
            className="mb-10 relative inline-block z-0"
            {...(isEditor ? {} : { 'data-aos': 'fade-up' })}
          >
            {/* Vệt vàng nổi bật phía sau, bắt đầu từ chữ 'C' của CHÚNG TÔI */}
            <div className="absolute left-[45px] bottom-[4px] w-[calc(100%-25px)] h-[12px] bg-[#ffd000] -z-10"></div>
            <h2 className="text-2xl md:text-3xl font-black text-[#48a842] uppercase tracking-wide m-0">
              {title}
            </h2>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          {/* Vùng Video */}
          <div 
            className={`w-full md:w-1/2 ${isVideoLeft ? 'md:order-1' : 'md:order-2'}`}
            {...(isEditor ? {} : { 'data-aos': isVideoLeft ? 'fade-right' : 'fade-left' })}
          >
            <div className="relative w-full overflow-hidden shadow-2xl bg-black" style={videoRadiusStyle}>
              {videoUrl ? (
                <div className="relative">
                  <video 
                    className="w-full h-auto max-h-[500px] object-cover" 
                    controls 
                    poster={videoPoster}
                    preload="metadata"
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                  </video>
                </div>
              ) : (
                <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center text-gray-500 font-bold border-2 border-dashed border-gray-400">
                  Chưa nhập URL Video
                </div>
              )}
            </div>
          </div>

          {/* Vùng Nội dung chữ */}
          <div 
            className={`w-full md:w-1/2 ${isVideoLeft ? 'md:order-2' : 'md:order-1'}`}
            {...(isEditor ? {} : { 'data-aos': isVideoLeft ? 'fade-left' : 'fade-right', 'data-aos-delay': '150' })}
          >
            <div 
              className="text-gray-700 text-[17px] md:text-[19px] leading-relaxed [&>p]:mb-6 text-left"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminVideoBlock;
