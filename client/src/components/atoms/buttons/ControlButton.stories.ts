import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { fn } from "storybook/test";

import ControlButton from "./ControlButton.vue";
import { colors, sizes } from "./button";

import { iconNames, iconStyles, iconWeigths } from "../icons/icons";

const meta = {
  title: "Atoms/buttons/ControlButton",
  component: ControlButton,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: sizes },
    color: {
      control: "select",
      options: colors,
    },
    variant: { control: "select", options: ["default", "rounded"] },
    contentDirection: {
      control: "select",
      options: ["ltr", "rtl"],
    },
    iconName: {
      control: "select",
      options: iconNames,
    },
    iconStyle: {
      control: "select",
      options: iconStyles,
    },
    iconWeight: {
      control: "select",
      options: iconWeigths,
    },
  },
  args: {
    onPress: fn(),
  },
} satisfies Meta<typeof ControlButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "md",
    color: "primary",
    iconName: "check",
  },
};

export const PrimaryInversed: Story = {
  args: {
    size: "md",
    color: "primary-inversed",
    iconName: "check",
  },
};

export const Secondary: Story = {
  args: {
    size: "md",
    color: "secondary",
    iconName: "check",
  },
};

export const Accent: Story = {
  args: {
    size: "md",
    color: "accent",
    iconName: "check",
  },
};

export const Error: Story = {
  args: {
    size: "md",
    color: "error",
    iconName: "check",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    color: "primary",
    iconName: "check",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    color: "primary",
    iconName: "check",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    color: "primary",
    iconName: "check",
  },
};
