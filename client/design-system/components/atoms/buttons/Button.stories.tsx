import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { fn } from "storybook/test";

import { enumOptions } from "@/stories";

import {
  buttonModes,
  buttonSizes,
  buttonTones,
  buttonVariants,
} from "@/adapters";

import { StoryGrid, InfoBlock, PageHeader } from "@/stories/components";

import {
  Button,
  type ButtonProps,
  iconNames,
  iconStyles,
  iconWeights,
} from "@/components/atoms";

const meta = {
  title: "Atoms/buttons/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The primary action button. Supports tones, modes, sizes, and icons.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: buttonSizes },
    mode: enumOptions(buttonModes),
    tone: enumOptions(buttonTones),
    variant: enumOptions(buttonVariants),
    contentDirection: enumOptions(["ltr", "rtl"]),
    prependIconName: enumOptions(iconNames),
    prependIconStyle: enumOptions(iconStyles),
    prependIconWeight: enumOptions(iconWeights),
    appendIconName: enumOptions(iconNames),
    appendIconStyle: enumOptions(iconStyles),
    appendIconWeight: enumOptions(iconWeights),
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

export const Playground: Story = {
  args: {
    label: "Button",
    size: "md",
    tone: "neutral",
    mode: "primary",
  },
};

export const Variants: Story = {
  args: {
    label: "Button",
    mode: "primary",
    tone: "neutral",
    size: "md",
  },
  render: (args: ButtonProps) => ({
    setup() {
      return () => (
        <>
          <PageHeader
            title={"Button modifiers:"}
            description={"variant /tone / mode / size"}
          ></PageHeader>
          <StoryGrid columns={4}>
            {buttonVariants.map((variant) =>
              buttonSizes.map((size) =>
                buttonModes.map((mode) =>
                  buttonTones.map((tone) => {
                    const title = `${variant} / ${tone} / ${mode} / ${size}`;

                    const label = variant === "default" ? `Button` : undefined;
                    return (
                      <InfoBlock
                        key={`${variant}-${size}-${mode}-${tone}`}
                        title={title}
                        align={"center"}
                        orientation={"vertical"}
                      >
                        <Button
                          {...args}
                          variant={variant}
                          mode={mode}
                          tone={tone}
                          size={size}
                          stretch="auto"
                          label={label}
                          prependIconName={"check"}
                          prependIconStyle={"outline"}
                          prependIconWeight={"400"}
                        />
                      </InfoBlock>
                    );
                  })
                )
              )
            )}
          </StoryGrid>
        </>
      );
    },
  }),
};
