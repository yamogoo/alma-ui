import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { storyDecorator } from "@/stories/decorators";

import ActionSheet from "./ActionSheet.vue";
import { actionSheetColors, actionSheetSizes } from "./actionSheet";

const meta = {
  title: "Atoms/sheets/ActionSheet",
  component: ActionSheet,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: actionSheetSizes },
    color: {
      control: "select",
      options: actionSheetColors,
    },
    isActive: {
      control: "boolean",
      defaultValue: "false",
    },
  },
  decorators: () => [storyDecorator()],
} satisfies Meta<typeof ActionSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    containerId: "#app",
    size: "lg",
    color: "primary",
    isActive: true,
  },
};

export const Secondary: Story = {
  args: {
    containerId: "#app",
    size: "lg",
    color: "secondary",
    isActive: true,
  },
};

export const Accent: Story = {
  args: {
    containerId: "#app",
    size: "lg",
    color: "accent",
    isActive: true,
  },
};
