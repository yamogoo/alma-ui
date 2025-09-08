export type UIElementColor =
  | `${"primary" | "secondary"}${"" | "-inversed" | "-transparental"}`
  | `${"transclucent"}${"" | "-inversed"}`
  | `${"tertiary"}${"" | "-inversed"}`
  | "transparental"
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

export type UIElementStretch = "fill" | "auto";

export type UIElementItemID<T = string> = {
  id: T;
};

export type UIElementVariant = "default";

export type UIElementSID<T = string | null | undefined> = T;

export type UIElementContentKey = string | number | Symbol;

export type UIElementTypographyTitleTag = `h${1 | 2 | 3 | 4 | 5 | 6}`;

export type UIElementTypographyParagraphTag = "p" | "span";

export type UIElementTypographyLinkTag = "a";

export type UIElementTypographyTag =
  | UIElementTypographyTitleTag
  | UIElementTypographyParagraphTag
  | UIElementTypographyLinkTag;

export interface UIElementUnionProps<V = UIElementVariant> {
  variant?: V;
}
