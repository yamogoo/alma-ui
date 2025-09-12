import tokens from "@/tokens";

import type { IconName, IconStyle, IconWeight } from "@/components/atoms";

export type CharTooltipLabelVariant =
  keyof typeof tokens.atoms.charTooltipLabel;

export type CharTooltipLabelSize =
  keyof typeof tokens.atoms.charTooltipLabel.default;

export type CharTooltipLabelMode =
  keyof typeof tokens.themes.light.atoms.charTooltipLabel;

export interface CharTooltipLabelProps {
  variant?: CharTooltipLabelVariant;
  size?: CharTooltipLabelSize;
  mode?: CharTooltipLabelMode;
  label?: string;
  iconName?: IconName;
  iconStyle?: IconStyle;
  iconWeight?: IconWeight;
}
