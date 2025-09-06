import type {
  IconName,
  IconStyle,
  IconWeight,
} from "@/components/atoms/icons/icon";
import type {
  ButtonColor,
  ButtonContentDirection,
  ButtonSize,
  ButtonStretch,
  ButtonVariant,
} from "./button";

export interface ControlButtonProps {
  variant?: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  label?: string;
  contentDirection?: ButtonContentDirection;
  iconName?: IconName;
  iconStyle?: IconStyle;
  iconWeight?: IconWeight;
  isDisabled?: boolean;
  stretch?: ButtonStretch;
}
