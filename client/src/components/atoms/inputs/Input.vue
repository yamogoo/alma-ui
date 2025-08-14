<script setup lang="ts">
import {
  ref,
  watch,
  watchEffect,
  useId,
  computed,
  toValue,
  onMounted,
} from "vue";
import { useFocus } from "@vueuse/core";
import g from "gsap";

import { sanitizeInput } from "@/utils";

import type { Props } from "./input";

import ControlButton from "@/components/atoms/buttons/ControlButton.vue";

const props = withDefaults(defineProps<Props>(), {
  color: "primary",
  size: "lg",
  type: "text",
  isError: false,
  isDisabled: false,
  isRestButtonEnabled: true,
  autocomplete: "off",
});

const emit = defineEmits<{
  (e: "focused", isFocused: boolean): void;
  (e: "update:value", value: string): void;
  (e: "reset:value"): void;
}>();

defineOptions({ inheritAttrs: false });

const refInput = ref<HTMLInputElement | null>(null);
const refPlaceholder = ref<HTMLLabelElement | null>(null);

const id = useId();
const localModelValue = ref(props.value);

const sanitize = () =>
  (localModelValue.value = sanitizeInput(localModelValue.value));

const isResetButtonShown = computed(() => localModelValue.value !== "");

const { focused: isLocalFocused } = useFocus(refInput, {
  initialValue: props.isFocused,
});

watchEffect(() => {
  emit("focused", isLocalFocused.value);
});

watch(
  () => props.isFocused,
  (isFocused) => {
    isLocalFocused.value = isFocused;
  }
);

watch(
  () => props.value,
  (v) => {
    if (localModelValue.value !== v) {
      localModelValue.value = v;
    }
  }
);

watch(localModelValue, (newValue) => {
  emit("update:value", newValue);
});

const onFocus = (e: PointerEvent): void => {
  e.preventDefault();

  isLocalFocused.value = true;
};

const onChange = (e: Event): void => {
  const value = (e.target as HTMLInputElement).value;
  emit("update:value", value);
};

const onReset = (e: MouseEvent | PointerEvent): void => {
  e.preventDefault();

  emit("reset:value");
  emit("update:value", localModelValue.value);
  localModelValue.value = "";
};

/* * * Animations * * */

const onAnimInputValue = (
  input: HTMLInputElement | null,
  durationFactor = 1,
  isFocused: boolean,
  value?: string
): void => {
  const isEmpty = (value || "").length === 0;

  const OPACITY_IN = 1,
    OPACITY_OUT = 0;

  if (input) {
    g.to(input, {
      opacity: isFocused ? OPACITY_IN : isEmpty ? OPACITY_OUT : OPACITY_IN,
      duration: 0.1 * durationFactor,
      ease: "power4.out",
    });
  }
};

const onAnimPlaceholder = (
  placeholder: HTMLLabelElement | null,
  durationFactor = 1,
  isFocused: boolean,
  value: string
): void => {
  const isEmpty = (value || "").length === 0;

  const SCALE_IN = 1,
    SCALE_OUT = 0.75;

  const OFFSET_IN = "50%",
    OFFSET_IN_INVERSED = "-50%",
    OFFSET_OUT = "5%";

  const OPACITY_IN = 1,
    OPACITY_OUT = 0.65;

  if (placeholder)
    g.to(placeholder, {
      y: isFocused ? OFFSET_OUT : isEmpty ? OFFSET_IN_INVERSED : OFFSET_OUT,
      top: isFocused ? OFFSET_OUT : isEmpty ? OFFSET_IN : OFFSET_OUT,
      scale: isFocused ? SCALE_OUT : isEmpty ? SCALE_IN : SCALE_OUT,
      opacity: isFocused ? OPACITY_OUT : isEmpty ? OPACITY_IN : OPACITY_OUT,
      duration: 0.25 * durationFactor,
      ease: "power4.out",
    });
};

const animate = (durationFactor = 1): void => {
  const placeholder = refPlaceholder.value;
  const input = refInput.value;
  const value = toValue(localModelValue);
  const isFocused = toValue(isLocalFocused);

  onAnimPlaceholder(placeholder, durationFactor, isFocused, value);
  onAnimInputValue(input, durationFactor, isFocused, value);
};

watch([isLocalFocused, localModelValue], () => {
  animate(1);
});

onMounted(() => {
  animate(0);
});
</script>

<template>
  <div
    class="input"
    data-testid="input"
    :class="[
      `input_color-${color}`,
      {
        [`input_error`]: isError,
        [`input_disabled`]: isDisabled,
        [`input_focused`]: isLocalFocused,
        [`input_size-${String(size)}`]: size,
      },
    ]"
    @pointerdown="onFocus"
  >
    <label
      v-if="placeholder || placeholder === ''"
      ref="refPlaceholder"
      :for="id"
      class="input__placeholder"
      >{{ placeholder }}
    </label>
    <div class="input__field">
      <div v-if="$slots.icon" class="input__field-icon">
        <slot name="icon"></slot>
      </div>
      <input
        :id
        ref="refInput"
        v-model="localModelValue"
        :type
        class="input__value"
        data-testid="input-value"
        :dataCy
        :areaplaceholder
        :disabled="isDisabled"
        :autocomplete
        :spellcheck="'false'"
        @change="onChange"
      />
      <slot name="controls"></slot>
      <ControlButton
        v-if="isResetButtonShown"
        type="reset"
        data-testid="input__reset-button"
        :size="'xs'"
        :color="!isError ? 'primary' : 'error'"
        :icon-name="'cross'"
        :icon-style="'outline'"
        :icon-weight="'500'"
        @input="sanitize"
        @click="onReset"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineInputSizes($map: $input) {
  @each $size, $val in $map {
    $value-font-style: map.get(map.get($val, "value"), "font-style");
    $placeholder-font-style: map.get(
      map.get($val, "placeholder"),
      "font-style"
    );

    $height: map.get($val, "height");
    $padding: map.get($val, "padding");
    $border-radius: map.get($val, "border-radius");

    &_size-#{$size} {
      height: $height;
      padding: $padding;
      border-radius: $border-radius;

      .input__value {
        @extend %t__#{$value-font-style};
      }

      .input__placeholder {
        @extend %t__#{$placeholder-font-style};
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      &:not(.input_disabled) {
        @include themify($themes) {
          color: themed("input.label-#{$name}-normal");
          background-color: themed("input.background-#{$name}-normal");
          @extend %base-transition;
        }
      }

      &.input_focused {
        @include themify($themes) {
          color: themed("input.label-#{$name}-focused");
          background-color: themed("input.background-#{$name}-focused");
          @extend %base-transition;
        }
      }

      &.input_disabled {
        @include themify($themes) {
          color: themed("input.label-#{$name}-disabled");
          background-color: themed("input.background-#{$name}-disabled");
          @extend %base-transition;
        }
      }

      &.input_error {
        @include themify($themes) {
          color: themed("input.label-#{$name}-error");
          background-color: themed("input.background-#{$name}-error");
          @extend %base-transition;
        }
      }

      .input__value,
      .input__placeholder {
        color: inherit;
        @extend %base-transition;
      }
    }
  }
}

.input {
  box-sizing: border-box;
  position: relative;

  @include defineInputSizes();
  @include defineThemes(primary secondary);

  &__placeholder {
    position: absolute;
    display: block;
    transform-origin: left top;
    pointer-events: none;
    z-index: 0;
  }

  &__field {
    display: flex;
    align-items: center;
    gap: px2rem(map.get($gap, "xs"));
    height: 100%;

    &-icon {
      height: max-content;
    }
  }

  &__value {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    flex: 1 0 0;
    @include box(100%);
    padding-top: px2rem(map.get($spacing, "sm"));
    outline: none;
    border: none;
    background: none;
    @extend %base-transition;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: auto;
    pointer-events: all;
    z-index: 1;

    &::selection {
      @include themify($themes) {
        color: themed("selection.label") !important;
        background: themed("selection.background") !important;
      }
    }
  }
}
</style>
