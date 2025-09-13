import tokens from "@/tokens";

import type {
  UIElementAlignment,
  UIElementAxisDirection,
  UIElementOrientation,
  UIElementStretch,
} from "@/typings";

export type GroupOrientation = UIElementOrientation;
export type GroupDirection = UIElementAxisDirection;
export type GroupAlignment = UIElementAlignment;
export type GroupStretch = UIElementStretch;
export type GroupAsTag = keyof HTMLElementTagNameMap;

export type GroupVariant = keyof typeof tokens.atoms.group;
export const groupVariants = Object.keys(tokens.atoms.group) as GroupVariant[];

export type GroupSize = keyof typeof tokens.atoms.group.default;
export const groupSizes = Object.keys(
  tokens.atoms.group.default
) as GroupSize[];

export type GroupMode = keyof typeof tokens.themes.light.atoms.group;
export const groupModes = Object.keys(
  tokens.themes.light.atoms.group
) as GroupMode[];

export interface GroupProps {
  variant?: GroupVariant;
  size?: GroupSize;
  mode?: GroupMode;
  orientation?: GroupOrientation;
  direction?: GroupDirection;
  verticalAlignment?: GroupAlignment;
  horizontalAlignment?: GroupAlignment;
  stretch?: GroupStretch;
  wrap?: boolean;
  gapX?: string;
  gapY?: string;
  divider?: boolean;
  as?: GroupAsTag;
  role?: string;
  ariaLabel?: string;
}
