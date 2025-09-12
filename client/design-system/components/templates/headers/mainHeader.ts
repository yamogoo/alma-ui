import tokens from "@/tokens";

import type { UIElementHeaderTag } from "@/typings";

export type MainHeaderVariant = keyof typeof tokens.templates.mainHeader;

export const MainHeaderVariants = Object.keys(
  tokens.templates.mainHeader
) as Array<MainHeaderVariant>;

export type MainHeaderSize = keyof typeof tokens.templates.mainHeader.default;

export const MainHeaderSizes = Object.keys(
  tokens.templates.mainHeader.default
) as Array<MainHeaderSize>;

export const MainHeaderTones = Object.keys(
  tokens.themes.light.templates.mainHeader
) as Array<MainHeaderTone>;

export type MainHeaderTone =
  keyof typeof tokens.themes.light.templates.mainHeader;

export const MainHeaderModes = Object.keys(
  tokens.themes.light.templates.mainHeader.neutral
) as Array<MainHeaderMode>;

export type MainHeaderMode =
  keyof typeof tokens.themes.light.templates.mainHeader.neutral;

export interface MainHeaderProps {
  as?: UIElementHeaderTag;
  variant?: MainHeaderVariant;
  size?: MainHeaderSize;
  tone?: MainHeaderTone;
  mode?: MainHeaderMode;
  isMainElement?: boolean;
}
