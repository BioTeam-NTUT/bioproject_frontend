import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
    mode: "development",
    plugins: [react(), WindiCSS()],
    server: {
        host: "127.0.0.1",
        port: 8888,
    },
    build: {
        sourcemap: true,
    },
});
