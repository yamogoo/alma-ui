import type {
  ButtonMode,
  ButtonSize,
  ButtonTone,
  ButtonVariant,
} from "@/adapters";

import type {
  IconName,
  IconStyle,
  IconWeight,
} from "@/components/atoms/icons/icon";
import type {
  ButtonContentDirection,
  ButtonStretch,
  ButtonRequiredProps,
} from "./Button";

export interface ControlButtonProps extends ButtonRequiredProps {
  variant?: ButtonVariant;
  size: ButtonSize;
  mode: ButtonMode;
  tone: ButtonTone;
  label?: string;
  contentDirection?: ButtonContentDirection;
  iconName?: IconName;
  iconStyle?: IconStyle;
  iconWeight?: IconWeight;
  isDisabled?: boolean;
  stretch?: ButtonStretch;
}
