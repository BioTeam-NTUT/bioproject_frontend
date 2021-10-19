import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
    mode: "development",
    plugins: [reactRefresh(), WindiCSS()],
    server: {
        host: "127.0.0.1",
        port: 8888
    }
});
