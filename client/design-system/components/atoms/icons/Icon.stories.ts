import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Icon from "./Icon.vue";
import {
  iconNames,
  iconModes,
  iconSizes,
  iconStyles,
  iconWeights,
} from "./icon";

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
    mode: "primary",
  },
};

export const SizeXs: Story = {
  args: {
    name: "cross",
    style: "outline",
    weight: "400",
    size: "xs",
    mode: "primary",
  },
};

export const SizeSm: Story = {
  args: {
    name: "cross",
    style: "outline",
    weight: "400",
    size: "sm",
    mode: "primary",
  },
};

export const SizeMd: Story = {
  args: {
    name: "cross",
    style: "outline",
    weight: "400",
    size: "md",
    mode: "primary",
  },
};

export const SizeLg: Story = {
  args: {
    name: "cross",
    style: "outline",
    weight: "400",
    size: "lg",
    mode: "primary",
  },
};
