<script setup lang="ts">
import { onMounted, onUnmounted, toValue, ref, watch } from "vue";
import g from "gsap";

import tokens from "@/tokens";

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "default",
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

const isHovered = ref(false);
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
    scale: isPressed ? props.scalePressed : 1,
    duration: 0.05,
    ease: isPressed ? "power4.out" : "power4.in",
  });
};

watch(localIsPressed, (isPressed) => {
  const el = toValue(refRoot);
  if (el) onAnim(el, isPressed);
});

/* * * Gestures * * */

const onPointerEneter = (e: PointerEvent): void => {
  e.preventDefault();
  e.stopImmediatePropagation();

  isHovered.value = true;
};

const onPointerLeave = (e: PointerEvent): void => {
  e.preventDefault();
  e.stopImmediatePropagation();

  isHovered.value = false;
};

const addEventListeners = (): void => {
  const el = refRoot.value;
  if (!el) return;

  el.addEventListener("pointerenter", onPointerEneter);
  el.addEventListener("pointerleave", onPointerLeave);
};

const removeEventListeners = (): void => {
  const el = refRoot.value;
  if (!el) return;

  el.removeEventListener("pointerenter", onPointerEneter);
  el.removeEventListener("pointerleave", onPointerLeave);
};

onMounted(() => {
  addEventListeners();
});

onUnmounted(() => {
  removeEventListeners();
});
</script>

<script lang="ts">
import type {
  UIElementDirection,
  UIElementColor,
  UIElementStretch,
} from "@/typings";

import type {
  IconName,
  IconStyle,
  IconWeight,
} from "@/components/base/icons/icons";
import Icon from "@/components/base/icons/Icon.vue";

export type Variant = keyof typeof tokens.button;

export type Size = keyof typeof tokens.button.rounded;

export type Color = Extract<
  UIElementColor,
  "primary" | "primary-inversed" | "secondary" | "accent" | "error"
>;

export type Stretch = UIElementStretch;

export type ContentDirection = UIElementDirection;

export interface Props {
  as?: string;
  variant?: Variant;
  size: Size;
  color: Color;
  label?: string;
  contentDirection?: ContentDirection;
  prependIconName?: IconName;
  prependIconStyle?: IconStyle;
  prependIconWeight?: IconWeight;
  appendIconName?: IconName;
  appendIconStyle?: IconStyle;
  appendIconWeight?: IconWeight;
  scalePressed?: number;
  isDisabled?: boolean;
  stretch?: Stretch;
}
</script>

<template>
  <component
    :is="componentTag"
    ref="refRoot"
    role="button"
    class="button"
    data-testid="button"
    :class="[
      {
        [`button_direction-${contentDirection}`]: !!contentDirection,
        [`button_color-${color}`]: !!color,
        [`button_hovered`]: isHovered,
        [`button_disabled`]: isDisabled,
        [`button_size-${String(size)}`]: !!size,
        [`button_variant-${variant}`]: !!variant,
        [`button_stretch-${stretch}`]: !!stretch,
        button_pressed: localIsPressed,
      },
    ]"
    :aria-label="label ?? prependIconName ?? appendIconName"
    :aria-disabled="isDisabled"
    @pointerdown="onDown"
    @pointerup="onUp"
  >
    <Icon
      v-if="prependIconName"
      :name="prependIconName"
      :style="prependIconStyle"
      :weight="prependIconWeight"
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
    ></Icon>
  </component>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineButtonSizes($map: $button) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $button-size: px2rem(map.get($val, "size"));
      $font-style: map.get($val, "font-style");
      $icon-size: px2rem(map.get($val, "icon-size"));
      $gap: px2rem(map.get($val, "gap"));
      $border-radius: map.get($val, "border-radius");
      $padding: map.get($val, "padding");

      &.button_variant-#{$variant} {
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

          .icon {
            @include box($icon-size);
            fill: inherit;
            @extend %base-transition;
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
        color: themed("button.label-#{$name}-normal");
        fill: themed("button.label-#{$name}-normal");
        background-color: themed("button.background-#{$name}-normal");
      }
      @extend %base-transition;

      &.button_hovered {
        @include themify($themes) {
          background-color: themed("button.background-#{$name}-hovered");
        }

        .button__label {
          @include themify($themes) {
            color: themed("button.label-#{$name}-hovered");
            fill: themed("button.label-#{$name}-hovered");
          }
        }
      }

      &.button_pressed {
        @include themify($themes) {
          background-color: themed("button.background-#{$name}-pressed");
        }

        .button__label {
          @include themify($themes) {
            color: themed("button.label-#{$name}-pressed");
            fill: themed("button.label-#{$name}-pressed");
          }
        }
      }

      &.button_disabled {
        @include themify($themes) {
          background-color: themed("button.background-#{$name}-disabled");
          opacity: 0.5;
        }

        .button__label {
          @include themify($themes) {
            color: themed("button.label-#{$name}-disabled");
            fill: themed("button.label-#{$name}-disabled");
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
  @include defineThemes(primary primary-inversed secondary accent error);

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
