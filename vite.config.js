import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true, 
    hmr: {
      port: 5173,
    },
    cors: {
      origin: /chrome-extension:\/\/.+/,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    },
  },
  // ADD THIS LEGACY BLOCK HERE
  legacy: {
    skipWebSocketTokenCheck: true,
  },
  plugins: [react(), crx({ manifest }), tailwindcss()],
});