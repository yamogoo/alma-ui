import tokens from "@/tokens";
import type { UIElementColor, UIElementUnionProps } from "@/typings";

export type DropdownColor = Extract<UIElementColor, "primary" | "secondary">;

export type DropdownSize = keyof typeof tokens.dropDown.default;

export interface DropdownProps extends Partial<UIElementUnionProps> {
  size?: DropdownSize;
  color?: DropdownColor;
  value: string;
  valuePostfix?: string;
  isResetButtonShown?: boolean;
  closeOnOptionClick?: boolean;
}
