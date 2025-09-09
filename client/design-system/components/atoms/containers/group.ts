import tokens from "@/tokens";

export type GroupSize = keyof typeof tokens.group.default;

export const groupColors = Object.keys(tokens.themes.light.group);

export type GroupColor = keyof typeof tokens.themes.light.group;
