import tokens from "@/tokens";

import type { OverlayId, UIElementUnionProps } from "@/typings";

export const actionSheetSizes = Object.keys(tokens.atoms.actionSheet);

export type ActionSheetSize = keyof typeof tokens.atoms.actionSheet.default;

export type ActionSheetMode =
  keyof typeof tokens.themes.light.atoms.actionSheet;
export const actionSheetModes = Object.keys(
  tokens.themes.light.atoms.actionSheet
);

export interface ActionSheetProps extends Partial<UIElementUnionProps> {
  containerId?: OverlayId;
  size?: ActionSheetSize;
  mode?: ActionSheetMode;
  isActive: boolean;
}
