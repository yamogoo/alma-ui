import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Icon from "./Icon.vue";
import { iconNames, iconStyles, iconWeights } from "@/components/atoms/icons";

import { iconModes, iconSizes } from "@/adapters";

const meta = {
  title: "Atoms/icons/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: iconNames,
    },
    style: {
      control: "select",
      options: iconStyles,
    },
    weight: {
      control: "select",
      options: iconWeights,
    },
    size: { control: "select", options: iconSizes },
    mode: {
      control: "select",
      options: iconModes,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeXxs: Story = {
  args: {
    name: "cross",
    style: "outline",
    weight: "400",
    size: "xxs",
    mode: "neutral",
    tone: "primary",
  },
};
