import tokens from "@/tokens";

import type { UIElementColor } from "@/typings";

export type IconName =
  | "back"
  | "check"
  | "down"
  | "cog"
  | "cross"
  | "login"
  | "logout"
  | "eye"
  | "eyeDisabled";

export type IconStyle = "outline" | "fill";

export type IconWeight = "100" | "200" | "300" | "400" | "500";

export type IconColor = Extract<
  UIElementColor,
  | "primary"
  | "primary-inversed"
  | "secondary"
  | "secondary-inversed"
  | "disabled"
  | "accent"
  | "accept"
>;

export type IconSize = keyof typeof tokens.icon;

export interface IconProps {
  iconName: IconName;
  iconStyle: IconStyle;
  iconWidth: IconWeight;
}
