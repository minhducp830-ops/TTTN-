import React from 'react';
import { checkIsEditor } from '../utils/env';
import SectionTitle from '../components/SectionTitle';

const AdminProductGrid = ({ 
  title = "SẢN PHẨM MỚI", 
  columns = 4, 
  radiusTL = 12, 
  radiusTR = 12, 
  radiusBR = 12, 
  radiusBL = 12,
  products = [] 
}) => {
  // Chuỗi CSS cho bo góc
  const borderRadiusStyle = {
    borderRadius: `${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px`
  };

  // Kiểm tra xem có đang ở trong màn hình Editor hay không (dựa vào URL)
  const isEditor = checkIsEditor();

  return (
    <div className="w-full py-8">
      <div className="max-w-[1250px] mx-auto px-4">
        
        {/* Tiêu đề mang phong cách METIK */}
        <SectionTitle title={title} isEditor={isEditor} />

        {/* Danh sách sản phẩm (Grid) */}
        <div 
          className="grid gap-6 mt-4"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {products.map((product, idx) => (
            <div 
              key={idx} 
              className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative"
              style={borderRadiusStyle}
              {...(isEditor ? {} : { 'data-aos': 'fade-up', 'data-aos-delay': idx * 100 })}
            >
              {/* Vùng Hình ảnh có hover */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Icon Tìm kiếm (Search Icon) - Hiện ra khi hover */}
                <a 
                  href={product.url || '#'}
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50 z-10"
                  aria-label={`Xem chi tiết ${product.name}`}
                >
                  <svg className="w-5 h-5 text-[#48a842]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {/* SVG Icon scan/search tương tự ảnh */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 10h.01M14 10h.01M10 14h.01M14 14h.01" /> {/* Thêm vài chấm cho giống scan */}
                  </svg>
                </a>
              </div>

              {/* Vùng Tên sản phẩm */}
              <div className="p-4 text-center flex-grow flex items-center justify-center bg-white border-t border-gray-100">
                <a 
                  href={product.url || '#'} 
                  className="text-[17px] font-bold text-[#f4851a] hover:text-[#d36f10] transition-colors"
                >
                  {product.name}
                </a>
              </div>

              {/* Lớp phủ link tàng hình để bấm cả khung (nếu muốn) */}
              <a href={product.url || '#'} className="absolute inset-0 z-0">
                <span className="sr-only">Xem chi tiết {product.name}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Thông báo nếu chưa có sản phẩm */}
        {products.length === 0 && (
          <div className="w-full py-10 border-2 border-dashed border-gray-300 text-center text-gray-500 font-medium">
            Chưa có sản phẩm nào. Hãy bấm [+] ở thanh cấu hình bên phải để thêm.
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminProductGrid;
