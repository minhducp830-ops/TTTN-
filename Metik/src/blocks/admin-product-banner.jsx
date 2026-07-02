import React from 'react';
import { PRODUCTS } from './admin-product-detail';

const AdminProductBanner = ({
  bgColor = '#1a1a1a',
  categoryTitle = 'Các sản phẩm bánh METIK',
}) => {
  return (
    <div style={{ backgroundColor: bgColor }} className="w-full py-12">
      <div className="max-w-[1250px] mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold mb-10">
          <a href="/" className="text-white/60 hover:text-[#f4851a] transition-colors">Trang chủ</a>
          <span className="text-white/40">/</span>
          <span className="text-white font-bold">Sản phẩm</span>
        </nav>

        {/* Tiêu đề danh mục */}
        {categoryTitle && (
          <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-8">
            {categoryTitle}
          </h2>
        )}

        {/* Grid ảnh sản phẩm */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => (
            <a
              key={product.id}
              href={product.slug}
              className="group block relative overflow-hidden rounded-xl aspect-square shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay tên sản phẩm */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-bold text-sm">{product.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductBanner;
