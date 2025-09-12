import tokens from "@/tokens";

import type {
  UIElementAlignment,
  UIElementOrientation,
  UIElementTypographyTag,
  UIElementVariant,
} from "@/typings";

export type DividerVariant = UIElementVariant;
export const dividerVariants = Object.keys(
  tokens.atoms.divider
) as DividerVariant[];

export type DividerSize = keyof typeof tokens.atoms.divider.default;
export const dividerSizes = Object.keys(
  tokens.atoms.divider.default
) as DividerSize[];

export type DividerMode = keyof typeof tokens.themes.light.atoms.divider;
export const dividerModes = Object.keys(
  tokens.themes.light.atoms.divider
) as DividerMode[];

export type DividerAlign = UIElementAlignment;

export interface DividerProps {
  as?: UIElementTypographyTag;
  variant?: DividerVariant;
  size?: DividerSize;
  mode?: DividerMode;
  orientation?: UIElementOrientation;
  align?: DividerAlign;
}
