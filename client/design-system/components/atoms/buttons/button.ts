import tokens from "@/tokens";

export type ButtonVariant = keyof typeof tokens.atoms.button;

export const buttonVariants = Object.keys(
  tokens.atoms.button
) as Array<ButtonVariant>;

export type ButtonSize = keyof typeof tokens.atoms.button.default;

export const buttonSizes = Object.keys(
  tokens.atoms.button.default
) as Array<ButtonSize>;

export const buttonTones = Object.keys(
  tokens.themes.light.atoms.button
) as Array<ButtonTone>;

export type ButtonTone = keyof typeof tokens.themes.light.atoms.button;

export const buttonModes = Object.keys(
  tokens.themes.light.atoms.button.neutral
) as Array<ButtonMode>;

export type ButtonMode = keyof typeof tokens.themes.light.atoms.button.neutral;

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

export interface ButtonRequiredProps {
  size: ButtonSize;
  mode: ButtonMode;
  tone: ButtonTone;
}

export interface ButtonProps
  extends Partial<UIElementUnionProps<ButtonVariant>>,
    ButtonRequiredProps {
  as?: keyof HTMLElementTagNameMap;

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
