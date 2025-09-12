import tokens from "@/tokens";

import type { UIElementFooterTag } from "@/typings";

export type MainFooterVariant = keyof typeof tokens.templates.mainFooter;

export const MainFooterVariants = Object.keys(
  tokens.templates.mainFooter
) as Array<MainFooterVariant>;

export type MainFooterSize = keyof typeof tokens.templates.mainFooter.default;

export const MainFooterSizes = Object.keys(
  tokens.templates.mainFooter.default
) as Array<MainFooterSize>;

export const MainFooterTones = Object.keys(
  tokens.themes.light.templates.mainFooter
) as Array<MainFooterTone>;

export type MainFooterTone =
  keyof typeof tokens.themes.light.templates.mainFooter;

export const MainFooterModes = Object.keys(
  tokens.themes.light.templates.mainFooter.neutral
) as Array<MainFooterMode>;

export type MainFooterMode =
  keyof typeof tokens.themes.light.templates.mainFooter.neutral;

export interface MainFooterProps {
  as?: UIElementFooterTag;
  variant?: MainFooterVariant;
  size?: MainFooterSize;
  tone?: MainFooterTone;
  mode?: MainFooterMode;
  isMainElement?: boolean;
}
