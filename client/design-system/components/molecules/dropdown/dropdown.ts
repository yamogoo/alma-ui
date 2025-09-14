import tokens from "@/tokens";

import type { UIElementUnionProps } from "@/typings";

export type DropdownVariant = keyof typeof tokens.molecules.dropdown;
export const dropdownVariants = Object.keys(
  tokens.molecules.dropdown
) as DropdownVariant[];

export type DropdownSize = keyof typeof tokens.molecules.dropdown.default;
export const dropdownSizes = Object.keys(
  tokens.molecules.dropdown.default
) as DropdownSize[];

export type DropdownMode = keyof typeof tokens.themes.light.molecules.dropdown;
export const dropdownModes = Object.keys(
  tokens.themes.light.molecules.dropdown
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
