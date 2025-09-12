import tokens from "@/tokens";

export const toggleSwitchModes = Object.keys(
  tokens.themes.light.atoms.toggleSwitch
) as Array<ToggleSwitchMode>;

export type ToggleSwitchMode =
  keyof typeof tokens.themes.light.atoms.toggleSwitch;

export const toggleSwitchVariants = Object.keys(
  tokens.atoms.toggleSwitch
) as Array<ToggleSwitchVariant>;

export type ToggleSwitchVariant = keyof typeof tokens.atoms.toggleSwitch;

export const toggleSwitchSizes = Object.keys(
  tokens.atoms.toggleSwitch.default
) as Array<ToggleSwitchSize>;

export type ToggleSwitchSize = keyof typeof tokens.atoms.toggleSwitch.default;

export interface ToggleSwitchProps {
  variant?: ToggleSwitchVariant;
  mode?: ToggleSwitchMode;
  size?: ToggleSwitchSize;
  label?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  useNative?: boolean;
}
