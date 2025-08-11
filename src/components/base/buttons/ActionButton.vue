<script setup lang="ts">
import type {
  SymbolName,
  SymbolStyle,
  SymbolWeight,
} from "@/components/base/icons/symbols";
import ProtoButton, {
  type ButtonColor,
  type ButtonContentDirection,
  type ButtonSize,
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
  size: ButtonSize;
  color: ButtonColor;
  label?: string;
  contentDirection?: ButtonContentDirection;
  iconName?: SymbolName;
  iconStyle?: SymbolStyle;
  iconWeight?: SymbolWeight;
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
  ></ProtoButton>
</template>
