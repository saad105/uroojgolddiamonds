import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './lib/AuthContext.jsx';
import App from './App.jsx';

// Some catalogue photos (including ones stored in the cloud database) point at Unsplash
// images that have since been deleted. Swap any broken image for a working fallback once.
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85';
window.addEventListener(
  'error',
  (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.fallbackApplied) return;
    if (img.src.includes('urooj-logo') || img.src.includes('postimg.cc')) return; // logo has its own fallback
    img.dataset.fallbackApplied = '1';
    img.src = FALLBACK_IMAGE;
  },
  true,
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
