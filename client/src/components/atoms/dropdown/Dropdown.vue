<script setup lang="ts">
import { onMounted, ref, watch, toValue } from "vue";
import g from "gsap";

import { useClickOutside } from "@/composables/local";

import type { DropdownProps } from "./dropdown";

import Icon from "@/components/atoms/icons/Icon.vue";

const props = withDefaults(defineProps<DropdownProps>(), {
  variant: "default",
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

<script lang="ts"></script>

<template>
  <div
    ref="refRoot"
    class="dropdown"
    role="menu"
    data-testid="dropdown"
    :class="[
      {
        [`dropdown_${variant}`]: !!variant,
        [`dropdown_${String(size)}`]: !!size,
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
      $min-width: px2rem(get($val, "self.min-width.value"));
      $height: px2rem(get($val, "self.height.value"));

      $value-gap: px2rem(get($val, "elements.value.self.gap.value"));
      $value-padding: get($val, "elements.value.self.padding.value");
      $value-border-radius: px2rem(
        get($val, "elements.value.self.border-radius.value")
      );
      $value-font-style: get(
        $val,
        "elements.value.elements.label.font-style.value"
      );
      $value-icon-size: px2rem(
        get($val, "elements.value.elements.icon.size.value")
      );

      $options-border-radius: px2rem(
        get($val, "elements.options.border-radius.value")
      );
      $options-padding: get($val, "elements.options.padding.value");

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
              "drop-down.#{$name}.value.background.normal.value"
            );
          }

          &-label {
            @include themify($themes) {
              color: themed("drop-down.#{$name}.value.label.normal.value");
            }
          }

          &-icon {
            @include themify($themes) {
              fill: themed("drop-down.#{$name}.value.icon.normal.value");
            }
          }

          &:hover {
            @include themify($themes) {
              background-color: themed(
                "drop-down.#{$name}.value.background.hovered.value"
              );
            }

            &-label {
              @include themify($themes) {
                color: themed("drop-down.#{$name}.value.label.hovered.value");
              }
            }

            &-icon {
              @include themify($themes) {
                fill: themed("drop-down.#{$name}.value.icon.hovered.value");
              }
            }
          }
        }
      }

      &.dropdown_expanded {
        .dropdown__value {
          @include themify($themes) {
            background-color: themed(
              "drop-down.#{$name}.value.background.expanded.value"
            );
          }

          &-label {
            @include themify($themes) {
              color: themed("drop-down.#{$name}.value.label.expanded.value");
            }
          }

          &-icon {
            @include themify($themes) {
              fill: themed("drop-down.#{$name}.value.icon.expanded.value");
            }
          }

          &:hover {
            @include themify($themes) {
              background-color: themed(
                "drop-down.#{$name}.value.background.expanded-hovered.value"
              );
            }

            &-label {
              @include themify($themes) {
                color: themed(
                  "drop-down.#{$name}.value.label.expanded-hovered.value"
                );
              }
            }

            &-icon {
              @include themify($themes) {
                fill: themed(
                  "drop-down.#{$name}.value.icon.expanded-hovered.value"
                );
              }
            }
          }
        }

        .dropdown__options {
          @include themify($themes) {
            background-color: themed(
              "drop-down.#{$name}.options.background.normal.value"
            );
          }

          &:hover {
            @include themify($themes) {
              background-color: themed(
                "drop-down.#{$name}.options.background.hovered.value"
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
    gap: px2rem(get($spacing, "xs.value"));
    width: 100%;
    overflow: hidden;
  }

  &__value-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: px2rem(get($spacing, "xs.value"));
  }

  &__controlbar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: px2rem(get($spacing, "xs.value"));
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
