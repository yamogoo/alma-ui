<script setup lang="ts">
import { onMounted, ref, watch, toValue } from "vue";
import g from "gsap";

import tokens from "@/tokens";

import { useClickOutside } from "@/composables/useClickOutside";

import type { UIElementColor } from "@/typings";

import Icon from "@/components/base/icons/Icon.vue";

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "primary",
  isResetButtonShown: false,
});

const refRoot = ref<HTMLDivElement | null>(null);

const isExpanded = ref(false);

useClickOutside(refRoot, () => {
  isExpanded.value = false;
});

const onExpand = (): void => {
  isExpanded.value = !isExpanded.value;
};

/* * * Animations * * */

const ARROW_ICON_ROTATION_EXPANDED = 0,
  ARROW_ICON_ROTATION_SHRINKED = 90;

const getIcon = (): HTMLDivElement | null => {
  if (!refRoot.value) return null;
  return refRoot.value.getElementsByClassName(
    "dropdown__value-icon"
  )[0] as HTMLDivElement;
};

const setIconState = (isExpanded: boolean, isAnimate = true): void => {
  const el = getIcon();
  if (el)
    isExpanded
      ? onAnimExpandIconIn(el, isAnimate ? 0.25 : 0)
      : onAnimExpandIconOut(el, isAnimate ? 0.15 : 0);
};

const onAnimExpandIconIn = (el: HTMLDivElement, duration: number): void => {
  g.fromTo(
    el,
    {
      rotate: ARROW_ICON_ROTATION_SHRINKED,
    },
    {
      rotate: ARROW_ICON_ROTATION_EXPANDED,
      duration,
      ease: "power4.out",
    }
  );
};

const onAnimExpandIconOut = (el: HTMLDivElement, duration: number): void => {
  g.to(el, {
    rotate: ARROW_ICON_ROTATION_SHRINKED,
    duration,
    ease: "power4.in",
  });
};

/* * * Options * * */

onMounted(() => {
  setIconState(toValue(isExpanded), false);
});

watch(
  isExpanded,
  (newIsExpanded) => {
    setIconState(newIsExpanded);
  },
  { immediate: true }
);

const onOptionClick = (): void => {
  if (props.closeOnOptionClick) isExpanded.value = false;
};
</script>

<script lang="ts">
export type Color = Extract<UIElementColor, "primary" | "secondary">;

export type Size = keyof typeof tokens.dropDown;

export interface Props {
  size?: Size;
  color?: Color;
  value: string;
  valuePostfix?: string;
  isResetButtonShown?: boolean;
  closeOnOptionClick?: boolean;
}
</script>

<template>
  <div
    ref="refRoot"
    class="dropdown"
    data-testid="dropdown"
    :class="[
      `dropdown_${isExpanded ? 'expanded' : 'normal'}`,
      {
        [`dropdown_${color}`]: !!color,
        [`dropdown_${size}`]: !!size,
      },
    ]"
  >
    <div class="dropdown__value" data-testid="dropdown-value" @click="onExpand">
      <div class="dropdown__value-container">
        <div class="dropdown__value-content">
          <span class="dropdown__value-label">{{ value }}</span
          ><span v-if="valuePostfix" class="dropdown__value-postfix">{{
            valuePostfix
          }}</span>
        </div>
        <Icon
          class="dropdown__value-icon"
          :name="'down'"
          :style="'outline'"
          :weight="'500'"
        ></Icon>
      </div>
    </div>
    <Transition :css="false">
      <div v-if="isExpanded" class="dropdown__options" @click="onOptionClick">
        <div v-if="$slots.controlbar" class="dropdown__controlbar">
          <slot name="controlbar"></slot>
        </div>
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: proto.$drop-down) {
  @each $size, $val in $map {
    $font-style: map.get($val, "font-style");
    $gap: px2rem(map.get($val, "gap"));
    $min-width: px2rem(map.get($val, "min-width"));
    $height: px2rem(map.get($val, "height"));
    $padding-v: px2rem(map.get($val, "padding-v"));
    $padding-h: px2rem(map.get($val, "padding-h"));
    $border-radius: px2rem(map.get($val, "border-radius"));

    $icon-size: px2rem(map.get($val, "icon-size"));

    &_#{$size} {
      min-width: $min-width;

      &.dropdown_normal {
        .dropdown__value {
          border-radius: $border-radius;
        }
      }

      &.dropdown_expanded {
        .dropdown__value {
          border-radius: $border-radius $border-radius 0 0;
        }
      }

      .dropdown__value {
        height: $height;
        gap: $gap;
        padding: $padding-v $padding-h;

        &-label {
          @extend %t__#{$font-style};
        }

        &-icon {
          @include box($icon-size);
        }
      }

      .dropdown__options {
        padding: $padding-v $padding-h;
        border-radius: 0 0 $border-radius $border-radius;
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_#{$name} {
      &.dropdown_normal {
        .dropdown__value {
          @include themify($themes) {
            background-color: themed(
              "drop-down.value-background-#{$name}-normal"
            );
          }

          &-label {
            @include themify($themes) {
              color: themed("drop-down.value-label-#{$name}-normal");
            }
          }

          &-icon {
            @include themify($themes) {
              fill: themed("drop-down.value-icon-#{$name}-normal");
            }
          }

          &:hover {
            @include themify($themes) {
              background-color: themed(
                "drop-down.value-background-#{$name}-hovered"
              );
            }

            &-label {
              @include themify($themes) {
                color: themed("drop-down.value-label-#{$name}-hovered");
              }
            }

            &-icon {
              @include themify($themes) {
                fill: themed("drop-down.value-icon-#{$name}-hovered");
              }
            }
          }
        }
      }

      &.dropdown_expanded {
        .dropdown__value {
          @include themify($themes) {
            background-color: themed(
              "drop-down.value-background-#{$name}-expanded"
            );
          }

          &-label {
            @include themify($themes) {
              color: themed("drop-down.value-label-#{$name}-expanded");
            }
          }

          &-icon {
            @include themify($themes) {
              fill: themed("drop-down.value-icon-#{$name}-expanded");
            }
          }

          &:hover {
            @include themify($themes) {
              background-color: themed(
                "drop-down.value-background-#{$name}-expanded-hovered"
              );
            }

            &-label {
              @include themify($themes) {
                color: themed(
                  "drop-down.value-label-#{$name}-expanded-hovered"
                );
              }
            }

            &-icon {
              @include themify($themes) {
                fill: themed("drop-down.value-icon-#{$name}-expanded-hovered");
              }
            }
          }
        }

        .dropdown__options {
          @include themify($themes) {
            background-color: themed(
              "drop-down.options-background-#{$name}-normal"
            );
          }

          &:hover {
            @include themify($themes) {
              background-color: themed(
                "drop-down.options-background-#{$name}-hovered"
              );
            }
          }
        }
      }
    }
  }
}

.dropdown {
  box-sizing: border-box;
  position: relative;
  user-select: none;

  @include defineSizes();
  @include defineThemes(primary secondary);

  &__value {
    box-sizing: border-box;
    align-content: center;
    width: 100%;
    cursor: pointer;

    &-label {
      display: block;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      flex: 1 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span,
    .dropdown__expand-icon,
    .dropdown__reset-icon {
      @extend %base-transition;
    }
  }

  &__value-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: px2rem(map.get($spacing, "xs"));
    width: 100%;
    overflow: hidden;
  }

  &__value-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: px2rem(map.get($spacing, "xs"));
  }

  &__controlbar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: px2rem(map.get($spacing, "xs"));
  }

  &__options {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-height: 332px;
    overflow: auto;
    z-index: 9999;

    &__content {
      overflow: hidden;
    }
  }

  .dropdown__value,
  .dropdown__options {
    @include transition(
      color background background-color fill stroke opacity,
      150ms,
      ease-out
    );
  }
}
</style>
