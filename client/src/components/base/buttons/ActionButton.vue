<script setup lang="ts">
import type {
  IconName,
  IconStyle,
  IconWeight,
} from "@/components/base/icons/icons";
import ProtoButton, {
  type Color,
  type ButtonContentDirection,
  type Size,
  type ButtonVariant,
  type ButtonStretch,
} from "./Button.vue";

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
  variant?: ButtonVariant;
  size: Size;
  color: Color;
  label?: string;
  contentDirection?: ButtonContentDirection;
  iconName?: IconName;
  iconStyle?: IconStyle;
  iconWeight?: IconWeight;
  isDisabled?: boolean;
  stretch?: ButtonStretch;
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
