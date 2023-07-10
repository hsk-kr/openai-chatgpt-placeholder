import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        content: "./src/content/content.ts",
      },
      output: {
        entryFileNames: `assets/[name].js`,
      },
    },
  },
});
