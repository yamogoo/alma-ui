import type {
  IconName,
  IconStyle,
  IconWeight,
} from "@/components/atoms/icons/icon";
import type {
  ButtonMode,
  ButtonContentDirection,
  ButtonSize,
  ButtonStretch,
  ButtonVariant,
  ButtonTone,
  ButtonRequiredProps,
} from "./button";

export interface ActionButtonProps extends ButtonRequiredProps {
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
