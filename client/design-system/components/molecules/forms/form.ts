import tokens from "@/tokens";

import type { UIElementUnionProps } from "@/typings";

export type FormSize = keyof typeof tokens.form.default;

export type FormColor = keyof typeof tokens.themes.light.form;

export interface FormProps extends UIElementUnionProps {
  title?: string;
  color?: FormColor;
  size?: FormSize;
}
