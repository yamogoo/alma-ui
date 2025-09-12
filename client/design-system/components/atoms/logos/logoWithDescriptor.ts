import tokens from "@/tokens";

export type LogoWithDescriptorVariant = keyof typeof tokens.logoWithDescriptor;

export const LogoWithDescriptorVariants = Object.keys(
  tokens.logoWithDescriptor
) as Array<LogoWithDescriptorVariant>;

export type LogoWithDescriptorSize =
  keyof typeof tokens.logoWithDescriptor.default;

export const LogoWithDescriptorSizes = Object.keys(
  tokens.logoWithDescriptor.default
) as Array<LogoWithDescriptorSize>;

export const LogoWithDescriptorTones = Object.keys(
  tokens.themes.light.logoWithDescriptor
) as Array<LogoWithDescriptorTone>;

export type LogoWithDescriptorTone =
  keyof typeof tokens.themes.light.logoWithDescriptor;

export const LogoWithDescriptorModes = Object.keys(
  tokens.themes.light.logoWithDescriptor.default
) as Array<LogoWithDescriptorMode>;

export type LogoWithDescriptorMode =
  keyof typeof tokens.themes.light.logoWithDescriptor.default;

export interface LogoWithDescriptorProps {
  variant?: LogoWithDescriptorVariant;
  size?: LogoWithDescriptorSize;
  tone?: LogoWithDescriptorTone;
  mode?: LogoWithDescriptorMode;
}
