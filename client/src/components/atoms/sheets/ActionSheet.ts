import tokens from "@/tokens";

import type { OverlayId, UIElementUnionProps } from "@/typings";

export const sizes = Object.keys(tokens.actionSheet);

export type Size = keyof typeof tokens.actionSheet.default;

export const colors = Object.keys(tokens.themes.light.actionSheet);

export type Color = keyof typeof tokens.themes.light.actionSheet;

export interface Props extends Partial<UIElementUnionProps> {
  containerId?: OverlayId;
  color?: Color;
  size?: Size;
  isActive: boolean;
}
