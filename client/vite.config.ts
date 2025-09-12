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
import { VitePluginTokenLinter } from "./plugins/vite-plugin-token-linter.ts";
import { FlattenTokensParserPlugin } from "./plugins/vite-plugin-flatten-tokens-parser";
import { JSONBuilderPlugin } from "./plugins/vite-plugin-json-builder";
import { AlmaIconsPlugin } from "./plugins/vite-alma-icons-resolver";

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
      fs: {
        allow: ["../.."],
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
      // Design System: AlmaIcons
      AlmaIconsPlugin({
        source: "./design-system/assets/icons",
        entryFilePath: "./design-system/assets/icons/index.ts",
      }),
      // Deign System: Tokens and SCSS generation
      ColorsGeneratorPlugin({
        source: "./design-system/tokens/src/baseColors.json",
        outDir: "./design-system/tokens/src/colors.json",
        step: 40,
      }),
      TokensParserPlugin({
        source: "./design-system/tokens/.cache",
        outDir: "./design-system/assets/scss/abstracts",
        build: "./design-system/tokens/build",
        entryFilePath: "./design-system/tokens/index.ts",
        paths: ["./design-system/tokens", "./design-system/tokens/.cache"],
        mapOptions: { convertCase: true, includeFileName: false },
        builder: {
          format: "json",
          paths: ["./design-system/tokens/src"],
          includeRootDirName: false,
        },
        useReflectOriginalStructure: false,
      }),
      VitePluginTokenLinter({
        source: "./design-system/tokens/src",
      }),
      FlattenTokensParserPlugin({
        source: "./design-system/tokens/build",
        outDir: "./design-system/tokens/figma",
      }),
      // Application: Tokens and SCSS generation
      TokensParserPlugin({
        source: "./src/tokens/.cache",
        outDir: "./src/assets/scss/abstracts",
        build: "./src/tokens/build",
        entryFilePath: "./src/tokens/index.ts",
        paths: ["./src/tokens", "./design-system/tokens/.cache"],
        mapOptions: { convertCase: true, includeFileName: false },
        builder: {
          format: "json",
          paths: ["./src/tokens/src"],
          includeRootDirName: false,
        },
        useReflectOriginalStructure: true,
      }),
      // Generate locales JSON from directory structure
      JSONBuilderPlugin({
        format: "json",
        paths: ["./src/locales/src"],
        outDir: "./src/locales/build",
        entryFilePath: "./src/locales/index.ts",
        includeRootDirName: true,
        includeRootNames: true,
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
        external: [],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./design-system"),
        "~": fileURLToPath(new URL("./", import.meta.url)),
        // "@": fileURLToPath(new URL("./design-system", import.meta.url)),
        "@@": fileURLToPath(new URL("./src", import.meta.url)),
        "@lp": fileURLToPath(new URL("./landing-src", import.meta.url)),
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
            /* * * Design System * * */
            @use "@/assets/scss/app.colors" as colors;
            @use "@/assets/scss/app.abstracts" as *;
            @use "@/assets/scss/app.core" as *;
            @use "@/assets/scss/app.mixins" as *;
            @use "@/assets/scss/app.extends" as *;

            /* * * App * * */
            @use "@@/assets/scss/app.abstracts" as app;
          `,
        },
      },
    },
  });
};
