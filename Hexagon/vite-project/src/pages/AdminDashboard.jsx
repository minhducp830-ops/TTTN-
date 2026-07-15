import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPages, deletePage, clonePage, hasTranslation } from '../lib/storage';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [filterLang, setFilterLang] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadPages = () => setPages(getPages());

  useEffect(() => { loadPages(); }, []);

  const filtered = pages.filter((p) => {
    if (filterLang !== 'all' && p.lang !== filterLang) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (filterDate && !p.updatedAt?.includes(filterDate)) return false;
    return true;
  });

  const handleDelete = (id) => {
    deletePage(id);
    loadPages();
    setConfirmDelete(null);
  };

  const handleClone = (page) => {
    const newLang = page.lang === 'vi' ? 'en' : 'vi';
    const cloned = clonePage(page.id, newLang);
    if (cloned) {
      navigate(`/editor?id=${cloned.id}`);
    }
  };

  const handleEdit = (page) => {
    navigate(`/editor?id=${page.id}`);
  };

  const handleDuplicate = (page) => {
    const cloned = clonePage(page.id, page.lang);
    loadPages();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-2xl">Quản lý Pages</h1>
              <p className="text-gray-500 text-sm">Tạo và quản lý các trang với PUCK Visual Builder</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/editor')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Tạo Page Mới
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ngôn ngữ</label>
              <select
                value={filterLang}
                onChange={(e) => setFilterLang(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
              >
                <option value="all">Tất cả</option>
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Trạng thái</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
              >
                <option value="all">Tất cả</option>
                <option value="published">Đã xuất bản</option>
                <option value="draft">Nháp</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ngày cập nhật</label>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
              />
            </div>
            <button
              onClick={() => { setFilterLang('all'); setFilterStatus('all'); setFilterDate(''); }}
              className="px-4 py-2 rounded-lg text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Chưa có trang nào</h3>
              <p className="text-gray-400 text-sm mb-6">Bấm "Tạo Page Mới" để bắt đầu xây dựng trang web của bạn</p>
              <button
                onClick={() => navigate('/editor')}
                className="px-6 py-3 rounded-lg font-semibold text-white text-sm bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                + Tạo Page Mới
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  {['Tiêu đề', 'Slug', 'Ngôn ngữ', 'Trạng thái', 'Cập nhật', 'Thao tác'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((page) => {
                  const otherLang = page.lang === 'vi' ? 'en' : 'vi';
                  const alreadyHasTranslation = hasTranslation(page.slug, page.lang);
                  return (
                    <tr key={page.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{page.title || 'Không có tiêu đề'}</p>
                            {page.seoTitle && <p className="text-xs text-gray-400">SEO: {page.seoTitle}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">/{page.slug}</code>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                          style={page.lang === 'vi'
                            ? { background: '#fee2e2', color: '#991b1b' }
                            : { background: '#dbeafe', color: '#1e40af' }}
                        >
                          {page.lang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                          style={page.status === 'published'
                            ? { background: '#d1fae5', color: '#065f46' }
                            : { background: '#fef3c7', color: '#92400e' }}
                        >
                          {page.status === 'published' ? '✓ Đã xuất bản' : '● Nháp'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">{page.updatedAt}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {/* Translate (uses Duplicate icon) */}
                          <button
                            onClick={() => {
                              if (alreadyHasTranslation) {
                                const translated = pages.find(p => p.slug === page.slug && p.lang === otherLang);
                                if (translated) navigate(`/editor?id=${translated.id}`);
                              } else {
                                handleClone(page);
                              }
                            }}
                            title={alreadyHasTranslation ? `Xem bản dịch ${otherLang.toUpperCase()}` : `Tạo bản dịch ${otherLang.toUpperCase()}`}
                            className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          {/* Edit */}
                          <button
                            onClick={() => handleEdit(page)}
                            title="Sửa"
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => setConfirmDelete(page.id)}
                            title="Xóa"
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">{filtered.length} trang / tổng {pages.length} trang</p>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Xác nhận xóa</h3>
              <p className="text-gray-500 text-sm mt-2">Bạn có chắc muốn xóa trang này? Hành động này không thể hoàn tác.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600"
              >
                Xóa trang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
