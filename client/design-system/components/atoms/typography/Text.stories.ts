import type { Meta, StoryObj } from "@storybook/vue3-vite";

import tokens from "@/tokens";

import Text from "./Text.vue";

type Color = keyof typeof tokens.themes.light.abstracts.label;
const colors = Object.keys(tokens.themes.light.abstracts.label) as Color[];

type Variant = keyof typeof tokens.typography.styles;
const variants = Object.keys(tokens.typography.styles) as Variant[];

const meta = {
  title: "Atoms/typography/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    textColor: {
      control: "select",
      options: colors,
    },
    variant: { control: "select", options: variants },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display1: Story = {
  args: {
    variant: "display-1",
    textColor: "primary",
    value: "Display 1",
  },
};

export const Display2: Story = {
  args: {
    variant: "display-2",
    textColor: "primary",
    value: "Display 2",
  },
};

export const Display3: Story = {
  args: {
    variant: "display-3",
    textColor: "primary",
    value: "Display 3",
  },
};

export const Body1: Story = {
  args: {
    variant: "body-1",
    textColor: "primary",
    value: "Body 1",
  },
};

export const Body2: Story = {
  args: {
    variant: "body-2",
    textColor: "primary",
    value: "Body 2",
  },
};

export const Label1: Story = {
  args: {
    variant: "label-1",
    textColor: "primary",
    value: "Label 1",
  },
};

export const Label2: Story = {
  args: {
    variant: "label-2",
    textColor: "primary",
    value: "Label 2",
  },
};

export const Label3: Story = {
  args: {
    variant: "label-3",
    textColor: "primary",
    value: "Label 3",
  },
};

export const Label4: Story = {
  args: {
    variant: "label-4",
    textColor: "primary",
    value: "Label 4",
  },
};

export const Caption1: Story = {
  args: {
    variant: "caption-1",
    textColor: "primary",
    value: "Caption 1",
  },
};

export const Caption2: Story = {
  args: {
    variant: "caption-2",
    textColor: "primary",
    value: "Caption 2",
  },
};
