import React from 'react';
import SidebarSlider from '../components/SidebarSlider';

const HexNewsPageDark = ({
  breadcrumbHome = 'Trang chủ',
  breadcrumbParent = 'Tin tức',
  title = 'Tin tức',
  subtitle = 'Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.',
  newsItems = [
    {
      title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
      description: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra tại khu nghỉ dưỡng Vinpearl Nha Trang.',
      category: 'Hoạt động',
      date: '26 tháng 6, 2026',
      imageUrl: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
      url: '#'
    },
    {
      title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
      description: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến trong chương trình “VHE Startup Devote’’.',
      category: 'Hoạt động',
      date: '26 tháng 6, 2026',
      imageUrl: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
      url: '#'
    },
    {
      title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
      description: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé ‘Lục Giác’ để chọn cho mình những siêu phẩm hỗ trợ đắc lực cho công việc và giải trí.',
      category: 'Sự kiện',
      date: '26 tháng 6, 2026',
      imageUrl: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
      url: '#'
    }
  ],
  sidebarTitle = 'DỊCH VỤ CỦA CHÚNG TÔI',
  sidebarAllText = 'Xem tất cả dịch vụ',
  sidebarAllUrl = '/#dich-vu',
  sidebarServices = [
    {
      title: 'Cung cấp thiết bị CNTT',
      description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.',
      imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
      url: '/vi/cung-cap-thiet-bi-cntt'
    },
    {
      title: 'Giải pháp công nghệ',
      description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.',
      imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
      url: '/vi/giai-phap-cong-nghe'
    }
  ]
}) => {
  return (
    <div className="bg-[#1a1a1a] text-white font-sans w-full min-h-screen pb-20 pt-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT CONTENT */}
          <div className="flex-1 min-w-0">
             {/* Breadcrumb */}
             <div className="text-gray-400 text-sm mb-8 flex items-center gap-2">
               <a href="/" className="hover:text-white transition-colors">{breadcrumbHome}</a>
               <span className="text-gray-500">&gt;</span>
               <span className="text-gray-200">{breadcrumbParent}</span>
             </div>
             
             {/* Title Section */}
             <div className="mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-[#f59e0b] mb-4">{title}</h1>
                <p className="text-gray-300 text-lg mb-6">{subtitle}</p>
                <div className="w-16 h-1 bg-[#f59e0b] rounded-full"></div>
             </div>
             
             {/* News Grid */}
             {newsItems && newsItems.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {newsItems.map((item, index) => (
                   <div key={index} className="bg-[#262626] border border-[#3f3f46] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-lg group hover:border-[#f59e0b]/40 hover:shadow-black/50 flex flex-col h-full">
                     <div className="aspect-[16/9] overflow-hidden relative">
                       <img 
                         src={item.imageUrl} 
                         alt={item.title} 
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                       />
                     </div>
                     <div className="p-6 flex flex-col flex-1">
                       <div className="mb-4">
                          <span className="inline-block border border-[#f59e0b] text-[#f59e0b] text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                            {item.category}
                          </span>
                       </div>
                       <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#f59e0b] transition-colors leading-snug">
                         {item.title}
                       </h3>
                       <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                         {item.description}
                       </p>
                       
                       <div className="flex justify-between items-center text-xs mt-auto pt-4 border-t border-[#3f3f46]">
                         <div className="flex text-gray-400 items-center gap-1">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                           </svg> 
                           <span>{item.date}</span>
                         </div>
                         <a href={item.url} className="text-[#f59e0b] font-medium hover:text-[#d97706] transition-colors whitespace-nowrap">
                           Xem thêm &rarr;
                         </a>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-center py-24 bg-[#262626] border border-[#3f3f46] rounded-xl">
                 <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                 </svg>
                 <p className="text-gray-400 text-lg">Chưa có bài viết nào.</p>
               </div>
             )}
          </div>
          
          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[350px] flex-shrink-0 lg:sticky lg:top-24">
             <SidebarSlider services={sidebarServices} title={sidebarTitle} seeAllText={`${sidebarAllText} >`} seeAllUrl={sidebarAllUrl} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HexNewsPageDark;
