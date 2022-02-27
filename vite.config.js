import { defineConfig } from "vite";

export default defineConfig({
    root: "src",
    assetsInclude: ["./assets/**/*.*"],
    build: {
        emptyOutDir: true,
        outDir: "../dist"
    }
})