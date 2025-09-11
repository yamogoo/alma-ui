<script setup lang="ts">
import { useAttrs, useId, onMounted, ref, watch } from "vue";
import g from "gsap";

import tokens from "@/tokens";

import type { ToggleSwithProps } from "@/components/atoms";

defineOptions({
  inheritAttrs: false,
});

useAttrs();

const props = withDefaults(defineProps<ToggleSwithProps>(), {
  variant: "default",
  tone: "neutral",
  size: "md",
});

const emits = defineEmits<{
  (e: "update:state", state: boolean): void;
}>();

const id = useId();

const refRoot = ref<HTMLLabelElement | null>(null);
const refKnob = ref<HTMLDivElement | null>(null);

const onChange = (e: Event): void => {
  const state = (e.target as HTMLInputElement).checked;
  emits("update:state", state);
};

/* * * Animations * * */

const onAnimateKnob = (duration = 0.25): void => {
  const padding =
    tokens.toggleSwitch.default[`${props.size}`].elements.track.padding.value;
  const width = ((refRoot.value?.clientWidth || 0) - padding * 2) / 2;

  if (refKnob.value) {
    const knobPosX = props.state ? width : 0;

    g.to(refKnob.value, {
      x: knobPosX,
      duration,
      ease: "power4.out",
    });
  }
};

onMounted(() => {
  if (refKnob.value) {
    onAnimateKnob(0.0);
  }
});

watch(
  () => props.state,
  () => {
    onAnimateKnob();
  }
);
</script>

<template>
  <label
    ref="refRoot"
    :for="id"
    :class="[
      'toggle-switch',
      `toggle-switch_variant-${variant}`,
      `toggle-switch_tone-${tone}`,
      `toggle-switch_size-${size}`,
      `toggle-switch_state-${state ? 'active' : 'normal'}`,
    ]"
    aria-label="switch"
  >
    <input
      :id
      v-bind="$attrs"
      type="checkbox"
      :checked="state"
      @change="onChange"
    />
    <div class="toggle-switch__track">
      <div class="toggle-switch__track-container">
        <span ref="refKnob" class="toggle-switch__knob"></span>
      </div>
    </div>
    <span v-if="label" class="toggle-switch__label">{{ label }}</span>
  </label>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: $toggle-switch) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      &_variant-#{$variant} {
        &.toggle-switch_size-#{$size} {
          $gap: get($val, "self.gap.value");
          $width: px2rem(get($val, "self.width.value"));
          $height: px2rem(get($val, "self.height.value"));

          $track-padding: px2rem(get($val, "elements.track.padding.value"));
          $label-font-style: get($val, "elements.label.font-style.value");

          /* gap: $gap; */

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

@mixin defineThemes($map: get($themes, "light.toggle-switch")) {
  @each $tone, $modes in $map {
    &_tone-#{$tone} {
      &.toggle-switch_state {
        &-normal {
          .toggle-switch__track {
            @include themify($themes) {
              background-color: themed(
                "toggle-switch.#{$tone}.elements.track.normal.value"
              );
            }
          }

          .toggle-switch__knob {
            @include themify($themes) {
              background-color: themed(
                "toggle-switch.#{$tone}.elements.knob.normal.value"
              );
            }
          }

          .toggle-switch__label {
            @include themify($themes) {
              color: themed(
                "toggle-switch.#{$tone}.elements.label.normal.value"
              );
            }
          }
        }

        &-active {
          .toggle-switch__track {
            @include themify($themes) {
              background-color: themed(
                "toggle-switch.#{$tone}.elements.track.active.value"
              );
            }
          }

          .toggle-switch__knob {
            @include themify($themes) {
              background-color: themed(
                "toggle-switch.#{$tone}.elements.knob.active.value"
              );
            }
          }

          .toggle-switch__label {
            @include themify($themes) {
              color: themed(
                "toggle-switch.#{$tone}.elements.label.active.value"
              );
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
  flex-direction: column;
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
