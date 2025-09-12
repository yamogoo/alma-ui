import tokens from "@/tokens";

import { iconNames, iconStyles, iconWeights } from "@/assets/icons";

import type { UIElementVariant } from "@/typings";

export type IconName = (typeof iconNames)[number];

export type IconStyle = (typeof iconStyles)[number];

export type IconWeight = (typeof iconWeights)[number];

export const iconColors = Object.keys(tokens.themes.light.label);

export type IconColor = keyof typeof tokens.themes.light.label;

export const iconSizes = Object.keys(tokens.icon.default) as Array<
  keyof typeof tokens.icon.default
>;

export type IconSize = (typeof iconSizes)[number];

export interface IconProps {
  variant?: UIElementVariant;
  name: IconName;
  style: IconStyle;
  weight: IconWeight;
  color?: IconColor;
  size?: IconSize;
}

export * from "@/assets/icons";
