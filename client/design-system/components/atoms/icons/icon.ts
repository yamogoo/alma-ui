import tokens from "@/tokens";

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
] as const;

export type IconName = (typeof iconNames)[number];

export const iconStyles = ["outline", "fill"] as const;

export type IconStyle = (typeof iconStyles)[number];

export const iconWeigths = ["100", "200", "300", "400", "500"] as const;

export type IconWeight = (typeof iconWeigths)[number];

export const iconColors = Object.keys(tokens.themes.light.label);

export type IconColor = keyof typeof tokens.themes.light.label;

export const iconSizes = Object.keys(tokens.icon.default) as Array<
  keyof typeof tokens.icon.default
>;

export type IconSize = (typeof iconSizes)[number];

export interface IconProps {
  iconName: IconName;
  iconStyle: IconStyle;
  iconWidth: IconWeight;
}
