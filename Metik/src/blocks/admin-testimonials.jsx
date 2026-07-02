import React from 'react';

const AdminTestimonials = ({ 
  title = "KHÁCH HÀNG NÓI GÌ?", 
  bgColor = "#fdeecb",
  columns = 2,
  testimonials = []
}) => {
  return (
    <div className="w-full py-16" style={{ backgroundColor: bgColor }}>
      <div className="max-w-[1250px] mx-auto px-4">
        
        {/* Tiêu đề mang phong cách METIK */}
        {title && (
          <div className="mb-14 relative inline-block z-0">
            {/* Vệt vàng nổi bật phía sau */}
            <div className="absolute left-[20px] bottom-[4px] w-[calc(100%+30px)] h-[12px] bg-[#ffd000] -z-10"></div>
            <h2 className="text-2xl md:text-3xl font-black text-[#48a842] uppercase tracking-wide m-0">
              {title}
            </h2>
          </div>
        )}

        {/* Danh sách Feedback (Grid) */}
        <div 
          className={`grid gap-10 md:gap-14 ${columns === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} ${columns === 3 ? 'lg:grid-cols-3' : ''} ${columns >= 4 ? 'lg:grid-cols-4' : ''}`}
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))` }}
        >
          {testimonials.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-5 md:gap-8 items-start">
              
              {/* Ảnh đại diện (Avatar) */}
              <div className="flex-shrink-0">
                <img 
                  src={item.avatarUrl} 
                  alt={item.reviewerName || `Avatar ${idx}`} 
                  className={`w-28 h-28 object-cover rounded-full shadow-md ${item.showBorder ? 'border-[5px] border-[#ffd000]' : ''}`}
                />
              </div>

              {/* Nội dung đánh giá */}
              <div className="flex flex-col">
                
                {/* Số sao đánh giá */}
                <div className="flex text-[#ffd000] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-6 h-6 ${i < (item.rating || 5) ? 'fill-current' : 'text-gray-300 fill-current'}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Đoạn trích dẫn */}
                <p className="italic text-gray-600 text-lg leading-relaxed mb-4">
                  {item.content ? `"${item.content}"` : '"Chưa có lời đánh giá nào..."'}
                </p>

                {/* Tên / Thông tin người dùng */}
                <p className="font-bold text-[#4a4a4a] text-[17px] m-0">
                  {item.reviewerName || "Người dùng Ẩn danh"}
                </p>

              </div>
            </div>
          ))}
        </div>

        {/* Thông báo nếu chưa có dữ liệu */}
        {testimonials.length === 0 && (
          <div className="w-full py-10 border-2 border-dashed border-gray-400 text-center text-gray-500 font-medium">
            Chưa có đánh giá nào. Bấm [+] ở thanh cấu hình bên phải để thêm người đánh giá.
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminTestimonials;
