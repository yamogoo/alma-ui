import tokens from "@/tokens";

import type { UIElementUnionProps } from "@/typings";

export type DropdownVariant = keyof typeof tokens.atoms.dropdown;
export const dropdownVariants = Object.keys(
  tokens.atoms.dropdown
) as DropdownVariant[];

export type DropdownSize = keyof typeof tokens.atoms.dropdown.default;
export const dropdownSizes = Object.keys(
  tokens.atoms.dropdown.default
) as DropdownSize[];

export type DropdownMode = keyof typeof tokens.themes.light.atoms.dropdown;
export const dropdownModes = Object.keys(
  tokens.themes.light.atoms.dropdown
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
