import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Only define NODE_ENV in production builds
    define: isProduction
      ? {
          "process.env.NODE_ENV": JSON.stringify("production"),
        }
      : undefined,
    build: {
      lib: {
        entry: "src/widget.jsx",
        name: "MyWidget",
        fileName: "widget",
        formats: ["iife"],
      },
      outDir: "dist",
      // Disable cssCodeSplit for library builds to prevent HMR issues
      cssCodeSplit: true,
      // Add minification only for production
      minify: isProduction,
      // Ensure proper source maps for development
      sourcemap: !isProduction,
    },
    // Configure server for development
    server: {
      hmr: {
        // Ensure HMR works properly with IIFE format
        overlay: true,
      },
    },
  };
});
