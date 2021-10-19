import { defineConfig } from "windicss/helpers";
import formsPlugin from "windicss/plugin/forms";

export default defineConfig({
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            minHeight: {
                "20": "5rem",
            },
            minWidth: {
                "20": "5rem",
                "24": "6rem",
                "1/2": "50%",
                "2/3": "66.666667%",
                "3/4": "75%",
            },
            animation: {
                "spin-low": "spin 20s linear infinite",
            },
        },
    },
    plugins: [formsPlugin],
});
