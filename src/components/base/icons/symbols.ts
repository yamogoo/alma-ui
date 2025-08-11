import type { UIElementColor, UIElementSize } from "@/typings";

export type SymbolName =
  | "back"
  | "check"
  | "cog"
  | "cross"
  | "login"
  | "logout";

export type SymbolStyle = "outline" | "fill" | "squared";

export type SymbolWeight = "100" | "200" | "300" | "400" | "500";

export type SymbolColor = Extract<
  UIElementColor,
  | "primary"
  | "primary-inversed"
  | "secondary"
  | "secondary-inversed"
  | "disabled"
  | "accent"
  | "accept"
>;

export type SymbolSize = Extract<
  UIElementSize,
  "xxxxs" | "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg"
>;

export interface IconProps {
  iconName: SymbolName;
  iconStyle: SymbolStyle;
  iconWidth: SymbolWeight;
}
