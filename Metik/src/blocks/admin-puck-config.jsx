import React from 'react';
import AdminHeading from "./admin-heading";
import AdminText from "./admin-text";
import AdminImage from "./admin-image";
import AdminSection from "./admin-section";
import AdminHero from "./admin-hero";
import AdminHeader from "./admin-header";
import AdminSlider from "./admin-slider";
import AdminProductGrid from "./admin-product-grid";
import AdminContentBlocks from "./admin-content-blocks";
import AdminVideoBlock from "./admin-video-block";
import AdminTestimonials from "./admin-testimonials";
import AdminFooter from "./admin-footer";
import AdminMap from "./admin-map";
import AdminCounter from "./admin-counter";
//Config — đăng ký components với fields + defaultProps + render.

export const puckConfig = {
  components: {
    Heading: {
      label: 'Tiêu đề',
      fields: {
        content: { type: 'text', label: 'Nội dung', contentEditable: true },
        level: {
          type: 'select', label: 'Cấp độ',
          options: [
            { label: 'H1', value: 1 }, { label: 'H2', value: 2 },
            { label: 'H3', value: 3 }, { label: 'H4', value: 4 },
            { label: 'H5', value: 5 }, { label: 'H6', value: 6 }
          ]
        },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        },
        variant: {
          type: 'select', label: 'Kiểu dáng',
          options: [
            { label: 'Mặc định', value: 'default' },
            { label: 'METIK Theme', value: 'metik' }
          ]
        }
      },
      defaultProps: { content: 'Tiêu đề', level: 2, align: 'left', variant: 'default' },
      render: (props) => <AdminHeading {...props} />
    },

    Text: {
      label: 'Văn bản',
      fields: {
        content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' },
            { label: 'Đều', value: 'justify' }
          ]
        }
      },
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Ảnh',
      fields: {
        src: { type: 'text', label: 'URL ảnh' },
        alt: { type: 'text', label: 'Alt text' },
        width: { type: 'text', label: 'Chiều rộng', default: '100%' },
        height: { type: 'text', label: 'Chiều cao', default: 'auto' },
        borderRadius: { type: 'text', label: 'Bo góc', default: '0' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '30px', align: 'center'
      },
      render: (props) => <AdminImage {...props} />
    },

    Section: {
      label: 'Khoảng (Section)',
      fields: {
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' }
          ]
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' },
                { label: 'METIK Theme', value: 'metik-theme' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            fromColor: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            toColor: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            direction: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            bg_image: { type: 'text', label: 'URL ảnh nền' },
            opacity: { type: 'number', label: 'Độ mờ', min: 0, max: 1, step: 0.1, default: 1 }
          }
        },
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        content: { type: 'slot' } // Cho phép nested components
      },
      defaultProps: {
        container: 'lg',
        background: { type: 'color', color: '#ffffff' },
        padding_x: 4, padding_y: 4,
        content: []
      },
      render: (props) => <AdminSection {...props} />
    },

    Hero: {
      label: 'Hero Banner',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
            text: { type: 'text', label: 'Text nút', contentEditable: true },
            url: { type: 'text', label: 'URL' },
            style: {
              type: 'select', label: 'Style',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' }
              ]
            }
          },
          getItemSummary: (item) => item.text
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL ảnh nền' }
          }
        },
        layout: {
          type: 'object', label: 'Bố cục',
          objectFields: {
            align: {
              type: 'select', label: 'Căn lề',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
              ]
            }
          }
        }
      },
      defaultProps: {
        title: 'Chào mừng đến với website',
        subtitle: 'Chúng tôi cung cấp những sản phẩm và dịch vụ tốt nhất',
        buttons: [
          { text: 'Tìm hiểu thêm', url: '#', style: 'primary' },
          { text: 'Liên hệ', url: '#contact', style: 'outline' }
        ],
        background: {
          type: 'gradient',
          gradientFrom: '#667eea', gradientTo: '#764ba2',
          gradientDirection: 'to bottom right'
        },
        layout: { align: 'center' }
      },
      render: (props) => <AdminHero {...props} />
    },

    Header: {
      label: 'Thanh điều hướng (Header)',
      fields: {
        logoUrl: { type: 'text', label: 'URL Logo' },
        menuItems: {
          type: 'array',
          label: 'Menu',
          arrayFields: {
            label: { type: 'text', label: 'Tên mục' },
            url: { type: 'text', label: 'Link' }
          },
          getItemSummary: (item) => item.label || 'Mục mới'
        },
        socialLinks: {
          type: 'array',
          label: 'Mạng xã hội',
          arrayFields: {
            platform: { 
              type: 'select', 
              label: 'Nền tảng',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'LinkedIn', value: 'linkedin' }
              ]
            },
            url: { type: 'text', label: 'Link' },
            tooltip: { type: 'text', label: 'Tooltip' }
          },
          getItemSummary: (item) => item.platform || 'Social'
        },
        activeMenuIndex: {
          type: 'number',
          label: 'Mục Menu đang chọn (0, 1, 2... Nhập -1 để tắt)',
          default: -1
        }
      },
      defaultProps: {
        logoUrl: 'https://metik.vn/wp-content/uploads/2026/06/logometik.png',
        menuItems: [
          { label: 'TRANG CHỦ', url: '/' },
          { label: 'GIỚI THIỆU', url: '/gioi-thieu' },
          { label: 'SẢN PHẨM', url: '/san-pham' },
          { label: 'TIN TỨC', url: '/tin-tuc' },
          { label: 'LIÊN HỆ', url: '/lien-he' }
        ],
        socialLinks: [
          { platform: 'facebook', url: '#', tooltip: 'Theo dõi trên Facebook' },
          { platform: 'tiktok', url: '#', tooltip: 'Theo dõi trên TikTok' },
          { platform: 'linkedin', url: '#', tooltip: 'Theo dõi trên LinkedIn' }
        ]
      },
      render: (props) => <AdminHeader {...props} />
    },

    Slider: {
      label: 'Trình chiếu ảnh (Slider)',
      fields: {
        autoPlayInterval: { 
          type: 'number', 
          label: 'Tự động chạy (giây) - Nhập 0 để tắt', 
          min: 0, 
          max: 20, 
          default: 4 
        },
        slides: {
          type: 'array',
          label: 'Danh sách Slide',
          arrayFields: {
            imageUrl: { type: 'text', label: 'URL Ảnh' },
            url: { type: 'text', label: 'Link (khi bấm vào)' },
            altText: { type: 'text', label: 'Mô tả ảnh (Alt)' }
          },
          getItemSummary: (item, i) => item.altText || `Slide ${i + 1}`
        }
      },
      defaultProps: {
        autoPlayInterval: 4,
        slides: [
          { imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik.webp', url: '#', altText: 'Banner METIK 1' },
          { imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik-2-1-scaled.webp', url: '#', altText: 'Banner METIK 2' }
        ]
      },
      render: (props) => <AdminSlider {...props} />
    },

    ProductGrid: {
      label: 'Danh sách Sản phẩm',
      fields: {
        title: { type: 'text', label: 'Tiêu đề khối' },
        columns: { 
          type: 'select', 
          label: 'Số lượng cột',
          options: [
            { label: '2 Cột', value: 2 },
            { label: '3 Cột', value: 3 },
            { label: '4 Cột', value: 4 },
            { label: '5 Cột', value: 5 },
            { label: '6 Cột', value: 6 },
          ]
        },
        radiusTL: { type: 'number', label: 'Bo góc (Trái Trên) px', min: 0, max: 100 },
        radiusTR: { type: 'number', label: 'Bo góc (Phải Trên) px', min: 0, max: 100 },
        radiusBR: { type: 'number', label: 'Bo góc (Phải Dưới) px', min: 0, max: 100 },
        radiusBL: { type: 'number', label: 'Bo góc (Trái Dưới) px', min: 0, max: 100 },
        products: {
          type: 'array',
          label: 'Danh sách Sản phẩm',
          arrayFields: {
            name: { type: 'text', label: 'Tên sản phẩm' },
            imageUrl: { type: 'text', label: 'URL Hình ảnh' },
            url: { type: 'text', label: 'Link chi tiết' }
          },
          getItemSummary: (item) => item.name || 'Sản phẩm mới'
        }
      },
      defaultProps: {
        title: "SẢN PHẨM MỚI",
        columns: 4,
        radiusTL: 0,
        radiusTR: 0,
        radiusBR: 0,
        radiusBL: 0,
        products: [
          { name: 'Snack vị Tảo biển', imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg', url: '/san-pham/snack-vi-tao-bien' },
          { name: 'Snack vị BBQ', imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg', url: '/san-pham/snack-vi-bbq' },
          { name: 'Snack vị Bắp', imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg', url: '/san-pham/snack-vi-bap' },
          { name: 'Snack vị Phô mai', imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp', url: '/san-pham/snack-vi-pho-mai' }
        ]
      },
      render: (props) => <AdminProductGrid {...props} />
    },

    ContentBlocks: {
      label: 'Giới Thiệu',
      fields: {
        bgColor: { type: 'text', label: 'Màu nền' },
        title: { type: 'text', label: 'Tiêu đề' },
        description: { type: 'textarea', label: 'Đoạn giới thiệu' },
        blocks: {
          type: 'array',
          label: 'Danh sách khối (Zigzag)',
          arrayFields: {
            imageUrl: { type: 'text', label: 'URL Ảnh' },
            layout: {
              type: 'select',
              label: 'Vị trí Ảnh',
              options: [
                { label: 'Ảnh bên Trái', value: 'left' },
                { label: 'Ảnh bên Phải', value: 'right' }
              ]
            },
            radiusTL: { type: 'number', label: 'Bo góc (Trái Trên) px', min: 0, max: 100 },
            radiusTR: { type: 'number', label: 'Bo góc (Phải Trên) px', min: 0, max: 100 },
            radiusBR: { type: 'number', label: 'Bo góc (Phải Dưới) px', min: 0, max: 100 },
            radiusBL: { type: 'number', label: 'Bo góc (Trái Dưới) px', min: 0, max: 100 },
            content: { 
              type: 'textarea', 
              label: 'Nội dung chữ (Hỗ trợ HTML: <b>in đậm</b>, <i>in nghiêng</i>, <ul><li>danh sách</li></ul>)' 
            }
          },
          getItemSummary: (item, i) => `Khối ${i + 1} (${item.layout === 'left' ? 'Trái' : 'Phải'})`
        }
      },
      defaultProps: {
        bgColor: "#faf5f0",
        title: "GIỚI THIỆU VỀ METIK",
        description: "metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.",
        blocks: [
          {
            imageUrl: "https://metik.vn/wp-content/uploads/2021/05/hinh3.webp",
            layout: "left",
            radiusTL: 40, radiusTR: 40, radiusBR: 40, radiusBL: 40,
            content: "<p>Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt.</p><p>METIK tập trung phát triển các dòng snack giòn, nhẹ, dễ ăn và phù hợp với nhiều nhóm khách hàng. Sản phẩm được nghiên cứu với nhiều hương vị hấp dẫn như rong biển, bắp, phô mai, BBQ và các hương vị đặc trưng khác.</p>"
          },
          {
            imageUrl: "https://metik.vn/wp-content/uploads/2021/05/hinh0003.webp",
            layout: "right",
            radiusTL: 0, radiusTR: 40, radiusBR: 0, radiusBL: 40,
            content: "<ul><li>Sử dụng nguyên liệu có nguồn gốc rõ ràng, phù hợp với tiêu chuẩn sản xuất thực phẩm.</li><li>Quy trình sản xuất hiện đại, khép kín và đảm bảo vệ sinh an toàn thực phẩm.</li><li>Kiểm soát chất lượng chặt chẽ trong từng công đoạn, từ nguyên liệu đầu vào đến thành phẩm.</li></ul>"
          },
          {
            imageUrl: "https://metik.vn/wp-content/uploads/2021/05/hinh2.jpg",
            layout: "left",
            radiusTL: 40, radiusTR: 40, radiusBR: 40, radiusBL: 40,
            content: "<p>Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.</p>"
          }
        ]
      },
      render: (props) => <AdminContentBlocks {...props} />
    },

    VideoBlock: {
      label: 'Khối Video',
      fields: {
        bgColor: { type: 'text', label: 'Màu nền' },
        title: { type: 'text', label: 'Tiêu đề' },
        content: { type: 'textarea', label: 'Nội dung chữ (Hỗ trợ HTML)' },
        videoUrl: { type: 'text', label: 'URL Video (.mp4)' },
        videoPoster: { type: 'text', label: 'URL Ảnh bìa (Poster)' },
        layout: {
          type: 'select',
          label: 'Vị trí Video',
          options: [
            { label: 'Video bên Trái', value: 'left' },
            { label: 'Video bên Phải', value: 'right' }
          ]
        },
        radiusTL: { type: 'number', label: 'Bo góc (Trái Trên) px', min: 0, max: 100 },
        radiusTR: { type: 'number', label: 'Bo góc (Phải Trên) px', min: 0, max: 100 },
        radiusBR: { type: 'number', label: 'Bo góc (Phải Dưới) px', min: 0, max: 100 },
        radiusBL: { type: 'number', label: 'Bo góc (Trái Dưới) px', min: 0, max: 100 }
      },
      defaultProps: {
        bgColor: "#faf5f0",
        title: "VỀ CHÚNG TÔI",
        content: "<p>Với tinh thần “Chạm mê tít — Snap into Joy”, <b>metik</b> mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, <b>metik</b> mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.</p><p><b>metik</b> không chỉ là một sản phẩm snack. <b>metik</b> là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.</p>",
        videoUrl: "https://metik.vn/wp-content/uploads/2026/06/METIK-ChamMeTit.mp4",
        videoPoster: "",
        layout: "right",
        radiusTL: 10,
        radiusTR: 10,
        radiusBR: 10,
        radiusBL: 10
      },
      render: (props) => <AdminVideoBlock {...props} />
    },

    Testimonials: {
      label: 'Khách hàng Đánh giá',
      fields: {
        bgColor: { type: 'text', label: 'Màu nền' },
        title: { type: 'text', label: 'Tiêu đề' },
        columns: { 
          type: 'select', 
          label: 'Số lượng cột',
          options: [
            { label: '2 Cột', value: 2 },
            { label: '3 Cột', value: 3 },
            { label: '4 Cột', value: 4 }
          ]
        },
        testimonials: {
          type: 'array',
          label: 'Danh sách Người đánh giá',
          arrayFields: {
            avatarUrl: { type: 'text', label: 'URL Ảnh đại diện' },
            showBorder: { 
              type: 'radio', 
              label: 'Viền vàng', 
              options: [
                { label: 'Bật', value: true },
                { label: 'Tắt', value: false }
              ]
            },
            rating: { type: 'number', label: 'Số sao (1-5)', min: 1, max: 5 },
            content: { type: 'textarea', label: 'Lời đánh giá' },
            reviewerName: { type: 'text', label: 'Tên/Thông tin' }
          },
          getItemSummary: (item) => item.reviewerName || 'Người đánh giá'
        }
      },
      defaultProps: {
        bgColor: "#fdeecb",
        title: "KHÁCH HÀNG NÓI GÌ?",
        columns: 2,
        testimonials: [
          {
            avatarUrl: "https://metik.vn/wp-content/uploads/2021/05/hinh0003.webp",
            showBorder: true,
            rating: 5,
            content: "Snack metik ăn vừa giòn, vừa ngon vừa cuốn miệng. Em thường lựa chọn để mang theo tới trường",
            reviewerName: "Sinh viên Huỳnh Vĩnh, TP.HCM"
          },
          {
            avatarUrl: "https://metik.vn/wp-content/uploads/2021/05/hinh2.jpg",
            showBorder: true,
            rating: 5,
            content: "metik gợi nhớ cho em rất nhiều kỉ niệm thời thơ ấu. Hy vọng nhãn hàng trong tương lai sẽ ra nhiều sản phẩm độc đáo hơn nữa.",
            reviewerName: "Bạn Mỹ Duyên, Đồng Tháp"
          }
        ]
      },
      render: (props) => <AdminTestimonials {...props} />
    },

    Footer: {
      label: 'Chân trang (Footer)',
      fields: {
        bgColor: { type: 'text', label: 'Màu nền chính (Vàng)' },
        bottomBgColor: { type: 'text', label: 'Màu dải dưới (Cam)' },
        logoUrl: { type: 'text', label: 'URL Logo' },
        description: { type: 'textarea', label: 'Đoạn giới thiệu' },
        contactTitle: { type: 'text', label: 'Tiêu đề cột liên hệ' },
        contactItems: {
          type: 'array',
          label: 'Danh sách Thông tin Liên hệ',
          arrayFields: {
            iconType: { 
              type: 'select', 
              label: 'Loại Icon', 
              options: [
                { label: 'Điện thoại', value: 'phone' },
                { label: 'Email', value: 'email' },
                { label: 'Địa chỉ', value: 'location' }
              ] 
            },
            text: { type: 'text', label: 'Nội dung hiển thị' },
            url: { type: 'text', label: 'Link (khi bấm vào)' }
          },
          getItemSummary: (item) => item.text || 'Thông tin liên hệ'
        },
        copyrightText: { type: 'text', label: 'Dòng chữ Bản quyền' }
      },
      defaultProps: {
        bgColor: "#fec810",
        bottomBgColor: "#f4851a",
        logoUrl: "https://metik.vn/wp-content/uploads/2026/06/logometik.png",
        description: "METIK - một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.",
        contactTitle: "THÔNG TIN LIÊN HỆ",
        contactItems: [
          { iconType: 'phone', text: '(+84) 79 721 3333', url: 'tel:0797213333' },
          { iconType: 'email', text: 'sale@ochao.vn', url: 'mailto:sale@ochao.vn' },
          { iconType: 'location', text: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM..', url: '#' }
        ],
        copyrightText: "Copyright 2026 © METIK. All rights reserved"
      },
      render: (props) => <AdminFooter {...props} />
    },

    Map: {
      label: 'Google Map',
      fields: {
        mapUrl: { type: 'text', label: 'Link nhúng (src) của Google Maps iframe' },
        height: { type: 'text', label: 'Chiều cao bản đồ (VD: 600)' },
        darkMode: {
          type: 'radio',
          label: 'Giao diện bản đồ',
          options: [
            { label: 'Sáng (Mặc định)', value: false },
            { label: 'Tối (Dark Mode)', value: true }
          ]
        }
      },
      defaultProps: {
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.567585149659!2d106.53244777511364!3d10.920430789237209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b2d6619d65c51%3A0xaa40266b17ad7191!2zQ8O0bmcgdHkgQ-G7lSBQaOG6p24gT0NIQU8!5e0!3m2!1svi!2s!4v1782180477680!5m2!1svi!2s",
        height: "600",
        darkMode: false
      },
      render: (props) => <AdminMap {...props} />
    },
    
    // ==========================================
    // 14. NUMBER COUNTER
    // ==========================================
    Counter: {
      label: 'Thống kê (Counter)',
      fields: {
        bgColor: { type: 'text', label: 'Màu nền' },
        items: {
          type: 'array',
          label: 'Các bộ đếm',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề' },
            targetNumber: { type: 'number', label: 'Con số mục tiêu (Target)' },
            suffix: { type: 'text', label: 'Hậu tố (vd: +, %)' },
            iconUrl: { type: 'text', label: 'Link Icon (Tuỳ chọn)' }
          }
        }
      },
      defaultProps: {
        bgColor: '#ffffff',
        items: [
          { title: 'Năm kinh nghiệm', targetNumber: 15, suffix: '+' },
          { title: 'Sản phẩm', targetNumber: 50, suffix: '+' },
          { title: 'Khách hàng', targetNumber: 1000, suffix: '+' },
          { title: 'Giải thưởng', targetNumber: 10, suffix: '+' }
        ]
      },
      render: (props) => <AdminCounter {...props} />
    }
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Header', 'Section', 'Footer', 'Map'] },
    { title: 'Nâng cao', components: ['Hero', 'Slider', 'ProductGrid', 'ContentBlocks', 'VideoBlock', 'Testimonials', 'Counter'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
