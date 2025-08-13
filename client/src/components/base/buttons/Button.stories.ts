import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { fn } from "storybook/test";

import Button, { type Size, type Color } from "./Button.vue";
import type { IconName, IconStyle, IconWeight } from "../icons/icons";

const colors: Array<Color> = [
  "primary",
  "primary-inversed",
  "secondary",
  "accent",
  "error",
];

const sizes: Array<Size> = ["xs", "sm", "md", "lg"];

const icons: Array<IconName | "none"> = [
  "none",
  "cross",
  "back",
  "check",
  "down",
];
const iconWeigths: Array<IconWeight> = ["100", "200", "300", "400", "500"];
const iconStyles: Array<IconStyle> = ["outline", "fill"];

const meta = {
  title: "Atoms/Button",
  component: Button,
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
    prependIconName: {
      control: "select",
      options: icons,
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
      options: icons,
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
    color: "primary-inversed",
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
