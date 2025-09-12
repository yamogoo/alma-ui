import tokens from "@/tokens";

export type OptionsVariant = keyof typeof tokens.options;
export const optionsVariants = Object.keys(tokens.options) as OptionsVariant[];

export type OptionsSize = keyof typeof tokens.options.default;
export const optionsSizes = Object.keys(
  tokens.options.default
) as OptionsSize[];

export type OptionsMode = keyof typeof tokens.themes.dark.options;
export const optionsModes = Object.keys(
  tokens.themes.dark.options
) as OptionsMode[];

export type OptionsItems<T> = Array<T>;

export interface OptionsProps<T> {
  variant?: OptionsVariant;
  size?: OptionsSize;
  mode?: OptionsMode;
  value: T;
  items: OptionsItems<T>;
  isCurrentOptionShown?: boolean;
}
