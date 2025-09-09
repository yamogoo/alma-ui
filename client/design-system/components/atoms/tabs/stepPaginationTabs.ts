import tokens from "@/tokens";

import type { UIElementUnionProps } from "@/typings";

export type StepPaginationTabSize =
  keyof typeof tokens.stepPaginationTabs.default;

export type StepPaginationTabColor =
  keyof typeof tokens.themes.light.stepPaginationTabs;

export interface StepPaginationTabItem {
  id: number;
  label: string;
}

export interface StepPaginationTabsProps extends Partial<UIElementUnionProps> {
  items: StepPaginationTabItem[];
  selectedItemId?: number;
  size?: StepPaginationTabSize;
  color?: StepPaginationTabColor;
}
