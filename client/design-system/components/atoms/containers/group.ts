import tokens from "@/tokens";
import type {
  UIElementAlignment,
  UIElementAxisDirection,
  UIElementOrientation,
  UIElementStretch,
  UIElementVariant,
} from "@/typings";

export type GroupSize = keyof typeof tokens.group.default;

export const groupSizes = Object.keys(tokens.group.default) as GroupSize[];

export type GroupMode = keyof typeof tokens.themes.light.group;

export const groupModes = Object.keys(tokens.themes.light.group) as GroupMode[];

export interface GroupProps {
  variant?: UIElementVariant;
  size?: GroupSize;
  mode?: GroupMode;
  orientation?: UIElementOrientation;
  direction?: UIElementAxisDirection;
  verticalAlignment?: UIElementAlignment;
  horizontalAlignment?: UIElementAlignment;
  stretch?: UIElementStretch;
  wrap?: boolean;
  gapX?: string;
  gapY?: string;
  divider?: boolean;
  as?: keyof HTMLElementTagNameMap;
  role?: string;
  ariaLabel?: string;
}
