import type { InputTypeHTMLAttribute } from "vue";

import type { UIElementColor, UIElementUnionProps } from "@/typings";

import tokens from "@/tokens";

export const inputSizes = Object.keys(tokens.input.default);
export type InputSize = (typeof inputSizes)[number];

export type InputColor = Extract<UIElementColor, "primary" | "secondary">;
export const inputColors: Array<InputColor> = ["primary", "secondary"];

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
