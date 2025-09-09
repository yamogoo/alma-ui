import tokens from "@/tokens";

import type {
  UIElementColor,
  UIElementContentKey,
  UIElementUnionProps,
} from "@/typings";

export type FormWrapperSize = keyof typeof tokens.formWrapper.default;

export type FormWrapperColor = Extract<UIElementColor, "primary" | "secondary">;

export interface FormWrapperProps extends Partial<UIElementUnionProps> {
  size?: FormWrapperSize;
  color?: FormWrapperColor;
  bordered?: boolean;
  duration?: number;
  contentKey?: UIElementContentKey;
}
