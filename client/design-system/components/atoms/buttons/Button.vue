<script setup lang="ts">
import { toValue, ref, watch, computed, type ComputedRef } from "vue";
import g from "gsap";

import tokens from "@/tokens";

import { useHover } from "@/composables/local";

import { Icon, type ButtonProps, type IconSize } from "@/components/atoms";

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "default",
  as: "button",
  size: "md",
  color: "primary",
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

const refRoot = ref<HTMLButtonElement | null>(null);

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
    ref="refRoot"
    role="button"
    class="button"
    :class="[
      {
        [`button_variant-${variant}`]: !!variant,
        [`button_size-${String(size)}`]: !!size,
        [`button_color-${color}`]: !!color,
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
      $button-size: px2rem(get($val, "self.size.value"));
      $gap: px2rem(get($val, "self.gap.value"));
      $border-radius: get($val, "self.border-radius.value");
      $padding: get($val, "self.padding.value");

      $font-style: get($val, "elements.label.font-style.value");
      $icon-size: px2rem(get($val, "elements.icon.size.value"));

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

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      @include themify($themes) {
        color: themed("button.#{$name}.elements.label.normal.value");
        fill: themed("button.#{$name}.elements.label.normal.value");
        background-color: themed(
          "button.#{$name}.self.background.normal.value"
        );
      }
      @extend %base-transition;

      &:focus {
        @include themify($themes) {
          outline: get($outline, "value") solid
            themed("button.#{$name}.self.border.outline.value");
        }
      }

      &.button_hovered {
        @include themify($themes) {
          background-color: themed(
            "button.#{$name}.self.background.hovered.value"
          );
        }

        .button__label {
          @include themify($themes) {
            color: themed("button.#{$name}.elements.label.hovered.value");
            fill: themed("button.#{$name}.elements.label.hovered.value");
          }
        }
      }

      &.button_pressed {
        @include themify($themes) {
          background-color: themed(
            "button.#{$name}.self.background.pressed.value"
          );
        }

        .button__label {
          @include themify($themes) {
            color: themed("button.#{$name}.elements.label.pressed.value");
            fill: themed("button.#{$name}.elements.label.pressed.value");
          }
        }
      }

      &.button_disabled {
        @include themify($themes) {
          background-color: themed(
            "button.#{$name}.self.background.disabled.value"
          );
        }

        .button__label {
          @include themify($themes) {
            color: themed("button.#{$name}.elements.label.disabled.value");
            fill: themed("button.#{$name}.elements.label.disabled.value");
          }
        }
      }
    }
  }
}

.button {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  user-select: none;
  @extend %base-transition;

  @include defineButtonSizes();
  @include defineThemes(get-theme-keys(get($themes, "light.button")));

  &__label {
    @extend %base-transition;
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
