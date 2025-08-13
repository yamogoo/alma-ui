<script setup lang="ts" generic="T">
import tokens from "@/tokens";

import type { UIElementColor } from "@/typings";

const props = withDefaults(defineProps<Props<T>>(), {
  isCurrentOptionShown: false,
});

const emit = defineEmits<{
  (e: "select", option: T): void;
}>();

const onSelect = (option: T): void => {
  emit("select", option);
};

const showCurrentOption = (key: T) => {
  if (!props.isCurrentOptionShown) {
    return key !== props.value;
  }

  return true;
};
</script>

<script lang="ts">
export type Size = keyof typeof tokens.options;

export type Color = Extract<UIElementColor, "primary" | "secondary">;

export type Items<T> = Array<T>;

export interface Props<T> {
  size?: Size;
  color?: Color;
  value: T;
  items: Items<T>;
  isCurrentOptionShown?: boolean;
}
</script>

<template>
  <ul
    class="options"
    :class="[
      {
        [`options_${size}`]: !!size,
        [`options_${color}`]: !!color,
      },
    ]"
  >
    <template v-for="key in items" :key="key">
      <li
        v-if="showCurrentOption(key)"
        class="options__option"
        data-testid="options__option"
        @click="onSelect(key)"
      >
        {{ `${typeof key === "string" && !$slots.default ? key : ""}` }}
        <slot :value="key"></slot>
      </li>
    </template>
  </ul>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSize($map: proto.$options) {
  @each $size, $val in $map {
    $option-font-style: map.get($val, "option-font-style");
    $option-min-height: px2rem(map.get($val, "option-min-height"));

    &_#{$size} {
      .options__option {
        min-height: $option-min-height;
        @extend %t__#{$option-font-style};
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_#{$name} {
      .options__option {
        @include themify($themes) {
          color: themed("options.label-#{$name}-normal");
        }

        &:hover {
          @include themify($themes) {
            color: themed("options.label-#{$name}-hovered");
          }
        }
      }
    }
  }
}

.options {
  margin: 0;
  padding: 0;

  @include defineSize();
  @include defineThemes(primary secondary);

  &__option {
    list-style: none;
    cursor: pointer;
    @extend %base-transition;
  }
}
</style>
