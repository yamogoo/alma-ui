import type { IconSize, IconMode, IconTone } from "@/adapters";

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
  size?: IconSize;
  mode?: IconMode;
  tone?: IconTone;
}

export * from "alma-icons";
