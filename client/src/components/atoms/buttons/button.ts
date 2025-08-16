import type { UIElementColor } from "@/typings";

import tokens from "@/tokens";

export const colors = [
  "primary",
  "primary-inversed",
  "secondary",
  "accent",
  "error",
  "transparent",
] as const;

export type Variant = keyof typeof tokens.button;

export const variants = Object.keys(tokens.button) as Array<Variant>;

export type Size = keyof typeof tokens.button.rounded;

export type Color = Extract<(typeof colors)[number], UIElementColor>;

export const sizes = Object.keys(tokens.button.default) as Array<Size>;
