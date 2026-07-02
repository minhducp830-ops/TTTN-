// Mẫu dữ liệu ban đầu nếu chưa có
const defaultData = {
  content: [],
  root: {},
};

// Dữ liệu mẫu chuẩn cho trang Giới thiệu (About)
const aboutDefaultData = {
  content: [
    {
      type: "VideoBlock",
      props: {
        bgColor: "#faf5f0",
        title: "VỀ CHÚNG TÔI",
        content: "<p>Với tinh thần “Chạm mê tít — Snap into Joy”, <b>metik</b> mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, <b>metik</b> mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.</p><p><b>metik</b> không chỉ là một sản phẩm snack. <b>metik</b> là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.</p>",
        videoUrl: "https://metik.vn/wp-content/uploads/2026/06/METIK-ChamMeTit.mp4",
        videoPoster: "",
        layout: "right",
        radiusTL: 10,
        radiusTR: 10,
        radiusBR: 10,
        radiusBL: 10,
        id: "VideoBlock-about-1"
      }
    }
  ],
  root: {}
};

/**
 * Lấy dữ liệu cấu hình Puck của trang từ localStorage.
 * @param {string} pageKey - Khóa của trang (ví dụ: 'home', 'gioi-thieu')
 * @returns {Object} Dữ liệu Puck
 */
export const getPageData = (pageKey) => {
  try {
    const saved = localStorage.getItem(`puck-data-${pageKey}`);
    const data = saved ? JSON.parse(saved) : null;
    
    // Nếu chưa có data hoặc trang đang trống trơn
    if (!data || !data.content || data.content.length === 0) {
      if (pageKey === 'about') return aboutDefaultData;
      return defaultData;
    }
    
    return data;
  } catch (error) {
    console.error(`Lỗi phân tích JSON cho ${pageKey}:`, error);
    return pageKey === 'about' ? aboutDefaultData : defaultData;
  }
};

/**
 * Lưu dữ liệu cấu hình Puck của trang vào localStorage.
 * @param {string} pageKey - Khóa của trang
 * @param {Object} data - Dữ liệu cần lưu
 */
export const savePageData = (pageKey, data) => {
  localStorage.setItem(`puck-data-${pageKey}`, JSON.stringify(data));
};
