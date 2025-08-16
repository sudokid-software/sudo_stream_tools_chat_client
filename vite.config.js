import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    host: "localhost",
    watch: {
      usePolling: true,
    },
    fs: {
      strict: false,
    },
    // Rewrite dev URLs to index.html
    historyApiFallback: {
      rewrites: [
        { from: /^\/admin/, to: '/index.html' },
        { from: /^\/overlay/, to: '/index.html' },
      ]
    }
  },
  build: {
    rollupOptions: {
      input: {
        admin: path.resolve(__dirname, "public/admin.html"),
        overlay: path.resolve(__dirname, "public/overlay.html")
      },
      output: {
        dir: "dist",
      }
    }
  }
})
