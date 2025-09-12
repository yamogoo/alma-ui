import tokens from "@/tokens";

import type { UIElementUnionProps } from "@/typings";

export type FormSize = keyof typeof tokens.molecules.form.default;

export type FormMode = keyof typeof tokens.themes.light.molecules.form;

export interface FormProps extends UIElementUnionProps {
  title?: string;
  mode?: FormMode;
  size?: FormSize;
}
