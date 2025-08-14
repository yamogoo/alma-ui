import { defineConfig, loadEnv } from "vite";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import path from "path";

import vue from "@vitejs/plugin-vue";

import svgLoader from "vite-svg-loader";
import babel from "vite-plugin-babel";
import packageJson from "./package.json";
import vueRouter from "unplugin-vue-router/vite";

import ColorsGeneratorPlugin from "./plugins/vite-plugin-colors-generator";
import { TokensParserPlugin } from "./plugins/vite-plugin-tokens-parser";

import VueRouterPlugin from "unplugin-vue-router/vite";

export default (opts: { mode: string }) => {
  const { mode } = opts;
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const port = parseInt(process.env.VITE_CLIENT_PORT ?? "3000");
  const AUTH_API_PORT = parseInt(process.env.VITE_AUTH_API_PORT ?? "3001");

  return defineConfig({
    server: {
      host: process.env.VITE_CLIENT_HOST,
      port: port,
      proxy: {
        "/api": {
          target: `http://localhost:${AUTH_API_PORT}`,
          changeOrigin: true,
        },
      },
    },
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
      "import.meta.env.VITE_APP_NAME": JSON.stringify(packageJson.name),
      "import.meta.env.VITE_APP_VERSION": JSON.stringify(packageJson.version),
      "import.meta.env.VITE_APP_AUTHOR_NAME": JSON.stringify(
        packageJson.author.name
      ),
      "import.meta.env.APP_AUTHOR_FULL_NAME": JSON.stringify(
        packageJson.author.fullName
      ),
      "import.meta.env.APP_AUTHOR_EMAIL": JSON.stringify(
        packageJson.author.email
      ),
      "import.meta.env.APP_AUTHOR_URL": JSON.stringify(packageJson.author.url),
    },
    plugins: [
      babel(),
      vue(),
      vueRouter(),
      VueRouterPlugin({
        dts: true,
      }),
      svgLoader(),
      ColorsGeneratorPlugin({
        source: "./src/tokens/baseColors.json",
        outDir: "./src/tokens/colors.json",
        step: 40,
      }),
      TokensParserPlugin({
        source: "./src/tokens",
        outDir: "./src/assets/scss/abstracts",
        build: "./src/tokens/build",
        entryFilePath: "./src/tokens/index.ts",
        mapOptions: { convertCase: true, includeFileName: false },
      }),
    ],
    optimizeDeps: {
      include: ["@vue/babel-plugin-jsx"],
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
    },
    build: {
      cssCodeSplit: true,
      minify: "terser",
      sourcemap: false,
      chunkSizeWarningLimit: 1024,
      outDir: path.resolve(__dirname, "dist/client"),
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"),
        output: {},
      },
    },
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@@": fileURLToPath(new URL("./landing-src", import.meta.url)),
      },
    },
    css: {
      modules: {
        generateScopedName: "[hash:base64:5]",
        scopeBehaviour: "local",
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `
            @use "@/assets/scss/app.colors" as colors;
            @use "@/assets/scss/app.abstracts" as *;
            @use "@/assets/scss/app.core" as *;
            @use "@/assets/scss/app.mixins" as *;
            @use "@/assets/scss/app.extends" as *;
          `,
        },
      },
    },
  });
};
