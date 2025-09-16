import type { DividerMode, DividerSize, DividerVariant } from "@/adapters";

import type {
  UIElementAlignment,
  UIElementOrientation,
  UIElementTypographyTag,
} from "@/typings";

export type DividerAlign = UIElementAlignment;

export interface DividerProps {
  as?: UIElementTypographyTag;
  variant?: DividerVariant;
  size?: DividerSize;
  mode?: DividerMode;
  orientation?: UIElementOrientation;
  align?: DividerAlign;
}
