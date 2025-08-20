<script setup lang="ts">
import type { IconName, IconStyle, IconWeight } from "../icons/icons";

import type { Variant, Size, Color } from "./button";
import ProtoButton, { type ContentDirection, type Stretch } from "./Button.vue";

const props = withDefaults(defineProps<Props>(), {
  variant: "rounded",
  color: "primary",
  size: "md",
});

const emit = defineEmits<{
  (e: "press", ev: PointerEvent): void;
  (e: "release", ev: PointerEvent): void;
}>();

const onPointerUp = (e: PointerEvent): void => {
  if (props.isDisabled) return;

  emit("press", e);
};

const onPointerDown = (e: PointerEvent): void => {
  if (props.isDisabled) return;

  emit("release", e);
};
</script>

<script lang="ts">
export interface Props {
  variant?: Variant;
  size: Size;
  color: Color;
  label?: string;
  contentDirection?: ContentDirection;
  iconName?: IconName;
  iconStyle?: IconStyle;
  iconWeight?: IconWeight;
  isDisabled?: boolean;
  stretch?: Stretch;
}
</script>

<template>
  <ProtoButton
    v-bind="props"
    :prepend-icon-name="iconName"
    :prepend-icon-style="iconStyle"
    :prepend-icon-weight="iconWeight"
    @pointerup="onPointerUp"
    @pointerdown="onPointerDown"
  ></ProtoButton>
</template>
