import tokens from "@/tokens";

export type SkeletonColor = keyof typeof tokens.themes.light.skeleton;

export interface SkeletonProps {
  color?: SkeletonColor;
}
