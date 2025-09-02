import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { fn } from "storybook/test";

import Button from "./Button.vue";
import { colors, sizes, variants } from "./button";

import { iconNames, iconStyles, iconWeigths } from "../icons/icons";

const meta = {
  title: "Atoms/buttons/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: sizes },
    color: {
      control: "select",
      options: colors,
    },
    variant: { control: "select", options: variants },
    contentDirection: {
      control: "select",
      options: ["ltr", "rtl"],
    },
    prependIconName: {
      control: "select",
      options: iconNames,
    },
    prependIconStyle: {
      control: "select",
      options: iconStyles,
    },
    prependIconWeight: {
      control: "select",
      options: iconWeigths,
    },
    appendIconName: {
      control: "select",
      options: iconNames,
    },
    appendIconStyle: {
      control: "select",
      options: iconStyles,
    },
    appendIconWeight: {
      control: "select",
      options: iconWeigths,
    },
    scalePressed: {
      control: "number",
    },
    stretch: {
      control: "select",
      options: ["fill", "auto"],
    },
  },
  args: {
    onPointerdown: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "md",
    color: "primary",
    label: "Button",
  },
};

export const PrimaryInversed: Story = {
  args: {
    size: "md",
    color: "primaryInversed",
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    size: "md",
    color: "secondary",
    label: "Button",
  },
};

export const Accent: Story = {
  args: {
    size: "md",
    color: "accent",
    label: "Button",
  },
};

export const Error: Story = {
  args: {
    size: "md",
    color: "error",
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    color: "primary",
    label: "Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    color: "primary",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    color: "primary",
    label: "Button",
  },
};
