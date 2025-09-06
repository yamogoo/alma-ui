import tokens from "@/tokens";

export type ButtonVariant = keyof typeof tokens.button;

export const buttonVariants = Object.keys(
  tokens.button
) as Array<ButtonVariant>;

export type ButtonSize = keyof typeof tokens.button.default;

export const buttonColors = Object.keys(
  tokens.themes.light.button
) as Array<ButtonVariant>;

export type ButtonColor = keyof typeof tokens.themes.light.button;

export const buttonSizes = Object.keys(
  tokens.button.default
) as Array<ButtonSize>;

import type {
  UIElementDirection,
  UIElementStretch,
  UIElementUnionProps,
} from "@/typings";

import type {
  IconName,
  IconSize,
  IconStyle,
  IconWeight,
} from "@/components/atoms/icons/icon";

export type ButtonStretch = UIElementStretch;

export type ButtonContentDirection = UIElementDirection;

export interface ButtonProps
  extends Partial<UIElementUnionProps<ButtonVariant>> {
  as?: keyof HTMLElementTagNameMap;
  size: ButtonSize;
  color: ButtonColor;
  label?: string;
  contentDirection?: ButtonContentDirection;
  iconSize?: IconSize;
  prependIconName?: IconName;
  prependIconStyle?: IconStyle;
  prependIconWeight?: IconWeight;
  appendIconName?: IconName;
  appendIconStyle?: IconStyle;
  appendIconWeight?: IconWeight;
  scalePressed?: number;
  isDisabled?: boolean;
  stretch?: ButtonStretch;
}
