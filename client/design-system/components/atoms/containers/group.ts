import tokens from "@/tokens";
import type {
  UIElementAlignment,
  UIElementAxisDirection,
  UIElementOrientation,
  UIElementStretch,
} from "@/typings";

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
