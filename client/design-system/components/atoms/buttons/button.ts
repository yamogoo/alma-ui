import type {
  ButtonMode,
  ButtonSize,
  ButtonTone,
  ButtonVariant,
} from "@/adapters";

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
