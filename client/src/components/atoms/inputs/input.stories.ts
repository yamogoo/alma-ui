import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Input from "./Input.vue";
import { inputColors, inputSizes } from "./input";

const meta = {
  title: "Atoms/inputs/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: inputSizes },
    color: {
      control: "select",
      options: inputColors,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputLg: Story = {
  args: {
    size: "lg",
    color: "primary",
    value: "",
    placeholder: "Login",
  },
};

export const InputMd: Story = {
  args: {
    size: "md",
    color: "primary",
    value: "",
    placeholder: "Login",
  },
};
