import tokens from "@/tokens";

import type { UIElementContentKey, UIElementUnionProps } from "@/typings";

export type FormWrapperVariant = keyof typeof tokens.molecules.formWrapper;
export const formWrapperVariants = Object.keys(
  tokens.molecules.formWrapper
) as FormWrapperVariant[];

export type FormWrapperSize = keyof typeof tokens.molecules.formWrapper.default;
export const formWrapperSizes = Object.keys(
  tokens.molecules.formWrapper.default
) as FormWrapperSize[];

export type FormWrapperMode =
  keyof typeof tokens.themes.light.molecules.formWrapper;
export const formWrapperModes = Object.keys(
  tokens.themes.light.molecules.formWrapper
) as FormWrapperMode[];

export interface FormWrapperProps extends Partial<UIElementUnionProps> {
  size?: FormWrapperSize;
  mode?: FormWrapperMode;
  bordered?: boolean;
  duration?: number;
  contentKey?: UIElementContentKey;
}
