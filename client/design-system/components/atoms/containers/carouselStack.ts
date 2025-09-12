import tokens from "@/tokens";

import type {
  UIElementAxisDirection,
  UIElementOrientation,
  UIElementStretch,
  UIElementUnionProps,
} from "@/typings";

export type CarousleStackSize = keyof typeof tokens.atoms.carouselStack.default;

export interface CarousleStackProps extends Partial<UIElementUnionProps> {
  selectedScreenId?: number;
  size?: CarousleStackSize;
  screenCount?: number;
  orientation?: UIElementOrientation;
  stretch?: UIElementStretch;
  autoPlay?: boolean;
  duration?: number;
  interval?: number;
  direction?: UIElementAxisDirection;
  isInactiveItemUnmounted?: boolean;
  isDruggable?: boolean;
  editScale?: number;
  gap?: number;
  isItemsClickable?: boolean;
}
