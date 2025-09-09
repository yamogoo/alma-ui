import { Vue3Lottie as LottieAnimation } from "vue3-lottie";

import type { UIElementUnionProps } from "@/typings";

import type { IconColor, IconSize } from "./icon";

export interface AnimatedIconProps extends Partial<UIElementUnionProps> {
  color?: IconColor;
  size?: IconSize;
  animationData: typeof LottieAnimation.animationData;
  speed?: number;
  isActive: boolean;
  loop?: boolean;
}
