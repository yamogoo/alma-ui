import tokens from "@/tokens";

export type OptionsSize = keyof typeof tokens.options.default;

export type OptionsColor = keyof typeof tokens.themes.dark.options;

export type OptionsItems<T> = Array<T>;

export interface OptionsProps<T> {
  size?: OptionsSize;
  color?: OptionsColor;
  value: T;
  items: OptionsItems<T>;
  isCurrentOptionShown?: boolean;
}
