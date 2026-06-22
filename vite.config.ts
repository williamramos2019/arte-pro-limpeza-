import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ command }) => ({
  // Relative base on build so the site works whether it's uploaded to the
  // domain root (public_html) or any subfolder on cPanel/Apache.
  base: command === "build" ? "./" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./client/src"),
      "@shared": path.resolve(import.meta.dirname, "./shared"),
      "@assets": path.resolve(import.meta.dirname, "./attached_assets"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
  },
}));
