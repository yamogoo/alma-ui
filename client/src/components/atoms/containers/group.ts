import tokens from "@/tokens";

export type Size = keyof typeof tokens.group.default;

export const colors = Object.keys(tokens.themes.light.group);

export type Color = keyof typeof tokens.themes.light.group;
