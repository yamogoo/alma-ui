import tokens from "@/tokens";

import type {
  UIElementAlignment,
  UIElementOrientation,
  UIElementTypographyTag,
  UIElementVariant,
} from "@/typings";

export type DividerVariant = UIElementVariant;

export type DividerSize = keyof typeof tokens.divider.default;

export type DividerColor = keyof typeof tokens.themes.light.divider;

export type DividerAlign = UIElementAlignment;

export interface DividerProps {
  as?: UIElementTypographyTag;
  variant?: DividerVariant;
  size?: DividerSize;
  color?: DividerColor;
  orientation?: UIElementOrientation;
  align?: DividerAlign;
}
