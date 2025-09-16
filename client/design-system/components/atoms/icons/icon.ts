import type { IconMode, IconSize } from "@/adapters";

import { iconNames, iconStyles, iconWeights } from "alma-icons";

import type { UIElementVariant } from "@/typings";

export type IconName = (typeof iconNames)[number];

export type IconStyle = (typeof iconStyles)[number];

export type IconWeight = (typeof iconWeights)[number];

export interface IconProps {
  variant?: UIElementVariant;
  name: IconName;
  style: IconStyle;
  weight: IconWeight;
  mode?: IconMode;
  size?: IconSize;
}

export * from "alma-icons";
