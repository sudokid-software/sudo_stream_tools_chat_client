import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from "path";
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(),
  {
    name: 'custom-html-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host}`)
        const paths = [
          "/chat/overlay",
          "/chat/admin",
          "/chatter",
          "/admin",
          "/admin/oauth-accounts",
        ]

        let pathname;

        if (url.pathname.endsWith('/')) {
          pathname = url.pathname.slice(0, -1)
        }
        else {
          pathname = url.pathname;
        }

        if (paths.includes(pathname)) {
          const filePath = path.resolve(__dirname, `pages/${pathname}/index.html`)
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/html')
            res.end(fs.readFileSync(filePath, 'utf-8'))
            return
          }
        }
        next()
      })
    }
  }
  ],
  server: {
    host: "localhost",
    watch: {
      usePolling: true,
    },
    fs: {
      strict: false,
    },
    // Rewrite dev URLs to index.html
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/admin/, to: '/admin/index.html' },
    //     { from: /^\/overlay/, to: '/overlay/index.html' },
    //     { from: /^\/chatter/, to: '/chatter/chatter.html' },
    //     { from: /^\/$/, to: '/index.html' },
    //   ]
    // }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "pages/index.html"),
        chat__overlay: path.resolve(__dirname, "pages/chat/overlay/index.html"),
        chat__admin: path.resolve(__dirname, "pages/chat/admin/index.html"),
        chatter: path.resolve(__dirname, "pages/chatter/index.html"),
        admin: path.resolve(__dirname, "pages/admin/index.html"),
        admin__oauth_acounts: path.resolve(__dirname, "pages/admin/oauth-accounts/index.html"),
      },
      output: {
        dir: "dist",
      }
    }
  }
})
