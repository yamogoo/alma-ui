import type tokens from "@/tokens";

import type { UIElementColor } from "@/typings";

export type Size = keyof typeof tokens.group;

export const colors: Array<Extract<UIElementColor, "primary" | "secondary">> = [
  "primary",
  "secondary",
];

export type Color = (typeof colors)[number];
