import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import puckConfig from '../blocks/admin-puck-config';
import { getPages, savePage } from '../lib/storage';

const defaultData = { content: [], root: {} };

const generateSlug = (title) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const EditorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('id');

  const [pageData, setPageData] = useState(defaultData);
  const [meta, setMeta] = useState({
    title: '',
    slug: '',
    seoTitle: '',
    lang: 'vi',
    status: 'draft',
    id: null,
  });
  const [showMeta, setShowMeta] = useState(false);
  const [saved, setSaved] = useState(false);

  // BUG FIX 1: Thêm loading state để không render Puck trước khi data được tải
  // Puck chỉ đọc prop `data` 1 lần khi mount, nếu mount với data rỗng thì
  // gọi setPageData sau đó Puck cũng không cập nhật.
  const [loading, setLoading] = useState(!!pageId);

  // Load existing page if editing
  useEffect(() => {
    if (pageId) {
      const pages = getPages();
      const found = pages.find((p) => p.id === pageId);
      if (found) {
        setMeta({
          title: found.title || '',
          slug: found.slug || '',
          seoTitle: found.seoTitle || '',
          lang: found.lang || 'vi',
          status: found.status || 'draft',
          id: found.id,
        });
        setPageData(found.puckData || defaultData);
      }
      // Dù tìm thấy hay không, đã xong việc load → tắt loading
      setLoading(false);
    }
  }, [pageId]);

  // Auto-generate slug from title
  const handleTitleChange = (val) => {
    setMeta((m) => ({
      ...m,
      title: val,
      slug: m.slug || generateSlug(val),
    }));
  };

  const doSave = (puckData, status) => {
    const page = {
      id: meta.id,
      title: meta.title || 'Trang không có tiêu đề',
      slug: meta.slug || generateSlug(meta.title) || `trang-${Date.now()}`,
      seoTitle: meta.seoTitle,
      lang: meta.lang,
      status,
      puckData,
    };
    const saved = savePage(page);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    // BUG FIX 2: Cập nhật meta.id sau khi trang mới được tạo lần đầu
    // savePage trả về page đã có ID (kể cả trang mới vừa được gán UUID)
    if (!meta.id && saved?.id) {
      setMeta((m) => ({ ...m, id: saved.id }));
    }

    return saved;
  };

  const handlePublish = (puckData) => {
    doSave(puckData, 'published');
    navigate('/');
  };

  const handleSaveDraft = (puckData) => {
    doSave(puckData, 'draft');
  };

  // Màn hình loading khi đang tải dữ liệu trang cũ
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 100%)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-medium">Đang tải trang...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 z-50 flex-shrink-0"
        style={{ background: 'linear-gradient(to right, #0D5939, #1A6B49)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </button>
          <span className="text-white/30">|</span>
          <span className="text-white font-semibold text-sm truncate max-w-[200px]">
            {meta.title || 'Page mới'}
          </span>
          {/* Lang badge */}
          <span
            className="px-2 py-0.5 rounded text-xs font-bold"
            style={meta.lang === 'vi' ? { background: '#fef2f2', color: '#991b1b' } : { background: '#eff6ff', color: '#1e40af' }}
          >
            {meta.lang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-green-300 text-xs flex items-center gap-1 animate-pulse">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Đã lưu
            </span>
          )}
          <button
            onClick={() => setShowMeta(!showMeta)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cài đặt trang
          </button>
        </div>
      </div>

      {/* Meta settings modal */}
      {showMeta && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Cài đặt trang</h2>
              <button onClick={() => setShowMeta(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tiêu đề trang *</label>
                <input
                  type="text"
                  value={meta.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="VD: Trang chủ"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL) *</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">/</span>
                  <input
                    type="text"
                    value={meta.slug}
                    onChange={(e) => setMeta((m) => ({ ...m, slug: e.target.value }))}
                    placeholder="trang-chu"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  value={meta.seoTitle}
                  onChange={(e) => setMeta((m) => ({ ...m, seoTitle: e.target.value }))}
                  placeholder="Tiêu đề SEO (nếu khác tiêu đề trang)"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ngôn ngữ *</label>
                <select
                  value={meta.lang}
                  onChange={(e) => setMeta((m) => ({ ...m, lang: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                >
                  <option value="vi">🇻🇳 Tiếng Việt</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowMeta(false)}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Xong
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Puck Editor */}
      {/* BUG FIX 1: key={pageId || 'new'} đảm bảo Puck re-mount đúng data
          khi chuyển giữa các trang khác nhau hoặc khi load trang cũ */}
      <div className="flex-1 overflow-hidden">
        <Puck
          key={pageId || 'new'}
          config={puckConfig}
          data={pageData}
          onPublish={handlePublish}
          onChange={(data) => setPageData(data)}
          overrides={{
            headerActions: ({ children }) => (
              <>
                {children}
                <button
                  onClick={() => handleSaveDraft(pageData)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white mr-2"
                >
                  Lưu nháp
                </button>
              </>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
