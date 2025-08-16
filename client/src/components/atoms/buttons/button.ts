import type { UIElementColor } from "@/typings";

import tokens from "@/tokens";

export const colors: Array<UIElementColor> = [
  "primary",
  "primary-inversed",
  "secondary",
  "accent",
  "error",
  "transparent",
];

export type Variant = keyof typeof tokens.button;

export const variants = Object.keys(tokens.button) as Array<Variant>;

export type Size = keyof typeof tokens.button.rounded;

export type Color = (typeof colors)[number];

export const sizes = Object.keys(tokens.button.default) as Array<Size>;
