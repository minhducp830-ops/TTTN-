import React, { useState, useRef, useCallback } from 'react';

// ===== DỮ LIỆU 4 SẢN PHẨM =====
export const PRODUCTS = [
  {
    id: 'snack-vi-bap',
    slug: '/san-pham/snack-vi-bap',
    name: 'Snack vị Bắp',
    image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg',
    bgImage: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg',
    shortDesc: 'Snack <strong>metik</strong> vị Bắp là dòng snack được phát triển từ hương vị bắp quen thuộc, kết hợp giữa nguyên liệu chọn lọc và công nghệ chế biến tiên tiến từ nhà máy OCHAO TPHCM. Sản phẩm đậm vị bắp tự nhiên, dễ ăn, cuốn miệng, mang đến trải nghiệm mới mẻ',
    category: 'Các sản phẩm bánh METIK',
    categoryLink: '/san-pham',
    details: [
      { title: 'Hương vị bắp đặc trưng, kết cấu giòn', body: 'Snack bắp có mùi thơm rõ của bắp, vị sữa bắp béo nhẹ, hậu vị ngọt tự nhiên, mang hương vị hấp dẫn khi ăn.' },
      { title: 'Công thức được nghiên cứu bài bản, sản xuất trên dây chuyền hiện đại', body: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.' },
      { title: 'Đa dạng hình thức chế biến, phù hợp nhiều thị trường', body: 'Snack Bắp METIK có thể phát triển dạng phôi bánh, dòng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung đạm đậu nành, có thể dán nhãn "source of protein", và bổ sung xơ, có thể dán nhãn "source of fiber".' },
    ],
    related: ['snack-vi-pho-mai', 'snack-vi-bbq', 'snack-vi-tao-bien'],
  },
  {
    id: 'snack-vi-pho-mai',
    slug: '/san-pham/snack-vi-pho-mai',
    name: 'Snack vị Phô mai',
    image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp',
    bgImage: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp',
    shortDesc: 'Snack Phô Mai METIK là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM. Sản phẩm có thành phần phô mai thơm nhẹ, dễ ăn và mang đến trải nghiệm ăn vặt hấp dẫn.',
    category: 'Các sản phẩm bánh METIK',
    categoryLink: '/san-pham',
    details: [
      { title: 'Hương vị phô mai béo nhẹ, kết cấu giòn', body: 'Snack có mùi thơm phô mai rõ nét, vị béo ngậy vừa phải, hòa quyện cùng vị umami và thoang thoảng mùi khói nhẹ, mang đến hương vị hấp dẫn khi ăn.' },
      { title: 'Công thức được nghiên cứu bài bản, sản xuất trên dây chuyền hiện đại', body: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.' },
      { title: 'Đa dạng hình thức chế biến, phù hợp nhiều thị trường', body: 'Snack Phô Mai METIK có thể phát triển dạng phôi bánh, dòng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung xơ, có thể dán nhãn "source of fiber".' },
    ],
    related: ['snack-vi-bap', 'snack-vi-bbq', 'snack-vi-tao-bien'],
  },
  {
    id: 'snack-vi-bbq',
    slug: '/san-pham/snack-vi-bbq',
    name: 'Snack vị BBQ',
    image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg',
    bgImage: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg',
    shortDesc: 'Snack METIK vị BBQ là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM, mang đến trải nghiệm ăn vặt tuyệt vời. Sản phẩm sử dụng gia vị thịt nướng, lấy cảm hứng từ phong cách BBQ quen thuộc.',
    category: 'Các sản phẩm bánh METIK',
    categoryLink: '/san-pham',
    details: [
      { title: 'Hương vị BBQ đậm đà, kết cấu giòn', body: 'Snack có mùi thơm rõ của gia vị BBQ, vị mặn ngọt hài hòa, xen lẫn hậu vị khói nhẹ, mang đến hương vị hấp dẫn khi ăn.' },
      { title: 'Công thức được nghiên cứu bài bản, sản xuất trên dây chuyền hiện đại', body: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.' },
      { title: 'Đa dạng hình thức chế biến, phù hợp nhiều thị trường', body: 'Snack vị BBQ OCHAO có thể phát triển dạng phôi bánh, dòng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung xơ, có dán nhãn "source of fiber".' },
    ],
    related: ['snack-vi-pho-mai', 'snack-vi-bap', 'snack-vi-tao-bien'],
  },
  {
    id: 'snack-vi-tao-bien',
    slug: '/san-pham/snack-vi-tao-bien',
    name: 'Snack vị Tảo biển',
    image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg',
    bgImage: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg',
    shortDesc: 'Snack METIK vị Tảo Biển là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM. Sản phẩm sử dụng gia vị tảo biển Nori, tạo hương vị umami nhẹ nhàng, dễ ăn và phù hợp nhiều người tiêu dùng.',
    category: 'Các sản phẩm bánh METIK',
    categoryLink: '/san-pham',
    details: [
      { title: 'Hương vị hấp dẫn, kết cấu giòn', body: 'Snack tảo biển có mùi rong biển nhẹ, hòa quyện cùng vị bùi của đậu và vị umami tự nhiên, mang đến hương vị hấp dẫn khi ăn.' },
      { title: 'Công thức được nghiên cứu bài bản, sản xuất trên dây chuyền hiện đại', body: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.' },
      { title: 'Đa dạng hình thức chế biến, phù hợp nhiều thị trường', body: 'Snack tảo biển METIK có thể phát triển dạng phôi bánh, dòng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung đạm đậu nành, có thể dán nhãn "source of protein".' },
    ],
    related: ['snack-vi-bap', 'snack-vi-pho-mai', 'snack-vi-bbq'],
  },
];

import { useParams } from 'react-router-dom';

// ===== COMPONENT: TRANG CHI TIẾT SẢN PHẨM =====
const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = id || 'snack-vi-bap'; // Fallback nếu không có ID
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const productIndex = PRODUCTS.findIndex(p => p.id === productId);
  const prevProduct = productIndex > 0 ? PRODUCTS[productIndex - 1] : PRODUCTS[PRODUCTS.length - 1];
  const nextProduct = productIndex < PRODUCTS.length - 1 ? PRODUCTS[productIndex + 1] : PRODUCTS[0];
  const relatedProducts = (product?.related || []).map(rid => PRODUCTS.find(p => p.id === rid)).filter(Boolean);

  // State zoom kính lúp
  const [zoom, setZoom] = useState({ active: false, x: 0, y: 0, bx: 0, by: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imgRef = useRef(null);
  const ZOOM_FACTOR = 2.5;
  const LENS_SIZE = 120;

  const handleMouseMove = useCallback((e) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const bx = (x / rect.width) * 100;
    const by = (y / rect.height) * 100;
    setZoom({ active: true, x, y, bx, by });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setZoom(z => ({ ...z, active: false }));
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <p className="text-white text-xl">Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">
      {/* ===== BREADCRUMB + MŨI TÊN ===== */}
      <div
        className="w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${product.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '80px',
        }}
      >
        {/* Overlay tối */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-[1250px] mx-auto px-6 py-5 flex items-center justify-between">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold">
            <a href="/" className="text-white/60 hover:text-[#f4851a] transition-colors">Trang chủ</a>
            <span className="text-white/40">/</span>
            <a href="/san-pham" className="text-white/60 hover:text-[#f4851a] transition-colors">Sản phẩm</a>
            <span className="text-white/40">/</span>
            <span className="text-white font-bold">Các sản phẩm bánh METIK</span>
          </nav>

          {/* Nút mũi tên chuyển sản phẩm */}
          <div className="flex items-center gap-2">
            <a
              href={prevProduct.slug}
              className="w-9 h-9 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-[#f4851a] hover:bg-[#f4851a] transition-all group"
              title={prevProduct.name}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <a
              href={nextProduct.slug}
              className="w-9 h-9 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-[#f4851a] hover:bg-[#f4851a] transition-all group"
              title={nextProduct.name}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ===== NỘI DUNG CHÍNH ===== */}
      <div className="max-w-[1250px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Cột trái: ẢNH SẢN PHẨM */}
          <div className="w-full lg:w-[48%] flex-shrink-0">
            <div
              className="relative rounded-lg overflow-hidden cursor-crosshair select-none"
              ref={imgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ aspectRatio: '1/1' }}
            >
              {/* Ảnh chính */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Lens phóng to khi hover */}
              {zoom.active && (
                <>
                  {/* Vòng tròn lens trên ảnh */}
                  <div
                    className="absolute pointer-events-none border-2 border-white/70 rounded-full shadow-lg z-10"
                    style={{
                      width: LENS_SIZE,
                      height: LENS_SIZE,
                      left: zoom.x - LENS_SIZE / 2,
                      top: zoom.y - LENS_SIZE / 2,
                      background: 'rgba(255,255,255,0.08)',
                    }}
                  />
                  {/* Ảnh phóng to hiển thị cạnh ảnh chính */}
                  <div
                    className="absolute top-0 left-full ml-4 w-[300px] h-[300px] rounded-lg overflow-hidden shadow-2xl border border-white/20 z-20 pointer-events-none"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: `${ZOOM_FACTOR * 100}%`,
                      backgroundPosition: `${zoom.bx}% ${zoom.by}%`,
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </>
              )}

              {/* Nút phóng to góc trái dưới */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-black/60 border border-white/40 flex items-center justify-center hover:bg-[#f4851a] hover:border-[#f4851a] transition-all z-10"
                title="Phóng to"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cột phải: THÔNG TIN SẢN PHẨM */}
          <div className="flex-1 pt-2">
            <h1 className="text-3xl font-black text-white mb-3 leading-tight">{product.name}</h1>

            {/* Divider cam */}
            <div className="w-12 h-1 bg-[#f4851a] rounded mb-6"></div>

            {/* Mô tả ngắn */}
            <p
              className="text-white/75 leading-relaxed text-base mb-6"
              dangerouslySetInnerHTML={{ __html: product.shortDesc }}
            />

            {/* Danh mục */}
            <div className="mb-6 text-sm text-white/60">
              <span>Danh mục: </span>
              <a
                href={product.categoryLink}
                className="text-[#f4851a] hover:underline font-semibold"
              >
                {product.category}
              </a>
            </div>

            {/* Nút chia sẻ */}
            <div className="flex items-center gap-3">
              <a
                href={`https://www.facebook.com/sharer.php?u=https://localhost:5173${product.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3b5998] flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://localhost:5173${product.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#007bb5] flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ===== TAB CHI TIẾT SẢN PHẨM ===== */}
        <div className="mt-16 border-t border-white/10">
          {/* Tab header */}
          <div className="flex justify-center pt-0">
            <div className="border-b-2 border-[#f4851a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white">
              Chi tiết sản phẩm
            </div>
          </div>

          {/* Nội dung chi tiết */}
          <div className="py-10 space-y-5">
            {product.details.map((d, idx) => (
              <p key={idx} className="text-white/80 leading-relaxed text-base">
                <strong className="text-white">{d.title}: </strong>
                <span dangerouslySetInnerHTML={{ __html: d.body }} />
              </p>
            ))}
          </div>
        </div>

        {/* ===== SẢN PHẨM LIÊN QUAN ===== */}
        <div className="mt-8 border-t border-white/10 pt-10">
          <h3 className="text-xl font-black uppercase tracking-widest text-white mb-8">Sản phẩm liên quan</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((rp) => (
              <a
                key={rp.id}
                href={rp.slug}
                className="group block"
              >
                <div className="overflow-hidden rounded-lg mb-3 aspect-square bg-black/20">
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="text-center text-[#f4851a] font-bold text-sm group-hover:underline">
                  {rp.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== LIGHTBOX PHÓNG TO ẢNH ===== */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
