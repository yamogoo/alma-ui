import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { inputModes, inputSizes } from "./input";

import PasswordInput from "./PasswordInput.vue";

const meta = {
  title: "Atoms/inputs/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: inputSizes },
    mode: {
      control: "select",
      options: inputModes,
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputLg: Story = {
  args: {
    size: "lg",
    mode: "primary",
    value: "",
    placeholder: "Password",
  },
};

export const InputMd: Story = {
  args: {
    size: "md",
    mode: "primary",
    value: "",
    placeholder: "Password",
  },
};
