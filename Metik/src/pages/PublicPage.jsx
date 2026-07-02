import React, { useEffect } from 'react';
import { Render } from '@measured/puck';
import AOS from 'aos';
import config from '../blocks/admin-puck-config';
import { getPageData } from '../utils/storage';

const PublicPage = ({ pageKey }) => {
  const data = getPageData(pageKey);

  // Refresh AOS mỗi khi data thay đổi để các component động nhận hiệu ứng
  useEffect(() => {
    AOS.refresh();
  }, [data]);

  // Nếu trang chưa có nội dung
  if (!data || data.content.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10">
          <h1 className="text-3xl font-bold text-gray-400 mb-4">Trang chưa có nội dung</h1>
          <p className="text-gray-500 text-lg mb-6">
            Hãy truy cập <code className="bg-gray-200 px-2 py-1 rounded font-mono text-[#f4851a]">/admin</code> để tạo nội dung cho trang này.
          </p>
          <a 
            href="/admin" 
            className="inline-block bg-[#f4851a] text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors shadow-lg"
          >
            Vào Editor
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Render config={config} data={data} />
    </div>
  );
};

export default PublicPage;
