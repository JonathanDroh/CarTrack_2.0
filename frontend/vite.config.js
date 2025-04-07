// ============================================================================
// Fil: vite.config.js
// Beskrivning: Vite-konfiguration med React-plugin
// ============================================================================

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard Vite-konfiguration för React-projekt
export default defineConfig({
  plugins: [react()],
});
