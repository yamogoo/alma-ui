<script setup lang="ts">
import {
  toValue,
  ref,
  watch,
  computed,
  type ComputedRef,
  useTemplateRef,
} from "vue";
import g from "gsap";

import tokens from "@/tokens";

import { useHover } from "@/composables/local";

import { Icon, type ButtonProps, type IconSize } from "@/components/atoms";

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "default",
  as: "button",
  size: "md",
  tone: "neutral",
  mode: "primary",
  contentDirection: "ltr",
  prependIconStyle: "outline",
  prependIconWeight: "500",
  appendIconStyle: "outline",
  appendIconWeight: "500",
  scalePressed: 0.95,
});

defineOptions({
  inheritAttrs: true,
});

const emit = defineEmits<{
  (e: "pointerdown", ev: PointerEvent): void;
  (e: "pointerup", ev: PointerEvent): void;
}>();

const refRoot = useTemplateRef<HTMLButtonElement | null>("root");

const componentTag = props.as;

const { isHovered } = useHover(refRoot);
const localIsPressed = ref(false);

const computedButtonSize: ComputedRef<IconSize> = computed(
  () =>
    tokens.button[props.variant][props.size].elements.icon.alias.size
      .value as IconSize
);

const onDown = (e: PointerEvent): void => {
  localIsPressed.value = true;
  emit("pointerdown", e);
};

const onUp = (e: PointerEvent): void => {
  localIsPressed.value = false;
  emit("pointerup", e);
};

/* * * Animations * * */

const onAnim = (el: HTMLButtonElement, isPressed: boolean): void => {
  g.to(el, {
    scale: isPressed ? props.scalePressed : 1,
    duration: 0.05,
    ease: isPressed ? "power4.out" : "power4.in",
  });
};

watch(localIsPressed, (isPressed) => {
  const el = toValue(refRoot);
  if (el) onAnim(el, isPressed);
});
</script>

<template>
  <component
    :is="componentTag"
    ref="root"
    role="button"
    class="button"
    :class="[
      {
        [`button_variant-${variant}`]: !!variant,
        [`button_size-${size}`]: !!size,
        [`button_mode-${mode}`]: !!mode,
        [`button_tone-${tone}`]: !!tone,
        [`button_direction-${contentDirection}`]: !!contentDirection,
        [`button_stretch-${stretch}`]: !!stretch,
        [`button_hovered`]: isHovered,
        [`button_disabled`]: isDisabled,
        button_pressed: localIsPressed,
      },
    ]"
    data-testid="button"
    :aria-label="label ?? prependIconName ?? appendIconName"
    :aria-disabled="isDisabled"
    @pointerdown="onDown"
    @pointerup="onUp"
  >
    <Icon
      v-if="prependIconName"
      :data-testid="'button__icon'"
      :name="prependIconName"
      :style="prependIconStyle"
      :weight="prependIconWeight"
      :size="iconSize ?? computedButtonSize"
    ></Icon>
    <slot name="prepend-icon"></slot>
    <div v-if="$slots.content" class="button__content">
      <slot name="content"></slot>
    </div>
    <span v-if="label" class="button__label" data-testid="button-label">{{
      label
    }}</span>
    <slot name="append-icon"></slot>
    <Icon
      v-if="appendIconName"
      :name="appendIconName"
      :style="appendIconStyle"
      :weight="appendIconWeight"
      :size="iconSize ?? computedButtonSize"
    ></Icon>
  </component>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineButtonSizes($map: $button) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $button-size: px2rem(get($val, "self.size"));
      $gap: px2rem(get($val, "self.gap"));
      $border-radius: get($val, "self.border-radius");
      $padding: get($val, "self.padding");

      $font-style: get($val, "elements.label.font-style");
      $icon-size: px2rem(get($val, "elements.icon.size"));

      &_variant-#{$variant} {
        &.button_size-#{$size} {
          gap: $gap;
          height: $button-size;
          min-height: $button-size;
          border-radius: $border-radius;

          &.button_variant-default {
            padding: $padding;
          }

          &.button_variant-rounded,
          &.button_variant-squared {
            width: $button-size !important;
          }

          .button__label {
            @extend %t__#{$font-style};
            line-height: 1;
          }
        }
      }
    }
  }
}

@mixin defineThemes($map: get($themes, "light.button")) {
  @each $tone, $modes in $map {
    @each $mode, $val in $modes {
      &_tone-#{$tone} {
        &.button_mode-#{$mode} {
          @include themify($themes) {
            color: themed("button.#{$tone}.#{$mode}.elements.label.normal");
            fill: themed("button.#{$tone}.#{$mode}.elements.label.normal");
            background-color: themed(
              "button.#{$tone}.#{$mode}.self.background.normal"
            );
            border: $outline solid
              themed("button.#{$tone}.#{$mode}.self.border.normal");
          }
          @extend %base-transition;

          &:focus {
            @include themify($themes) {
              outline: $outline solid
                themed("button.#{$tone}.#{$mode}.self.border.outline");
            }
          }

          &.button_hovered {
            @include themify($themes) {
              background-color: themed(
                "button.#{$tone}.#{$mode}.self.background.hovered"
              );
              border: $outline solid
                themed("button.#{$tone}.#{$mode}.self.border.hovered");
            }

            .button__label {
              @include themify($themes) {
                color: themed(
                  "button.#{$tone}.#{$mode}.elements.label.hovered"
                );
                fill: themed("button.#{$tone}.#{$mode}.elements.label.hovered");
              }
            }
          }

          &.button_pressed {
            @include themify($themes) {
              background-color: themed(
                "button.#{$tone}.#{$mode}.self.background.pressed"
              );
              border: $outline solid
                themed("button.#{$tone}.#{$mode}.self.border.pressed");
            }

            .button__label {
              @include themify($themes) {
                color: themed(
                  "button.#{$tone}.#{$mode}.elements.label.pressed"
                );
                fill: themed("button.#{$tone}.#{$mode}.elements.label.pressed");
              }
            }
          }

          &.button_disabled {
            @include themify($themes) {
              background-color: themed(
                "button.#{$tone}.#{$mode}.self.background.disabled"
              );
              border: $outline solid
                themed("button.#{$tone}.#{$mode}.self.border.disabled");
            }

            .button__label {
              @include themify($themes) {
                color: themed(
                  "button.#{$tone}.#{$mode}.elements.label.disabled"
                );
                fill: themed(
                  "button.#{$tone}.#{$mode}.elements.label.disabled"
                );
              }
            }
          }
        }
      }
    }
  }
}

.button {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  user-select: none;
  @extend %base-transition;

  @include defineButtonSizes();
  @include defineThemes();

  &__label {
    @extend %base-transition;
  }

  &__skeleton {
    position: absolute;
    inset: 0;
  }
  /* * * Directions * * */

  &_direction-ltr {
    flex-direction: row;
  }

  &_direction-rtl {
    flex-direction: row-reverse;
  }

  /* * * Sizes * * */

  &_variant-rounded {
    overflow: hidden;
  }

  &_stretch-fill {
    width: 100%;
  }
}
</style>
