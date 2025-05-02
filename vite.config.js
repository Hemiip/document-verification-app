import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), "@tailwindcss/postcss"],
  base: process.env.VITE_BASE_PATH || "/document-verification-app",
});
