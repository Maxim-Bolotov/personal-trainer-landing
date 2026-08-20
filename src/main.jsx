import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted variable-ish weights we actually use in the design
import '@fontsource/oxanium/700.css';
import '@fontsource/oxanium/800.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';

import './styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
