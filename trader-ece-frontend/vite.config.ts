// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https: blob:",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self' https: wss:",
        "frame-src https:",
      ].join("; "),
    },
    proxy: {
      "/api": {
        target: "http://localhost:5060",
        changeOrigin: true,
      },
    },
  },
});