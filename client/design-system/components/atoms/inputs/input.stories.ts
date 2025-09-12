import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Input from "./Input.vue";
import { inputModes, inputSizes } from "./input";

const meta = {
  title: "Atoms/inputs/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: inputSizes },
    mode: {
      control: "select",
      options: inputModes,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputLg: Story = {
  args: {
    size: "lg",
    mode: "primary",
    value: "",
    placeholder: "Login",
  },
};

export const InputMd: Story = {
  args: {
    size: "md",
    mode: "primary",
    value: "",
    placeholder: "Login",
  },
};
