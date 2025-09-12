import tokens from "@/tokens";

import type { UIElementUnionProps } from "@/typings";

export type DropdownVariant = keyof typeof tokens.dropDown;
export const dropdownVariants = Object.keys(
  tokens.dropDown
) as DropdownVariant[];

export type DropdownSize = keyof typeof tokens.dropDown.default;
export const dropdownSizes = Object.keys(
  tokens.dropDown.default
) as DropdownSize[];

export type DropdownMode = keyof typeof tokens.themes.light.dropDown;
export const dropdownModes = Object.keys(
  tokens.themes.light.dropDown
) as DropdownMode[];

export interface DropdownProps extends Partial<UIElementUnionProps> {
  variant?: DropdownVariant;
  size?: DropdownSize;
  mode?: DropdownMode;
  value: string;
  valuePostfix?: string;
  isResetButtonShown?: boolean;
  closeOnOptionClick?: boolean;
}
