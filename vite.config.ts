import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  // server config
  server: {
    host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    cors: true,
    // https: false,
    // 代理跨域（mock 不需要配置，这里只是个事列）
    proxy: {
      "/api": {
        target: "", // 接口地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    }
  },
  // build configure
  build: {
    outDir: "dist",
    minify: "terser",
    terserOptions: {
      // delete console/debugger
      compress: {
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        // Static resource classification and packaging
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
      }
    }
  }
})

