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

import type { InputProps } from "./input";

import ControlButton from "@/components/atoms/buttons/ControlButton.vue";
import Text from "@/components/atoms/typography/Text.vue";
import AnimatedWrapper from "@/components/atoms/containers/AnimatedWrapper.vue";

const props = withDefaults(defineProps<InputProps>(), {
  variant: "default",
  color: "primary",
  size: "lg",
  type: "text",
  isError: false,
  isDisabled: false,
  isRestButtonEnabled: true,
  autocomplete: "off",
  errorMessage: null,
});

const emit = defineEmits<{
  (e: "focused", isFocused: boolean): void;
  (e: "update:value", value: string): void;
  (e: "reset:value"): void;
}>();

defineOptions({ inheritAttrs: false });

const refInput = ref<HTMLInputElement | null>(null);
const refPlaceholder = ref<HTMLLabelElement | null>(null);
const refMessage = ref<HTMLDivElement | null>(null);

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

const onAnimErrorMessage = (
  message: HTMLSpanElement | null,
  durationFactor = 1
) => {
  const messageHeight = message?.clientHeight || 0;
  const isError = !!props.errorMessage || props.isError;

  const OPACITY_IN = 1,
    OPACITY_OUT = 0,
    POS_Y_IN = 0,
    POS_Y_OUT = messageHeight;

  if (message) {
    g.to(message, {
      opacity: isError ? OPACITY_IN : OPACITY_OUT,
      y: isError ? POS_Y_IN : POS_Y_OUT,
      duration: 0.1 * durationFactor,
      ease: "power4.out",
    });
  }
};

const animate = (durationFactor = 1): void => {
  const placeholder = refPlaceholder.value;
  const input = refInput.value;
  const message = refMessage.value;
  const value = toValue(localModelValue);
  const isFocused = toValue(isLocalFocused);

  onAnimPlaceholder(placeholder, durationFactor, isFocused, value);
  onAnimInputValue(input, durationFactor, isFocused, value);
  onAnimErrorMessage(message, durationFactor);
};

watch([isLocalFocused, localModelValue], () => {
  animate(1);
});

onMounted(() => {
  animate(0);
});
</script>

<template>
  <AnimatedWrapper
    :content-key="String(errorMessage)"
    :duration="0.3"
    class="input"
    data-testid="input"
    :class="[
      `input_variant-${variant}`,
      `input_color-${String(color)}`,
      {
        [`input_size-${String(size)}`]: size,
        [`input_error`]: isError,
        [`input_disabled`]: isDisabled,
        [`input_focused`]: isLocalFocused,
      },
    ]"
  >
    <div class="input__field" @pointerdown="onFocus">
      <label
        v-if="placeholder || placeholder === ''"
        ref="refPlaceholder"
        :for="id"
        class="input__field-placeholder"
        >{{ placeholder }}
      </label>
      <div class="input__field-content">
        <div v-if="$slots.icon" class="input__field-content-icon">
          <slot name="icon"></slot>
        </div>
        <input
          :id
          ref="refInput"
          v-model="localModelValue"
          :type
          class="input__field-value"
          data-testid="input-value"
          :dataCy
          :areaPlaceholder="areaPlaceholder ?? placeholder"
          :disabled="isDisabled"
          :autocomplete
          :spellcheck="'false'"
          @change="onChange"
        />
        <slot name="controls"></slot>
        <ControlButton
          v-if="isResetButtonShown"
          type="reset"
          data-testid="input__field-reset-button"
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
    <div ref="refMessage" class="input__error">
      <Text
        v-if="!!errorMessage"
        class="input__error-message"
        :variant="'caption-2'"
        >{{ errorMessage.toLowerCase() }}</Text
      >
    </div>
  </AnimatedWrapper>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineInputSizes($map: $input) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $value-font-style: get($val, "elements.value.font-style.value");
      $placeholder-font-style: get(
        $val,
        "elements.placeholder.font-style.value"
      );
      $error-font-style: get($val, "elements.error.font-style.value");

      $value-padding-top: px2rem(get($val, "elements.value.padding-top.value"));

      $height: get($val, "self.height.value");
      $whole-height: get($val, "self.whole-height.value");
      $padding: get($val, "self.padding.value");
      $border-radius: get($val, "self.border-radius.value");
      $error-padding: get($val, "elements.error.padding.value");

      &_variant-#{$variant} {
        &.input_size-#{$size} {
          .input__field {
            height: $height;
            padding: $padding;
            border-radius: $border-radius;
          }

          .input__field-value {
            padding-top: $value-padding-top;
            @extend %t__#{$value-font-style};
          }

          .input__field-placeholder {
            @extend %t__#{$placeholder-font-style};
          }

          .input__error {
            padding: $error-padding;

            &-message {
              @extend %t__#{$error-font-style};
            }
          }
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      &:focus {
        .input__field {
          @include themify($themes) {
            outline: get($outline, "value") solid
              themed("input.#{$name}.border.outline.value");
          }
        }
      }

      &:not(.input_disabled) {
        .input__field {
          @include themify($themes) {
            color: themed("input.#{$name}.label.normal.value");
            background-color: themed("input.#{$name}.background.normal.value");
            @extend %base-transition;
          }
        }
      }

      &.input_focused {
        .input__field {
          @include themify($themes) {
            color: themed("input.#{$name}.label.focused.value");
            background-color: themed("input.#{$name}.background.focused.value");
            @extend %base-transition;
          }
        }
      }

      &.input_disabled {
        .input__field {
          @include themify($themes) {
            color: themed("input.#{$name}.label.disabled.value");
            background-color: themed(
              "input.#{$name}.background.disabled.value"
            );
            @extend %base-transition;
          }
        }
      }

      &.input_error {
        .input__field {
          @include themify($themes) {
            color: themed("input.#{$name}.label.error.value");
            background-color: themed("input.#{$name}.background.error.value");
            @extend %base-transition;
          }
        }
      }

      .input__field-value,
      .input__field-placeholder {
        color: inherit;
        @extend %base-transition;
      }

      .input__error {
        &-message {
          @include themify($themes) {
            color: themed("input.#{$name}.label.error.value");
            @extend %base-transition;
          }
        }
      }
    }
  }
}

.input {
  box-sizing: border-box;
  position: relative;

  @include defineInputSizes();
  @include defineThemes(map.keys(get($themes, "light.input")));

  &__field {
    box-sizing: border-box;
    position: relative;

    &-placeholder {
      position: absolute;
      display: block;
      transform-origin: left top;
      pointer-events: none;
      z-index: 0;
    }

    &-content {
      display: flex;
      align-items: center;
      gap: px2rem(get($gap, "xs.value"));
      height: 100%;

      &-icon {
        height: max-content;
      }
    }

    &-value {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      flex: 1 0 0;
      @include box(100%);
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
          color: themed("selection.default.label.value") !important;
          background: themed("selection.default.background.value") !important;
        }
      }
    }
  }
}
</style>
