import React from 'react';
import { checkIsEditor } from '../utils/env';
import SectionTitle from '../components/SectionTitle';

const AdminContentBlocks = ({ 
  title = "GIỚI THIỆU VỀ METIK", 
  description = "metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.",
  bgColor = "#faf5f0",
  blocks = []
}) => {
  const isEditor = checkIsEditor();

  return (
    <div className="w-full py-12 md:py-16" style={{ backgroundColor: bgColor }}>
      <div className="max-w-[1250px] mx-auto px-4">
        
        {/* Phần Tiêu đề chung */}
        {(title || description) && (
          <div className="mb-12 max-w-4xl" {...(isEditor ? {} : { 'data-aos': 'fade-up' })}>
            <SectionTitle title={title} isEditor={isEditor} />
            
            {description && (
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mt-4">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Danh sách các khối nội dung xen kẽ (Zig-zag) */}
        <div className="flex flex-col space-y-16 md:space-y-24">
          {blocks.map((block, idx) => {
            // Xử lý bo góc cho từng ảnh riêng biệt
            const imgRadiusStyle = {
              borderRadius: `${block.radiusTL || 0}px ${block.radiusTR || 0}px ${block.radiusBR || 0}px ${block.radiusBL || 0}px`
            };

            // Xác định thứ tự hiển thị dựa trên layout (Ảnh bên trái hay Ảnh bên phải)
            const isImageLeft = block.layout === 'left';

            return (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-8 md:gap-16 overflow-hidden">
                
                {/* Vùng Hình ảnh */}
                <div 
                  className={`w-full md:w-1/2 ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}
                  {...(isEditor ? {} : { 'data-aos': isImageLeft ? 'fade-right' : 'fade-left' })}
                >
                  <div className="relative w-full overflow-hidden shadow-lg" style={imgRadiusStyle}>
                    <img 
                      src={block.imageUrl} 
                      alt={`Minh họa ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Vùng Nội dung chữ */}
                <div 
                  className={`w-full md:w-1/2 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}
                  {...(isEditor ? {} : { 'data-aos': isImageLeft ? 'fade-left' : 'fade-right' })}
                >
                  {/* Sử dụng dangerouslySetInnerHTML để render các thẻ HTML in đậm, in nghiêng, list */}
                  <div 
                    className="text-gray-700 text-[17px] md:text-lg leading-relaxed prose prose-lg prose-ul:list-disc prose-ul:pl-5 prose-li:my-2 prose-p:mb-4"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                </div>

              </div>
            );
          })}
        </div>
        
        {/* Hướng dẫn khi chưa có dữ liệu */}
        {blocks.length === 0 && (
          <div className="w-full py-10 border-2 border-dashed border-gray-400 text-center text-gray-500 font-medium">
            Chưa có khối nội dung nào. Bấm [+] ở thanh cấu hình bên phải để thêm khối mới.
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminContentBlocks;
