import type { InputTypeHTMLAttribute } from "vue";

import type { UIElementUnionProps } from "@/typings";

import tokens from "@/tokens";

export const inputSizes = Object.keys(tokens.atoms.input.default);
export type InputSize = (typeof inputSizes)[number];

export type InputMode = keyof typeof tokens.themes.light.atoms.input;
export const inputModes = Object.keys(tokens.themes.light.atoms.input);

export type InputState = "focused";

export interface InputProps extends Partial<UIElementUnionProps> {
  value: string;
  placeholder?: string;
  mode?: InputMode;
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
