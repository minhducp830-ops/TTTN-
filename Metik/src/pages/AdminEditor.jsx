import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Puck } from '@measured/puck';
import config from '../blocks/admin-puck-config';
import { getPageData, savePageData } from '../utils/storage';

// Danh sách trang mẫu, copy tạm từ App.jsx
// Sau này có thể chuyển vào một file cấu hình chung (constants.js)
const PAGES = [
  { path: "/", label: "Trang chủ", key: "home" },
  { path: "/san-pham", label: "Sản phẩm", key: "products" },
  { path: "/gioi-thieu", label: "Giới thiệu", key: "about" },
  { path: "/lien-he", label: "Liên hệ", key: "contact" }
];

const AdminEditor = () => {
  const navigate = useNavigate();
  const [currentPageKey, setCurrentPageKey] = useState("home");
  const [editorData, setEditorData] = useState(() => getPageData("home"));
  // Key dùng để force re-mount Puck khi đổi trang
  const [editorKey, setEditorKey] = useState(0);

  // Khi chọn trang khác trong dropdown
  const handlePageChange = (e) => {
    const newKey = e.target.value;
    setCurrentPageKey(newKey);
    setEditorData(getPageData(newKey));
    setEditorKey((prev) => prev + 1); // Force Puck re-render
  };

  // Khi bấm Publish
  const handlePublish = (newData) => {
    savePageData(currentPageKey, newData);
    setEditorData(newData);
    
    // Tìm đường dẫn tương ứng để chuyển đến trang vừa publish
    const page = PAGES.find((p) => p.key === currentPageKey);
    const pagePath = page ? page.path : "/";

    alert(`Đã xuất bản trang "${page?.label}" thành công! Hệ thống sẽ chuyển bạn sang xem trang.`);
    navigate(pagePath);
  };

  const currentPage = PAGES.find((p) => p.key === currentPageKey);

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Thanh chọn trang ở trên cùng */}
      <div className="bg-[#1a1a2e] px-6 py-3 flex items-center gap-4 shadow-md z-[9999] border-b border-[#16213e]">
        <span className="text-white/70 font-medium text-sm whitespace-nowrap">📄 Đang chỉnh sửa:</span>
        <select
          value={currentPageKey}
          onChange={handlePageChange}
          className="bg-[#16213e] text-white border border-[#e94560]/40 rounded-lg px-4 py-2 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] cursor-pointer min-w-[180px]"
        >
          {PAGES.map((page) => (
            <option key={page.key} value={page.key}>
              {page.label}
            </option>
          ))}
        </select>
        <span className="text-white/40 text-xs ml-2">
          Đường dẫn: <code className="text-[#e94560]">{currentPage?.path}</code>
        </span>

        {/* Nút xem trang */}
        <a
          href={currentPage?.path}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto bg-[#48a842] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Xem trang
        </a>
      </div>

      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden">
        <Puck
          key={editorKey}
          config={config}
          data={editorData}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
};

export default AdminEditor;
