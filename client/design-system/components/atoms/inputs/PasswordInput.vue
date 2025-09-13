<script setup lang="ts">
import type { InputProps } from "./input";

import { Input, ControlButton } from "@/components/atoms";

const props = withDefaults(defineProps<Props>(), {
  isMaskIconShown: true,
  masked: true,
});

const emit = defineEmits<{
  (e: "focused", isFocused: boolean): void;
  (e: "update:value", value: string | number): void;
  (e: "reset:value"): void;
  (e: "update:masked", isMasked: boolean): void;
}>();

const onMaskValue = (): void => {
  emit("update:masked", !props.masked);
};

const onFocus = (isFocused: boolean): void => {
  emit("focused", isFocused);
};

const onUpdateValue = (value: string | number): void => {
  emit("update:value", value);
};

const onReset = (): void => {
  emit("reset:value");
};
</script>

<script lang="ts">
export interface Props extends InputProps {
  isMaskIconShown?: boolean;
  masked?: boolean;
}
</script>

<template>
  <Input
    v-bind="props"
    :type="masked ? 'password' : 'text'"
    @focused="onFocus"
    @reset:value="onReset"
    @update:value="onUpdateValue"
  >
    <template #controls>
      <ControlButton
        data-testid="input-mask-button"
        :size="'xs'"
        :icon-size="'xs'"
        :tone="'neutral'"
        :mode="'tertiary'"
        :icon-name="!masked ? 'eye' : 'eyeDisabled'"
        :icon-style="'outline'"
        :icon-weight="'400'"
        role="button"
        :aria-label="'mask button'"
        @click="onMaskValue"
      />
    </template>
  </Input>
</template>
