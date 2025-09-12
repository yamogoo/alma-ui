import { Vue3Lottie as LottieAnimation } from "vue3-lottie";

import type { UIElementUnionProps } from "@/typings";

import type { IconMode, IconSize } from "./icon";

export interface AnimatedIconProps extends Partial<UIElementUnionProps> {
  mode?: IconMode;
  size?: IconSize;
  animationData: typeof LottieAnimation.animationData;
  speed?: number;
  isActive: boolean;
  loop?: boolean;
}
