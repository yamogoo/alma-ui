<script setup lang="ts">
import {
  useAttrs,
  useId,
  onMounted,
  watch,
  toValue,
  computed,
  useTemplateRef,
} from "vue";
import g from "gsap";

import tokens from "@/tokens";

import { usePressed } from "@/composables/local";

import type { ToggleSwitchProps } from "@/components/atoms";

defineOptions({
  inheritAttrs: false,
});

useAttrs();

const props = withDefaults(defineProps<ToggleSwitchProps>(), {
  variant: "default",
  mode: "primary",
  size: "md",
  isActive: false,
  isDisabled: false,
  useNative: false,
});

const emit = defineEmits<{
  (e: "update:is-active", state: boolean): void;
}>();

const id = useId();

const refRoot = useTemplateRef<HTMLLabelElement | HTMLDivElement | null>(
  "root"
);
const refKnob = useTemplateRef<HTMLDivElement | null>("knob");

const { isPressed } = usePressed(refRoot);

const onChange = (e: Event): void => {
  if (props.isDisabled) return;

  const state = (e.target as HTMLInputElement).checked;
  emit("update:is-active", state);
};

const padding = computed(
  () =>
    tokens.atoms.toggleSwitch.default[`${props.size}`].elements.track.padding
      .value
);

const onKeyDown = (e: KeyboardEvent): void => {
  if (props.isDisabled) return;
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    emit("update:is-active", !props.isActive);
  }
};

watch(isPressed, (val) => {
  if (!val && !props.useNative) emit("update:is-active", !props.isActive);
});

/* * * Animations * * */

const onAnimateKnob = (duration = 0.25): void => {
  const width = ((refRoot.value?.clientWidth || 0) - toValue(padding) * 2) / 2;

  if (refKnob.value) {
    const knobPosX = props.isActive ? width : 0;

    g.to(refKnob.value, {
      x: knobPosX,
      duration,
      ease: "power4.out",
    });
  }
};

watch(
  () => props.isActive,
  () => {
    onAnimateKnob();
  }
);

onMounted(() => {
  if (refKnob.value) {
    onAnimateKnob(0.0);
  }
});
</script>

<template>
  <template v-if="!useNative">
    <div
      ref="root"
      :class="[
        'toggle-switch',
        `toggle-switch_variant-${variant}`,
        `toggle-switch_mode-${mode}`,
        `toggle-switch_size-${size}`,
        `toggle-switch_state-${isActive ? 'active' : 'normal'}`,
        { 'toggle-switch_disabled': isDisabled },
      ]"
      role="switch"
      :aria-labelledby="`label-${id}`"
      :aria-checked="isActive"
      :aria-disabled="isDisabled"
      tabindex="0"
      @keydown="onKeyDown"
    >
      <div class="toggle-switch__track">
        <div class="toggle-switch__track-container">
          <span ref="knob" class="toggle-switch__knob"></span>
        </div>
      </div>
      <span v-if="label" class="toggle-switch__label">{{ label }}</span>
    </div>
  </template>
  <template v-if="useNative">
    <label
      ref="root"
      :for="id"
      :class="[
        'toggle-switch',
        `toggle-switch_variant-${variant}`,
        `toggle-switch_mode-${mode}`,
        `toggle-switch_size-${size}`,
        `toggle-switch_state-${isActive ? 'active' : 'normal'}`,
        { 'toggle-switch_disabled': isDisabled },
      ]"
      :aria-labelledby="`label-${id}`"
      tabindex="0"
    >
      <input
        :id
        v-bind="$attrs"
        type="checkbox"
        :checked="isActive"
        @change="onChange"
      />
      <div class="toggle-switch__track">
        <div class="toggle-switch__track-container">
          <span ref="knob" class="toggle-switch__knob"></span>
        </div>
      </div>
      <span v-if="label" class="toggle-switch__label">{{ label }}</span>
    </label>
  </template>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: get($atoms, "toggle-switch")) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      &_variant-#{$variant} {
        &.toggle-switch_size-#{$size} {
          $gap: get($val, "self.gap");
          $width: px2rem(get($val, "self.width"));
          $height: px2rem(get($val, "self.height"));

          $track-padding: px2rem(get($val, "elements.track.padding"));
          $label-font-style: get($val, "elements.label.font-style");

          gap: $gap;

          .toggle-switch__track {
            @include box($width, $height);
            border-radius: $height;
            padding: $track-padding;
          }

          .toggle-switch__knob {
            @include box($height);
            border-radius: calc($height / 2);
          }

          .toggle-switch__label {
            @extend %t__#{$label-font-style};
          }
        }
      }
    }
  }
}

@mixin defineThemes($map: get($themes, "light.atoms.toggle-switch")) {
  @each $mode, $modes in $map {
    &_mode-#{$mode} {
      &:not(.toggle-switch_disabled) {
        &.toggle-switch_state {
          &-normal {
            .toggle-switch__track {
              @include themify($themes) {
                background-color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.track.normal"
                );
              }
            }

            .toggle-switch__knob {
              @include themify($themes) {
                background-color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.knob.normal"
                );
              }
            }

            .toggle-switch__label {
              @include themify($themes) {
                color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.label.normal"
                );
              }
            }
          }

          &-active {
            .toggle-switch__track {
              @include themify($themes) {
                background-color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.track.active"
                );
              }
            }

            .toggle-switch__knob {
              @include themify($themes) {
                background-color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.knob.active"
                );
              }
            }

            .toggle-switch__label {
              @include themify($themes) {
                color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.label.active"
                );
              }
            }
          }
        }
      }

      &.toggle-switch_disabled {
        &.toggle-switch_state {
          &-normal {
            .toggle-switch__track {
              @include themify($themes) {
                background-color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.track.disabled"
                );
              }
            }

            .toggle-switch__knob {
              @include themify($themes) {
                background-color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.knob.disabled"
                );
              }
            }

            .toggle-switch__label {
              @include themify($themes) {
                color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.label.disabled"
                );
              }
            }
          }

          &-active {
            .toggle-switch__track {
              @include themify($themes) {
                background-color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.track.disabled"
                );
              }
            }

            .toggle-switch__knob {
              @include themify($themes) {
                background-color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.knob.disabled"
                );
              }
            }

            .toggle-switch__label {
              @include themify($themes) {
                color: themed(
                  "atoms.toggle-switch.#{$mode}.elements.label.disabled"
                );
              }
            }
          }
        }
      }
    }
  }
}

.toggle-switch {
  box-sizing: border-box;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  cursor: pointer;
  @include box(max-content);

  @include defineSizes();
  @include defineThemes();

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  &__track {
    overflow: hidden;

    &-container {
      @include box(100%);
    }
  }

  &__knob {
    display: block;
  }
}
</style>
