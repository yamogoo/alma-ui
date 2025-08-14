import type { InputTypeHTMLAttribute } from "vue";

import type { UIElementColor } from "@/typings";

import type tokens from "@/tokens";

export type InputSize = keyof typeof tokens.input;

export type InputColor = Extract<UIElementColor, "primary" | "secondary">;

export type InputState = "focused";

export interface Props {
  value: string;
  placeholder?: string;
  color?: InputColor;
  isError?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  isRestButtonEnabled?: boolean;
  dataCy?: string;
  areaplaceholder?: string;
  autocomplete?: string;
  size?: InputSize;
  type?: InputTypeHTMLAttribute;
}
