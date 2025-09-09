import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { fn } from "storybook/test";

import Button from "./Button.vue";
import {
  buttonModes,
  buttonSizes,
  buttonTones,
  buttonVariants,
} from "./button";

import {
  iconNames,
  iconStyles,
  iconWeigths,
} from "@/components/atoms/icons/icon";

const meta = {
  title: "Atoms/buttons/Button",
  component: Button,
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
    variant: { control: "select", options: buttonVariants },
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
    tone: "neutral",
    mode: "primary",
    label: "Button",
  },
};

export const Inversed: Story = {
  args: {
    size: "md",
    tone: "neutral",
    mode: "inversed",
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    size: "md",
    tone: "neutral",
    mode: "secondary",
    label: "Button",
  },
};

export const Accent: Story = {
  args: {
    size: "md",
    tone: "accent",
    mode: "primary",
    label: "Button",
  },
};

export const Error: Story = {
  args: {
    size: "md",
    tone: "negative",
    mode: "primary",
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    tone: "neutral",
    mode: "primary",
    label: "Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    tone: "neutral",
    mode: "primary",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    tone: "neutral",
    mode: "primary",
    label: "Button",
  },
};
