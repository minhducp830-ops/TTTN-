// Background types
export const BACKGROUND_TYPES = [
  { value: 'color', label: 'Màu sắc' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'image', label: 'Hình ảnh' },
  { value: 'image+gradient', label: 'Hình ảnh & Gradient' },
  { value: 'image+color', label: 'Hình ảnh & Màu sắc' },
];

// Gradient directions
export const GRADIENT_DIRECTIONS = [
  { value: 'to right', label: 'Trái → Phải' },
  { value: 'to left', label: 'Phải → Trái' },
  { value: 'to bottom', label: 'Trên → Dưới' },
  { value: 'to bottom right', label: 'Góc trên-trái → dưới-phải' },
  { value: 'to bottom left', label: 'Góc trên-phải → dưới-trái' },
];

// Languages
export const LANGUAGES = [
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'en', label: 'English' },
];

// Page statuses
export const PAGE_STATUSES = [
  { value: 'published', label: 'Đã xuất bản' },
  { value: 'draft', label: 'Nháp' },
];

// LocalStorage key
export const STORAGE_KEY = 'hexagon_pages';
export const LANG_KEY = 'hhc_lang';
