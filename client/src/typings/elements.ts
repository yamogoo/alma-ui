export type UIElementColor =
  | "primary"
  | "primary-inversed"
  | "primary-transparent"
  | "secondary"
  | "secondary-inversed"
  | "secondary-transparent"
  | "tertiary"
  | "transparent"
  | "transclucent"
  | "transclucent-inversed"
  | "accent"
  | "accent-secondary"
  | "accept"
  | "disabled"
  | "warning"
  | "error"
  | "info";

export type UIElementSize =
  | "xxxs"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl";

export type UISVGElementStrokeLineCap = "round" | "butt" | "square" | "inherit";

export type UIElementCircularDirection = "cw" | "ccw";

export type UIElementDirection = "ltr" | "rtl";

export type UIElementAxisDirection = "forward" | "backward";

export type UIElementPosition = "left" | "top" | "bottom" | "right";

export type UIElementOrientation = "horizontal" | "vertical";

export type UIElementAlignment = "start" | "center" | "end";

export type IUIElementItemID<T = string> = {
  id: T;
};

export type UIElementSID<T = string | null | undefined> = T;
