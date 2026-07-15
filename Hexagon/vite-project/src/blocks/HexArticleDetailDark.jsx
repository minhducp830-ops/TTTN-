import React from 'react';
import SidebarSlider from '../components/SidebarSlider';

const HexArticleDetailDark = ({
  breadcrumbHome = 'Trang chủ',
  breadcrumbList = 'Bài viết',
  breadcrumbCategory = 'Hoạt động',
  breadcrumbCurrent = 'Tiêu đề bài viết',
  title = 'Tiêu đề bài viết',
  date = '26 tháng 6, 2026',
  time = '02:54',
  language = 'Tiếng Việt',
  contentHtml = '<p>Nội dung bài viết...</p>',
  relatedTitle = 'Bài viết liên quan',
  relatedArticles = [],
  sidebarServices = [],
  backText = 'Quay lại danh sách',
  backUrl = '/vi/bai-viet'
}) => {
  return (
    <div className="bg-[#1a1a1a] text-white font-sans w-full min-h-screen pb-20 pt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2 flex-wrap">
          <a href="/" className="hover:text-[#f59e0b] transition-colors">{breadcrumbHome}</a>
          <span className="text-gray-600">&gt;</span>
          <a href={backUrl} className="hover:text-[#f59e0b] transition-colors">{breadcrumbList}</a>
          <span className="text-gray-600">&gt;</span>
          <a href={backUrl} className="hover:text-[#f59e0b] transition-colors">{breadcrumbCategory}</a>
          <span className="text-gray-600">&gt;</span>
          <span className="text-gray-200 line-clamp-1 max-w-xs">{breadcrumbCurrent}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* LEFT CONTENT */}
          <div className="flex-1 min-w-0">
            <article className="bg-[#262626] rounded-2xl shadow-xl overflow-hidden border border-[#3f3f46]">
              {/* Header */}
              <div className="px-6 sm:px-10 pt-10 pb-8 border-b border-[#3f3f46]">
                <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
                  {title}
                </h1>
                
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {date}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {time}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                    {language}
                  </span>
                </div>
              </div>
              
              {/* Content Body */}
              <div className="px-6 sm:px-10 py-10">
                <div 
                  className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-[#f59e0b] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>
            </article>

            {/* Related Articles */}
            {relatedArticles && relatedArticles.length > 0 && (
              <section className="mt-16 pt-10 border-t border-[#3f3f46]">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-7 bg-[#f59e0b] rounded-full inline-block"></span>
                  {relatedTitle}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((article, index) => (
                    <a key={index} href={article.url} className="group bg-[#262626] border border-[#3f3f46] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/50 hover:border-[#f59e0b]/40 transition-all hover:-translate-y-1 block">
                      <div className="aspect-[16/9] overflow-hidden bg-black/50">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5">
                        <h4 className="text-sm font-bold text-gray-200 line-clamp-2 group-hover:text-[#f59e0b] transition-colors leading-snug">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          {article.date}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* RIGHT SIDEBAR */}
          <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 self-start">
            <a href={backUrl} className="inline-flex items-center gap-2 mb-6 text-[#f59e0b] font-semibold hover:gap-3 transition-all text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              {backText}
            </a>
            
            <SidebarSlider services={sidebarServices} />
          </aside>
          
        </div>
      </div>
    </div>
  );
};

export default HexArticleDetailDark;
