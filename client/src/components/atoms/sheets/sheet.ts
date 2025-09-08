import tokens from "@/tokens";

import type { UIElementUnionProps } from "@/typings";

export type SheetColor = keyof typeof tokens.themes.light.sheet;

export interface SheetProps extends Partial<UIElementUnionProps> {
  color?: SheetColor;
  isOpen: boolean;
  isDialog?: boolean;
}
