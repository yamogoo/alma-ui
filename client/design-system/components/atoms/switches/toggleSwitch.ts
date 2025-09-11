import tokens from "@/tokens";

export const toggleSwitchTones = Object.keys(
  tokens.themes.light.toggleSwitch
) as Array<ToggleSwitchTone>;

export type ToggleSwitchTone = keyof typeof tokens.themes.light.toggleSwitch;

export const toggleSwitchVariants = Object.keys(
  tokens.toggleSwitch
) as Array<ToggleSwitchVariant>;

export type ToggleSwitchVariant = keyof typeof tokens.toggleSwitch;

export const toggleSwitchSizes = Object.keys(
  tokens.toggleSwitch.default
) as Array<ToggleSwitchSize>;

export type ToggleSwitchSize = keyof typeof tokens.toggleSwitch.default;

export interface ToggleSwitchProps {
  variant?: ToggleSwitchVariant;
  tone?: ToggleSwitchTone;
  size?: ToggleSwitchSize;
  label?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  useNative?: boolean;
}
