import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"), 
    },
  },
});