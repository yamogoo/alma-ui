import type { InputType } from "storybook/internal/types";

export const enumOptions = <T>(arr: readonly T[]): InputType => ({
  control: "select",
  options: arr,
});
