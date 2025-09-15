import tokens from "@/tokens";

export type SnackbarVariant = keyof typeof tokens.molecules.snackbar;
export const groupVariants = Object.keys(
  tokens.molecules.snackbar
) as SnackbarVariant[];

export type SnackbarSize = keyof typeof tokens.molecules.snackbar.default;
export const groupSizes = Object.keys(
  tokens.molecules.snackbar.default
) as SnackbarSize[];

export type SnackbarTone = keyof typeof tokens.themes.light.molecules.snackbar;
export const snackbarTones = Object.keys(
  tokens.themes.light.molecules.snackbar
) as Array<SnackbarTone>;

export type SnackbarMode =
  keyof typeof tokens.themes.light.molecules.snackbar.neutral;
export const groupModes = Object.keys(
  tokens.themes.light.molecules.snackbar.neutral
) as SnackbarMode[];

export interface SnackbarProps {
  variant?: SnackbarVariant;
  size?: SnackbarSize;
  tone?: SnackbarTone;
  mode?: SnackbarMode;
  status?: "info" | "warning";
  isCloseButtonShown?: boolean;
  /** ms */
  lifeTime?: number;
  title?: string;
  description?: string;
}
