import type { Theme } from "@/typings";

export const storyDecorator = (id = "app", className?: string) => {
  return `<div id="${id}" class="${className}"><story /></div>`;
};

export const storyThemeDecorator = (theme?: Theme) => {
  return !!theme ? `<div class="theme-${theme}"><story /></div>` : `<story />`;
};

export const withThemeDecorator = <T>(args: T, theme: Theme = "light") => {
  return {
    ...args,
    decorators: [() => ({ template: storyThemeDecorator(theme) })],
  };
};
