import tokens from "@/tokens";

import type { UIElementOrientation } from "@/typings";

import type { MenuItems } from "@/components/atoms";

export type SimpleMenuOrientation = UIElementOrientation;

export type SimpleMenuVariant = keyof typeof tokens.atoms.simpleMenu;
export const simpleMenuVariants = Object.keys(
  tokens.atoms.simpleMenu
) as SimpleMenuVariant[];

export type SimpleMenuSize = keyof typeof tokens.atoms.simpleMenu.default;
export const simpleMenuSizes = Object.keys(
  tokens.atoms.simpleMenu.default
) as SimpleMenuSize[];

// export type SimpleMenuMode = keyof typeof tokens.themes.light.atoms.simpleMenu;
// export const groupModes = Object.keys(
//   tokens.themes.light.atoms.simpleMenu
// ) as SimpleMenuMode[];

export interface SimpleMenuProps {
  variant?: SimpleMenuVariant;
  size?: SimpleMenuSize;
  // mode?: SimpleMenuMode;
  orientation?: UIElementOrientation;
  divider?: boolean;
  as?: keyof HTMLElementTagNameMap;
  role?: string;
  ariaLabel?: string;
}

export interface SimpleMenuProps<T = string> {
  selectedItemId: number;
  items: MenuItems<T>;
  orientation?: SimpleMenuOrientation;
}
