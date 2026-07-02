import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "@measured/puck/puck.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

import ProductDetailPage from "./blocks/admin-product-detail";
import PublicPage from "./pages/PublicPage";
import AdminEditor from "./pages/AdminEditor";
import { PAGES } from "./utils/constants";
import { getPageData, savePageData } from "./utils/storage";

// ============================================================
// Migration Script: Cập nhật URL sản phẩm tự động (Chạy 1 lần)
// ============================================================
const migrateProductUrls = () => {
  PAGES.forEach(page => {
    const data = getPageData(page.key);
    let changed = false;
    
    if (data && Array.isArray(data.content)) {
      data.content.forEach(block => {
        // Cập nhật ProductGrid
        if (block.type === 'ProductGrid' && block.props?.products) {
          const updatedProducts = block.props.products.map(p => {
            if (p.url === '#' || p.url === '' || !p.url) {
              const safeName = p.name ? p.name.toLowerCase().replace(/\s+/g, '-') : 'san-pham';
              return { ...p, url: `/san-pham/${safeName}` };
            }
            return p;
          });
          if (JSON.stringify(updatedProducts) !== JSON.stringify(block.props.products)) {
            block.props.products = updatedProducts;
            changed = true;
          }
        }
      });
    }

    if (changed) {
      savePageData(page.key, data);
    }
  });
};

// Chạy migration ngay khi module load
migrateProductUrls();

// ============================================================
// Component: App chính với Routes
// ============================================================
function App() {
  // Khởi tạo AOS (Hiệu ứng cuộn)
  useEffect(() => {
    document.body.classList.add('aos-enabled');
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true, // Chỉ chạy animation 1 lần khi cuộn tới
      offset: 50,
    });
  }, []);

  return (
    <Routes>
      {/* Route cho trang Quản trị (Kéo thả) */}
      <Route path="/admin" element={<AdminEditor />} />
      
      {/* Route cho trang Chi tiết sản phẩm (Sử dụng URL params để tự động map) */}
      <Route path="/san-pham/:id" element={<ProductDetailPage />} />

      {/* Routes cho các trang hiển thị (Lấy tự động từ cấu hình PAGES) */}
      {PAGES.map((page) => (
        <Route
          key={page.key}
          path={page.path}
          element={<PublicPage pageKey={page.key} />}
        />
      ))}
    </Routes>
  );
}

export default App;
