import tokens from "@/tokens";

export type TextVariant = keyof typeof tokens.typography.styles;
export const textVariants = Object.keys(
  tokens.typography.styles
) as TextVariant[];

export type TextMode = keyof typeof tokens.themes.light.abstracts.label;
export const textModes = Object.keys(
  tokens.themes.light.abstracts.label
) as TextMode[];
