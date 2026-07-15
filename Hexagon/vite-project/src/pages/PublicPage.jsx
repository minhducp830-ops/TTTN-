import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Render } from '@measured/puck';
import '@measured/puck/puck.css';
import puckConfig from '../blocks/admin-puck-config';
import { getPageBySlugAndLang } from '../lib/storage';
import { LANG_KEY } from '../lib/constants';
import ScrollToTopButton from '../components/ScrollToTopButton';

const PublicPage = ({ forceLang }) => {
  const params = useParams();
  const navigate = useNavigate();

  // Determine lang: from forceLang prop, URL prefix, or localStorage
  const lang = forceLang || localStorage.getItem(LANG_KEY) || 'vi';
  const slug = params.slug || 'trang-chu';

  // Save lang to localStorage when viewing
  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const page = getPageBySlugAndLang(slug, lang);

  if (!page) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: 'linear-gradient(135deg, #f0fdf4, #f8fafc)' }}
      >
        <div className="text-7xl">🔍</div>
        <h1 className="text-4xl font-black text-gray-800">404</h1>
        <p className="text-gray-500 text-lg">
          Không tìm thấy trang <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">/{lang !== 'vi' ? `${lang}/` : ''}{slug}</code>
        </p>
        <p className="text-gray-400 text-sm">Trang chưa được xuất bản hoặc không tồn tại.</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl font-bold text-white text-sm shadow-lg"
            style={{ background: 'linear-gradient(to right, #1A6B49, #41b67d)' }}
          >
            ← Về Dashboard
          </button>
          {lang === 'en' && (
            <button
              onClick={() => navigate(`/${slug}`)}
              className="px-6 py-3 rounded-xl font-bold text-sm border-2 border-green-600 text-green-700 hover:bg-green-50"
            >
              Xem bản Tiếng Việt
            </button>
          )}
          {lang === 'vi' && (
            <button
              onClick={() => navigate(`/en/${slug}`)}
              className="px-6 py-3 rounded-xl font-bold text-sm border-2 border-blue-600 text-blue-700 hover:bg-blue-50"
            >
              View English version
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Render config={puckConfig} data={page.puckData} />
      
      <ScrollToTopButton />

      {/* Floating back button (admin only hint) */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
        <a
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm text-white shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(to right, #0D5939, #1A6B49)' }}
          title="Về Dashboard"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
          </svg>
          Admin
        </a>
      </div>
    </div>
  );
};

export default PublicPage;
