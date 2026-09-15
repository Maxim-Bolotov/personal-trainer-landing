import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted weights we actually use in the design.
// Oxanium/Outfit were the original picks but ship with NO Cyrillic glyphs on
// Google Fonts (latin + latin-ext only), so all Russian copy silently fell
// back to the system font. Exo 2 / Golos Text are close visual matches that
// do include full Cyrillic coverage.
import '@fontsource/exo-2/700.css';
import '@fontsource/exo-2/800.css';
import '@fontsource/golos-text/400.css';
import '@fontsource/golos-text/500.css';
import '@fontsource/golos-text/600.css';

import './styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
