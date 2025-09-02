<script setup lang="ts" generic="T">
import tokens from "@/tokens";

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
export type Size = keyof typeof tokens.options.default;

export type Color = keyof typeof tokens.themes.dark.options;

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
        [`options_size-${size}`]: !!size,
        [`options_color-${color}`]: !!color,
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

@mixin defineSize($map: $options) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $option-font-style: get($val, "elements.option.font-style.value");
      $option-min-height: px2rem(get($val, "elements.option.min-height.value"));

      &_variant-#{$variant} {
        &.options_size-#{$size} {
          .options__option {
            min-height: $option-min-height;
            @extend %t__#{$option-font-style};
          }
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      .options__option {
        @include themify($themes) {
          color: themed("options.#{$name}.label.normal");
        }

        &:hover {
          @include themify($themes) {
            color: themed("options.#{$name}.label.hovered");
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
  @include defineThemes(map.keys(get($themes, "light.options")));

  &__option {
    list-style: none;
    cursor: pointer;
    @extend %base-transition;
  }
}
</style>
