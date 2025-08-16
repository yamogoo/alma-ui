import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Icon from "./Icon.vue";
import {
  iconNames,
  iconColors,
  iconSizes,
  iconStyles,
  iconWeigths,
} from "../icons/icons";

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
      options: iconWeigths,
    },
    size: { control: "select", options: iconSizes },
    color: {
      control: "select",
      options: iconColors,
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
    color: "primary",
  },
};

export const SizeXs: Story = {
  args: {
    name: "cross",
    style: "outline",
    weight: "400",
    size: "xs",
    color: "primary",
  },
};

export const SizeSm: Story = {
  args: {
    name: "cross",
    style: "outline",
    weight: "400",
    size: "sm",
    color: "primary",
  },
};

export const SizeMd: Story = {
  args: {
    name: "cross",
    style: "outline",
    weight: "400",
    size: "md",
    color: "primary",
  },
};

export const SizeLg: Story = {
  args: {
    name: "cross",
    style: "outline",
    weight: "400",
    size: "lg",
    color: "primary",
  },
};
