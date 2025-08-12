import type { UIElementColor, UIElementSize } from "@/typings";

export type IconName =
  | "back"
  | "check"
  | "down"
  | "cog"
  | "cross"
  | "login"
  | "logout";

export type IconStyle = "outline" | "fill" | "squared";

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

export type IconSize = Extract<
  UIElementSize,
  "xxxxs" | "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg"
>;

export interface IconProps {
  iconName: IconName;
  iconStyle: IconStyle;
  iconWidth: IconWeight;
}
