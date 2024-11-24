import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias for the "src" directory
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Add additionalData for global SCSS imports
        additionalData: `@import "src/styling/global.scss";`,
      },
    },
  },
  server: {
    port: 3033, // Server running on port 3033
  },
});
