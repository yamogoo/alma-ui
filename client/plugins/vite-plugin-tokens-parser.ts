import { Plugin } from "vite";
import chokidar from "chokidar";

import { TokensParser, type TokensParserOptions } from "./TokensParser";

interface ViteTokensPluginOptions extends TokensParserOptions {}

export function TokensParserPlugin(options: ViteTokensPluginOptions): Plugin {
  let resolvedConfig: any;

  return {
    name: "vite-plugin-tokens-parser",
    enforce: "pre",

    configResolved(config) {
      resolvedConfig = config;
    },

    buildStart() {
      new TokensParser(options);
    },

    configureServer(server) {
      const watcher = chokidar.watch(`${options.source}/**/*.json`, {
        ignoreInitial: true,
      });

      watcher.on("change", async (file) => {
        console.log(`[tokens-parser] 🔁 File changed: ${file}`);

        new TokensParser(options);

        const virtualModule = options.entryFilePath ?? "tokens";
        const mod = server.moduleGraph.getModuleById(virtualModule);

        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({
            type: "update",
            updates: [
              {
                type: "js-update",
                path: virtualModule,
                acceptedPath: virtualModule,
                timestamp: Date.now(),
              },
            ],
          });
          console.log(`[tokens-parser] 🔁 HMR triggered for ${virtualModule}`);
        } else {
          console.warn(
            `[tokens-parser] ⚠️ Could not find module ${virtualModule} in Vite graph`
          );
        }
      });
    },
  };
}
