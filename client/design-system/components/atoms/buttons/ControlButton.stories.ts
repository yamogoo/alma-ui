import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { fn } from "storybook/test";

import ControlButton from "./ControlButton.vue";
import { buttonModes, buttonSizes, buttonTones } from "@/adapters";

import {
  iconNames,
  iconStyles,
  iconWeights,
} from "@/components/atoms/icons/icon";

const meta = {
  title: "Atoms/buttons/ControlButton",
  component: ControlButton,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: buttonSizes },
    mode: {
      control: "select",
      options: buttonModes,
    },
    tone: {
      control: "select",
      options: buttonTones,
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
      options: iconWeights,
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
    tone: "neutral",
    mode: "primary",
    iconName: "check",
  },
};

export const Secondary: Story = {
  args: {
    size: "md",
    tone: "neutral",
    mode: "secondary",
    iconName: "check",
  },
};

export const Tertiary: Story = {
  args: {
    size: "md",
    tone: "neutral",
    mode: "tertiary",
    iconName: "check",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    tone: "neutral",
    mode: "primary",
    iconName: "check",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    tone: "neutral",
    mode: "primary",
    iconName: "check",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    tone: "neutral",
    mode: "primary",
    iconName: "check",
  },
};
