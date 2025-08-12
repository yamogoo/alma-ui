import type { Theme } from "@/typings";

export const storyThemeDecorator = (theme?: Theme) => {
  return !!theme ? `<div class="theme-${theme}"><story /></div>` : `<story />`;
};

export const withThemeDecorator = <T>(args: T, theme: Theme = "light") => {
  return {
    ...args,
    decorators: [() => ({ template: storyThemeDecorator(theme) })],
  };
};
