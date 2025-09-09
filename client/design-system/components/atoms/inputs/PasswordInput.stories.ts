import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { inputColors, inputSizes } from "./input";

import PasswordInput from "./PasswordInput.vue";

const meta = {
  title: "Atoms/inputs/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: inputSizes },
    color: {
      control: "select",
      options: inputColors,
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputLg: Story = {
  args: {
    size: "lg",
    color: "primary",
    value: "",
    placeholder: "Password",
  },
};

export const InputMd: Story = {
  args: {
    size: "md",
    color: "primary",
    value: "",
    placeholder: "Password",
  },
};
