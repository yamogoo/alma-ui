import tokens from "@/tokens";

export type SkeletonMode = keyof typeof tokens.themes.light.atoms.skeleton;

export interface SkeletonProps {
  mode?: SkeletonMode;
}
