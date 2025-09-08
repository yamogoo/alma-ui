import type { Meta, StoryObj } from "@storybook/vue3-vite";

import type { TextColor, TextVariant } from "./text";
import Text from "./Text.vue";

const colors: Array<TextColor> = [
  "primary",
  "secondary",
  "accent",
  "accent",
  "info",
  "warning",
  "error",
];

const variants: Array<TextVariant> = [
  "body-1",
  "body-2",
  "caption-1",
  "caption-2",
  "caption-3",
  "display-1",
  "display-2",
  "display-3",
  "display-4",
  "label-1",
  "label-2",
  "label-3",
];

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

export const Display4: Story = {
  args: {
    variant: "display-4",
    textColor: "primary",
    value: "Display 4",
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

export const Caption3: Story = {
  args: {
    variant: "caption-3",
    textColor: "primary",
    value: "Caption 3",
  },
};
