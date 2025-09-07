import type { UIElementColor } from "@/typings";

export type Color = Extract<UIElementColor, "primary" | "primary-inversed">;

export interface OverlayProps {
  id?: string;
  color?: Color;
}
