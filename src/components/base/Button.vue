<script setup lang="ts">
import { ref, toValue, watch } from "vue";
import g from "gsap";

import type {
  UIElementSize,
  UIElementDirection,
  UIElementColor,
} from "@/typings";

import type {
  SymbolName,
  SymbolStyle,
  SymbolWeight,
} from "@/components/base/icons/symbols";
import BaseSymbol from "@/components/base/icons/BaseSymbol.vue";

withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  color: "primary",
  contentDirection: "ltr",
  prependIconStyle: "outline",
  prependIconWeight: "600",
  appendIconStyle: "outline",
  appendIconWeight: "600",
});

defineOptions({
  inheritAttrs: true,
});

const emit = defineEmits<{
  (e: "pointerdown", ev: PointerEvent): void;
  (e: "pointerup", ev: PointerEvent): void;
}>();

const refRoot = ref<HTMLButtonElement | null>(null);

const localIsPressed = ref();

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
    scale: isPressed ? 0.95 : 1,
    duration: 0.05,
    ease: isPressed ? "power4.out" : "power4.in",
  });
};

watch(localIsPressed, (isPressed) => {
  const el = toValue(refRoot);
  if (el) onAnim(el, isPressed);
});
</script>

<script lang="ts">
export type ButtonVariant = "default" | "rounded";

export type ButtonSize = Extract<UIElementSize, "xs" | "sm" | "md" | "lg">;

export type ButtonColor = Extract<
  UIElementColor,
  | "primary"
  | "primary-inversed"
  | "primary-transparent"
  | "accent"
  | "accept"
  | "error"
>;

export type ButtonContentDirection = UIElementDirection;

export interface Props {
  variant?: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  label?: string;
  contentDirection?: ButtonContentDirection;
  prependIconName?: SymbolName;
  prependIconStyle?: SymbolStyle;
  prependIconWeight?: SymbolWeight;
  appendIconName?: SymbolName;
  appendIconStyle?: SymbolStyle;
  appendIconWeight?: SymbolWeight;
}
</script>

<template>
  <button
    ref="refRoot"
    class="button"
    data-testid="button"
    :class="[
      {
        [`button_variant-${variant}`]: !!variant,
        [`button_size-${size}`]: !!size,
        [`button_color-${color}`]: !!color,
        [`button_content-direction-${contentDirection}`]: !!contentDirection,
        button_pressed: localIsPressed,
      },
    ]"
    :aria-label="label ?? prependIconName"
    @pointerdown="onDown"
    @pointerup="onUp"
  >
    <BaseSymbol
      v-if="prependIconName"
      :name="prependIconName"
      :style="prependIconStyle"
      :weight="prependIconWeight"
    ></BaseSymbol>
    <div v-if="$slots.content" class="button__content">
      <slot name="content"></slot>
    </div>
    <span v-if="label" class="button__label" data-testid="button-label">{{
      label
    }}</span>
    <BaseSymbol
      v-if="appendIconName"
      :name="appendIconName"
      :style="appendIconStyle"
      :weight="appendIconWeight"
    ></BaseSymbol>
  </button>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineButtonSizes($map: $button) {
  @each $size, $val in $map {
    $button-size: px2rem(map.get($val, "size"));
    $font-style: map.get($val, "font-style");
    $icon-size: px2rem(map.get($val, "icon-size"));
    $gap: px2rem(map.get($val, "gap"));
    $padding: map.get($val, "padding");

    &_size-#{$size} {
      gap: $gap;
      height: $button-size;
      min-height: $button-size;

      &.button_variant-default {
        padding: $padding;
      }

      &.button_variant-rounded {
        width: $button-size;
      }

      .button__label {
        @extend %t__#{$font-style};
        line-height: 1;
      }

      .icon {
        @include box($icon-size);
        fill: inherit;
      }
    }
  }
}

@mixin defineTheme($names) {
  @each $name in $names {
    &_#{$name} {
      @include themify($themes) {
        color: themed("button", "label-#{$name}-normal");
        fill: themed("button", "label-#{$name}-normal");
        background-color: themed("button", "background-#{$name}-normal");
      }

      &:not(.button_pressed):hover {
        @include themify($themes) {
          background-color: themed("button", "background-#{$name}-hovered");
        }
      }

      &_pressed {
        @include themify($themes) {
          background-color: themed("button", "background-#{$name}-pressed");
        }
      }
    }
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: px2rem(map.get(map.get($button, "lg"), "roundness"));
  border: none;
  @extend %base-transition;

  @include themify($themes) {
    box-shadow: 0px 0px 16px themed("background", "base");
  }

  @include defineButtonSizes();
  @include defineTheme(primary primary-inversed accent accept error);

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: px2rem(2px);
  }

  /* * * Directions * * */

  &_ltr {
    flex-direction: row;
  }

  &_rtl {
    flex-direction: row-reverse;
  }

  &_rounded {
    overflow: hidden;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
