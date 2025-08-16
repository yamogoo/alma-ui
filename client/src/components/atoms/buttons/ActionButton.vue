<script setup lang="ts">
import type {
  IconName,
  IconStyle,
  IconWeight,
} from "@/components/atoms/icons/icons";

import type { Variant, Size, Color } from "./Button";
import ProtoButton, { type ContentDirection, type Stretch } from "./Button.vue";

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
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
  >
    <template #prepend-icon>
      <slot name="prepend-icon"></slot>
    </template>
    <template #append-icon>
      <slot name="append-icon"></slot>
    </template>
  </ProtoButton>
</template>
