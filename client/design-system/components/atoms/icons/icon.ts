import tokens from "@/tokens";

import { iconNames, iconStyles, iconWeights } from "@/assets/icons";

import type { UIElementVariant } from "@/typings";

export type IconName = (typeof iconNames)[number];

export type IconStyle = (typeof iconStyles)[number];

export type IconWeight = (typeof iconWeights)[number];

export type IconMode = keyof typeof tokens.themes.light.abstracts.label;
export const iconModes = Object.keys(tokens.themes.light.abstracts.label);

export type IconSize = keyof typeof tokens.atoms.icon.default;
export const iconSizes = Object.keys(tokens.atoms.icon.default) as Array<
  keyof typeof tokens.atoms.icon.default
>;

export interface IconProps {
  variant?: UIElementVariant;
  name: IconName;
  style: IconStyle;
  weight: IconWeight;
  mode?: IconMode;
  size?: IconSize;
}

export * from "@/assets/icons";
