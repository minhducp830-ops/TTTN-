import { STORAGE_KEY } from './constants';

// Generate a simple UUID
const uuid = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Read all pages from localStorage
export const getPages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Save pages array back to localStorage
const _saveAll = (pages) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
};

// Save or update a single page — trả về page đã được lưu (kể cả ID mới)
export const savePage = (page) => {
  const pages = getPages();
  let savedPage;
  if (page.id) {
    const idx = pages.findIndex((p) => p.id === page.id);
    if (idx >= 0) {
      pages[idx] = { ...pages[idx], ...page, updatedAt: new Date().toLocaleDateString('vi-VN') };
      savedPage = pages[idx];
    } else {
      savedPage = { ...page, updatedAt: new Date().toLocaleDateString('vi-VN') };
      pages.push(savedPage);
    }
  } else {
    // Trang mới: tạo UUID mới
    savedPage = {
      ...page,
      id: uuid(),
      updatedAt: new Date().toLocaleDateString('vi-VN'),
    };
    pages.push(savedPage);
  }
  _saveAll(pages);
  return savedPage; // trả về để caller có thể lấy ID mới
};

// Delete a page by id
export const deletePage = (id) => {
  const pages = getPages().filter((p) => p.id !== id);
  _saveAll(pages);
};

// Clone a page to a new language
export const clonePage = (id, newLang) => {
  const pages = getPages();
  const original = pages.find((p) => p.id === id);
  if (!original) return null;
  const cloned = {
    ...original,
    id: uuid(),
    lang: newLang,
    status: 'draft',
    updatedAt: new Date().toLocaleDateString('vi-VN'),
    title: original.title + (newLang === 'en' ? ' (EN)' : ' (VI)'),
  };
  pages.push(cloned);
  _saveAll(pages);
  return cloned;
};

// Get a page by slug and language
export const getPageBySlugAndLang = (slug, lang) => {
  return getPages().find((p) => p.slug === slug && p.lang === lang && p.status === 'published') || null;
};

// Check if translation exists for a page
export const hasTranslation = (slug, currentLang) => {
  const otherLang = currentLang === 'vi' ? 'en' : 'vi';
  return getPages().some((p) => p.slug === slug && p.lang === otherLang);
};

export const initSeedData = (seedPages) => {
  const existing = getPages();
  const isSeeded = localStorage.getItem('hexagon_seeded');
  if (!isSeeded) {
    if (existing.length === 0) {
      _saveAll(seedPages);
    }
    localStorage.setItem('hexagon_seeded', 'true');
  }
};
