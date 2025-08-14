<script setup lang="ts">
import type { Props as InputProps } from "./input";

import Input from "@/components/base/inputs/Input.vue";
import ControlButton from "@/components/base/buttons/ControlButton.vue";

const props = withDefaults(defineProps<Props>(), {
  isMaskIconShown: true,
  masked: true,
});

const emit = defineEmits<{
  (e: "update:masked", isMasked: boolean): void;
}>();

const onMaskValue = (e: PointerEvent): void => {
  e.stopPropagation();
  e.stopImmediatePropagation();

  emit("update:masked", !props.masked);
};
</script>

<script lang="ts">
export interface Props extends InputProps {
  isMaskIconShown?: boolean;
  masked?: boolean;
}
</script>

<template>
  <Input v-bind="props" :type="masked ? 'password' : 'text'">
    <template #controls>
      <ControlButton
        data-testid="input__mask-button"
        role="button"
        :aria-label="'mask button'"
        :size="'xs'"
        :color="!isError ? 'primary' : 'error'"
        :icon-name="!masked ? 'eye' : 'eyeDisabled'"
        :icon-style="'outline'"
        :icon-weight="'500'"
        @click="onMaskValue"
      />
    </template>
  </Input>
</template>
