import React from 'react';

const HexServiceDetailDark = ({
  breadcrumbHome = 'Trang chủ',
  breadcrumbParent = 'Dịch vụ',
  title = 'Giải pháp công nghệ',
  description = 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.',
  buttonText = 'Liên hệ tư vấn',
  buttonUrl = '#lien-he',
  heroImage = 'https://beta.hexagon.xyz/assets/images/dv-3.jpg',
  solutionsTitle = 'Giải pháp nổi bật',
  solutions = [
    { title: 'Phát triển phần mềm theo yêu cầu', content: 'Thiết kế và xây dựng phần mềm "đo ni đóng giày" theo quy trình vận hành riêng của doanh nghiệp, giúp tối ưu hiệu suất và tăng khả năng cạnh tranh.' },
    { title: 'Giải pháp chuyển đổi số doanh nghiệp', content: 'Tích hợp công nghệ vào toàn bộ hoạt động (quản lý, bán hàng, vận hành), giúp doanh nghiệp tự động hóa quy trình và nâng cao trải nghiệm khách hàng.' },
    { title: 'Xây dựng hệ thống nền tảng & tích hợp', content: 'Phát triển hệ thống trung tâm (CRM, ERP, Dashboard...) và kết nối các nền tảng hiện có thành một hệ sinh thái đồng bộ, dữ liệu xuyên suốt.' },
  ],
  processTitle = 'Quy trình thực hiện',
  processSubtitle = 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
  processSteps = [
    { number: '01', title: 'Khảo sát & phân tích yêu cầu' },
    { number: '02', title: 'Thiết kế giải pháp & kiến trúc hệ thống' },
    { number: '03', title: 'Phát triển & Thử nghiệm' },
    { number: '04', title: 'Triển khai & Bảo trì' },
  ],
  ctaTitle = 'Sẵn sàng triển khai?',
  ctaDescription = 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
  ctaButton1 = 'Về trang chủ',
  ctaButton1Url = '/',
  ctaButton2 = 'Liên hệ ngay',
  ctaButton2Url = '#lien-he'
}) => {
  return (
    <div className="bg-[#1a1a1a] text-white font-sans w-full min-h-screen pb-20">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-12">
        
        {/* Breadcrumb */}
        <div className="text-gray-400 text-sm mb-12">
          <a href="/" className="hover:text-white transition-colors">{breadcrumbHome}</a>
          <span className="mx-2">&gt;</span>
          <span className="hover:text-white transition-colors cursor-pointer">{breadcrumbParent}</span>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-200">{title}</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#f59e0b] leading-tight mb-8">
              {title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-[500px]">
              {description}
            </p>
            <a 
              href={buttonUrl}
              className="inline-block bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-3.5 px-8 rounded-lg transition-all shadow-lg shadow-yellow-500/20 text-base"
            >
              {buttonText}
            </a>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="rounded-xl overflow-hidden shadow-2xl relative w-full pt-[60%] transition-transform hover:scale-[1.01] duration-500">
              <img 
                src={heroImage} 
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg' }}
              />
            </div>
          </div>
        </div>

        {/* Featured Solutions Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white inline-block relative pb-4">
              {solutionsTitle}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#f59e0b] rounded-full"></span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((item, index) => (
              <div key={index} className="bg-[#262626] border border-[#3f3f46] rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-black/50 hover:-translate-y-1 hover:border-[#f59e0b]/40 group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-snug">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-6">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{processTitle}</h2>
            <p className="text-gray-400">{processSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-[#262626] border border-[#3f3f46] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 hover:border-[#f59e0b]/40">
                <span className="text-4xl font-bold text-[#f59e0b] mb-4">{step.number}</span>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#0D5939] bg-gradient-to-r from-black/20 border border-white/10 backdrop-blur-sm rounded-2xl p-10 lg:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{ctaTitle}</h2>
            <p className="text-gray-200 text-lg mb-10 max-w-2xl mx-auto">{ctaDescription}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={ctaButton1Url}
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold py-3.5 px-8 rounded-lg transition-all border border-white/10"
              >
                {ctaButton1}
              </a>
              <a 
                href={ctaButton2Url}
                className="w-full sm:w-auto bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-3.5 px-8 rounded-lg transition-all shadow-lg shadow-yellow-500/20"
              >
                {ctaButton2}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HexServiceDetailDark;
