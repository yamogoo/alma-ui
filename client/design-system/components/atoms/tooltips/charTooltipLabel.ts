import tokens from "@/tokens";

import type { IconName, IconStyle, IconWeight } from "@/components/atoms";

export type CharTooltipLabelVariant = keyof typeof tokens.charTooltipLabel;

export type CharTooltipLabelSize = keyof typeof tokens.charTooltipLabel.default;

export type CharTooltipLabelColor =
  keyof typeof tokens.themes.light.charTooltipLabel;

export interface CharTooltipLabelProps {
  variant?: CharTooltipLabelVariant;
  size?: CharTooltipLabelSize;
  color?: CharTooltipLabelColor;
  label?: string;
  iconName?: IconName;
  iconStyle?: IconStyle;
  iconWeight?: IconWeight;
}
