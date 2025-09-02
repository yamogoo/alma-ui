import type { InputTypeHTMLAttribute } from "vue";

import type { UIElementUnionProps } from "@/typings";

import tokens from "@/tokens";

export const inputSizes = Object.keys(tokens.input.default);
export type InputSize = (typeof inputSizes)[number];

export type InputColor = keyof typeof tokens.themes.light.input;
export const inputColors = Object.keys(tokens.themes.light.input);

export type InputState = "focused";

export interface Props extends Partial<UIElementUnionProps> {
  value: string;
  placeholder?: string;
  color?: InputColor;
  isError?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  isRestButtonEnabled?: boolean;
  dataCy?: string;
  areaPlaceholder?: string;
  autocomplete?: string;
  size?: InputSize;
  type?: InputTypeHTMLAttribute;
  errorMessage?: string | null;
}
