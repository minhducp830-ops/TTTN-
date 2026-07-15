import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import EditorPage from './pages/EditorPage';
import PublicPage from './pages/PublicPage';
import { initSeedData } from './lib/storage';
import { SEED_PAGES } from './lib/seedData';

function App() {
  // Load seed data on first launch
  useEffect(() => {
    initSeedData(SEED_PAGES);
  }, []);

  return (
    <Routes>
      {/* Admin Dashboard */}
      <Route path="/" element={<AdminDashboard />} />

      {/* Puck Editor */}
      <Route path="/editor" element={<EditorPage />} />

      {/* Public pages — Vietnamese (default) */}
      <Route path="/:slug" element={<PublicPage />} />

      {/* Public pages — English */}
      <Route path="/en/:slug" element={<PublicPage forceLang="en" />} />
    </Routes>
  );
}

export default App;
