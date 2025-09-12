import tokens from "@/tokens";

import type { UIElementContentKey, UIElementUnionProps } from "@/typings";

export type FormWrapperVariant = keyof typeof tokens.formWrapper;
export const formWrapperVariants = Object.keys(
  tokens.formWrapper
) as FormWrapperVariant[];

export type FormWrapperSize = keyof typeof tokens.formWrapper.default;
export const formWrapperSizes = Object.keys(
  tokens.formWrapper.default
) as FormWrapperSize[];

export type FormWrapperMode = keyof typeof tokens.themes.light.formWrapper;
export const formWrapperModes = Object.keys(
  tokens.themes.light.formWrapper
) as FormWrapperMode[];

export interface FormWrapperProps extends Partial<UIElementUnionProps> {
  size?: FormWrapperSize;
  mode?: FormWrapperMode;
  bordered?: boolean;
  duration?: number;
  contentKey?: UIElementContentKey;
}
