import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base ('./') so the built site works on GitHub Pages project
// sites (https://<user>.github.io/<repo>/), user sites, and local previews
// without any config change. Routing uses HashRouter, so no server rewrites
// are needed.
export default defineConfig({
  plugins: [react()],
  base: './',
});
