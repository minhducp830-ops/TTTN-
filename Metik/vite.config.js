import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Quan trọng: Cho phép React Router xử lý tất cả routes
    // Khi F5 hoặc truy cập thẳng URL /san-pham/... sẽ không bị 404
    historyApiFallback: true,
  },
});
