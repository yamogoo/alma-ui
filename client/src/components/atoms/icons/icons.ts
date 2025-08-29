import tokens from "@/tokens";

import type { UIElementColor } from "@/typings";

export const iconNames = [
  "cross",
  "back",
  "check",
  "down",
  "cog",
  "login",
  "logout",
  "eye",
  "eyeDisabled",
];

export type IconName = (typeof iconNames)[number];

export const iconStyles = ["outline", "fill"];

export type IconStyle = (typeof iconStyles)[number];

export const iconWeigths = ["100", "200", "300", "400", "500"];

export type IconWeight = (typeof iconWeigths)[number];

export const iconColors: Array<UIElementColor> = [
  "primary",
  "primary-inversed",
  "secondary",
  "secondary-inversed",
  "disabled",
  "accent",
  "accent",
];

export type IconColor = (typeof iconColors)[number];

export const iconSizes = Object.keys(tokens.icon.default) as Array<
  keyof typeof tokens.icon.default
>;

export type IconSize = (typeof iconSizes)[number];

export interface IconProps {
  iconName: IconName;
  iconStyle: IconStyle;
  iconWidth: IconWeight;
}
