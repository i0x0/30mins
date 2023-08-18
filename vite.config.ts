import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Build Chrome Extension
    //@ts-expect-error
    crx({ manifest }),
  ],
  build: {
    // dont minify the code
    minify: false,
  },
  resolve: {
    alias: {
      "@src": "/src",
      "@utils": "/src/utils",
      "@backgroundScripts": "/src/backgroundScripts",
    },
  },
});
