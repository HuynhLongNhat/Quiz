// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: "assets", // Tùy chọn cho thư mục chứa tài sản
  },
  server: {
    cors: true, // Cho phép CORS
  },
  optimizeDeps: {
    include: ["nprogress"], // Tối ưu hóa nprogress
  },
});
