import tokens from "@/tokens";

export type IconMode = keyof typeof tokens.themes.light.abstracts.label;
export const iconModes = Object.keys(tokens.themes.light.abstracts.label);

export type IconTone = keyof typeof tokens.themes.light.abstracts.label.neutral;
export const iconTones = Object.keys(
  tokens.themes.light.abstracts.label.neutral
);

export type IconSize = keyof typeof tokens.atoms.icon.default;
export const iconSizes = Object.keys(tokens.atoms.icon.default) as Array<
  keyof typeof tokens.atoms.icon.default
>;
