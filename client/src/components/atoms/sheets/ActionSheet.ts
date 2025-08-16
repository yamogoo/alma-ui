import tokens from "@/tokens";

import type { UIElementColor, OverlayId } from "@/typings";

export const sizes = Object.keys(tokens.actionSheet);

export type Size = keyof typeof tokens.actionSheet;

export const colors = [
  "primary",
  "secondary",
  "accent",
  "transparent",
] as const;

export type Color = Extract<(typeof colors)[number], UIElementColor>;

export interface Props {
  containerId?: OverlayId;
  color?: Color;
  size?: Size;
  isActive: boolean;
}
