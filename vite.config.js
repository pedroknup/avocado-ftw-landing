import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssCodeSplit: true, // Enable CSS code splitting
    fileName: (format, entryName) =>
      entryName === 'index' ? `index.${format}.css` : `${entryName}.css`,
  },
});
