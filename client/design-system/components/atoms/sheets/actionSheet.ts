import tokens from "@/tokens";

import type { OverlayId, UIElementUnionProps } from "@/typings";

export const actionSheetSizes = Object.keys(tokens.actionSheet);

export type ActionSheetSize = keyof typeof tokens.actionSheet.default;

export const actionSheetColors = Object.keys(tokens.themes.light.actionSheet);

export type ActionSheetColor = keyof typeof tokens.themes.light.actionSheet;

export interface ActionSheetProps extends Partial<UIElementUnionProps> {
  containerId?: OverlayId;
  color?: ActionSheetColor;
  size?: ActionSheetSize;
  isActive: boolean;
}
