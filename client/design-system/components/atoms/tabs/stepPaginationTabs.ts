import tokens from "@/tokens";

import type { UIElementUnionProps } from "@/typings";

export type StepPaginationTabSize =
  keyof typeof tokens.atoms.stepPaginationTabs.default;

export type StepPaginationTabMode =
  keyof typeof tokens.themes.light.atoms.stepPaginationTabs;

export interface StepPaginationTabItem {
  id: number;
  label: string;
}

export interface StepPaginationTabsProps extends Partial<UIElementUnionProps> {
  items: StepPaginationTabItem[];
  selectedItemId?: number;
  size?: StepPaginationTabSize;
  mode?: StepPaginationTabMode;
}
