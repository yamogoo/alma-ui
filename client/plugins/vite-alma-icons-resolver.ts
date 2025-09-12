// Portions of this file were developed with the assistance of AI tools (ChatGPT).

import { Plugin } from "vite";

import {
  AlmaIconsResolver,
  AlmaIconsResolverOptions,
} from "./AlmaIconsResolver";

export function AlmaIconsPlugin(options: AlmaIconsResolverOptions): Plugin {
  return {
    name: "vite:alma-icons-resolver",
    buildStart() {
      const resolver = new AlmaIconsResolver(options);
      resolver.generate();
    },
  };
}
