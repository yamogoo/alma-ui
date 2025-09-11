import tokens from "@/tokens";

export type ControlWrapperVariant = keyof typeof tokens.controlWrapper;

export const controlWrapperVariants = Object.keys(
  tokens.controlWrapper
) as ControlWrapperVariant[];

export type ControlWrapperSize = keyof typeof tokens.controlWrapper.default;

export const controlWrapperSizes = Object.keys(
  tokens.controlWrapper.default
) as ControlWrapperSize[];

export interface ControlWrapperProps {
  variant?: ControlWrapperVariant;
  size?: ControlWrapperSize;
}
