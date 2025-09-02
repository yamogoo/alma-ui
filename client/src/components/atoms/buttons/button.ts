import tokens from "@/tokens";

export type Variant = keyof typeof tokens.button;

export const variants = Object.keys(tokens.button) as Array<Variant>;

export type Size = keyof typeof tokens.button.default;

export const colors = Object.keys(tokens.themes.light.button) as Array<Variant>;

export type Color = keyof typeof tokens.themes.light.button;

export const sizes = Object.keys(tokens.button.default) as Array<Size>;
