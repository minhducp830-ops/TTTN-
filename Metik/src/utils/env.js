/**
 * Hàm kiểm tra xem ứng dụng có đang chạy trong môi trường Admin Editor hay không.
 * Giúp tránh lặp lại logic kiểm tra URL ở nhiều component khác nhau.
 * @returns {boolean} true nếu đang ở trang /admin
 */
export const checkIsEditor = () => {
  return typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
};
