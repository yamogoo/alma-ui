<script setup lang="ts">
import { onMounted, ref, watch, toValue, useTemplateRef } from "vue";
import g from "gsap";

import { useClickOutside } from "@/composables/local";

import type { DropdownProps } from "./dropdown";

import { Icon } from "@/components/atoms";

const props = withDefaults(defineProps<DropdownProps>(), {
  variant: "default",
  size: "md",
  color: "primary",
  isResetButtonShown: false,
});

const refRoot = useTemplateRef<HTMLDivElement | null>("root");

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

<script lang="ts"></script>

<template>
  <div
    ref="root"
    class="dropdown"
    role="menu"
    data-testid="dropdown"
    :class="[
      {
        [`dropdown_${variant}`]: !!variant,
        [`dropdown_${size}`]: !!size,
        [`dropdown_${color}`]: !!color,
      },
      `dropdown_${isExpanded ? 'expanded' : 'normal'}`,
    ]"
    :aria-expanded="isExpanded"
  >
    <div
      class="dropdown__value"
      data-testid="dropdown-value"
      aria-haspopup="listbox"
      @click="onExpand"
    >
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

@mixin defineSizes($map: $drop-down) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $min-width: px2rem(get($val, "self.min-width"));
      $height: px2rem(get($val, "self.height"));

      $value-gap: px2rem(get($val, "elements.current-value.self.gap"));
      $value-padding: get($val, "elements.current-value.self.padding");
      $value-border-radius: px2rem(
        get($val, "elements.current-value.self.border-radius")
      );
      $value-font-style: get(
        $val,
        "elements.current-value.elements.label.font-style"
      );
      $value-icon-size: px2rem(
        get($val, "elements.current-value.elements.icon.size")
      );

      $options-border-radius: px2rem(
        get($val, "elements.options.border-radius")
      );
      $options-padding: get($val, "elements.options.padding");

      &_variant-#{$variant} {
        &.dropdown_size-#{$size} {
          min-width: $min-width;

          &.dropdown_normal {
            .dropdown__value {
              border-radius: $value-border-radius;
            }
          }

          &.dropdown_expanded {
            .dropdown__value {
              border-radius: $value-border-radius $value-border-radius 0 0;
            }
          }

          .dropdown__value {
            height: $height;
            gap: $value-gap;
            padding: $value-padding;

            &-label {
              @extend %t__#{$value-font-style};
            }

            &-icon {
              @include box($value-icon-size);
            }
          }

          .dropdown__options {
            padding: $options-padding;
            border-radius: 0 0 $options-border-radius $options-border-radius;
          }
        }
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
              "drop-down.#{$name}.current-value.background.normal"
            );
          }

          &-label {
            @include themify($themes) {
              color: themed("drop-down.#{$name}.current-value.label.normal");
            }
          }

          &-icon {
            @include themify($themes) {
              fill: themed("drop-down.#{$name}.current-value.icon.normal");
            }
          }

          &:hover {
            @include themify($themes) {
              background-color: themed(
                "drop-down.#{$name}.current-value.background.hovered"
              );
            }

            &-label {
              @include themify($themes) {
                color: themed("drop-down.#{$name}.current-value.label.hovered");
              }
            }

            &-icon {
              @include themify($themes) {
                fill: themed("drop-down.#{$name}.current-value.icon.hovered");
              }
            }
          }
        }
      }

      &.dropdown_expanded {
        .dropdown__value {
          @include themify($themes) {
            background-color: themed(
              "drop-down.#{$name}.current-value.background.expanded"
            );
          }

          &-label {
            @include themify($themes) {
              color: themed("drop-down.#{$name}.current-value.label.expanded");
            }
          }

          &-icon {
            @include themify($themes) {
              fill: themed("drop-down.#{$name}.current-value.icon.expanded");
            }
          }

          &:hover {
            @include themify($themes) {
              background-color: themed(
                "drop-down.#{$name}.current-value.background.expanded-hovered"
              );
            }

            &-label {
              @include themify($themes) {
                color: themed(
                  "drop-down.#{$name}.current-value.label.expanded-hovered"
                );
              }
            }

            &-icon {
              @include themify($themes) {
                fill: themed(
                  "drop-down.#{$name}.current-value.icon.expanded-hovered"
                );
              }
            }
          }
        }

        .dropdown__options {
          @include themify($themes) {
            background-color: themed(
              "drop-down.#{$name}.options.background.normal"
            );
          }

          &:hover {
            @include themify($themes) {
              background-color: themed(
                "drop-down.#{$name}.options.background.hovered"
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
  @include defineThemes(map.keys(get($themes, "light.drop-down")));

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
    gap: px2rem(get($spacing, "xs"));
    width: 100%;
    overflow: hidden;
  }

  &__value-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: px2rem(get($spacing, "xs"));
  }

  &__controlbar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: px2rem(get($spacing, "xs"));
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
