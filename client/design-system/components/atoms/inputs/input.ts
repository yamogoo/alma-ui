import type { InputMode, InputSize } from "@/adapters";

import type { InputTypeHTMLAttribute } from "vue";

import type { UIElementUnionProps } from "@/typings";

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
