import tokens from "@/tokens";

import type { UIElementOrientation, UIElementVariant } from "@/typings";

export type DividerVariant = UIElementVariant;

export type DividerSize = keyof typeof tokens.divider.default;

export type DividerColor = keyof typeof tokens.themes.light.divider;

export interface DividerProps {
  variant?: DividerVariant;
  size?: DividerSize;
  color?: DividerColor;
  orientation?: UIElementOrientation;
}
