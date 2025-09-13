<script setup lang="ts" generic="T">
import type { SimpleMenuProps } from "./simpleMenu";
import { MenuItem, type IMenuItem, Text } from "@/components/atoms";

withDefaults(defineProps<SimpleMenuProps<T>>(), {
  variant: "default",
  size: "lg",
  orientation: "horizontal",
});

const emit = defineEmits<{
  (e: "select", item: IMenuItem<T>): void;
  (e: "update:selected-item-id", id: number): void;
}>();

const onPress = (item: IMenuItem<T>): void => {
  emit("select", item);

  const { id } = item;
  emit("update:selected-item-id", id);
};
</script>

<template>
  <div
    class="simple-menu"
    :class="[
      `simple-menu_variant-${variant}`,
      `simple-menu_size-${size}`,
      `simple-menu_orientation-${orientation}`,
    ]"
  >
    <MenuItem
      v-for="item in items"
      :key="item.id"
      v-memo="item.id === selectedItemId"
      :is-active="item.id === selectedItemId"
      data-testid="simple-menu-item"
      @is-pressed="onPress(item)"
    >
      <Text
        :as="'span'"
        class="simple-menu__item-label"
        data-testid="simple-menu-item-label"
        >{{ item.label }}</Text
      >
    </MenuItem>
  </div>
</template>

<style lang="scss">
@mixin defineSizes($map: get($atoms, "simple-menu")) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      &_variant-#{$variant} {
        &.simple-menu_size-#{$size} {
          $gap: px2rem(get($val, "self.gap"));
          $padding: px2rem(get($val, "self.padding"));

          $label-font-style: get($val, "item-label.font-style");

          gap: $gap;
          padding: $padding;

          .simple-menu__item {
            &-label {
              @extend %t__#{$label-font-style};
            }
          }
        }
      }
    }
  }
}

.simple-menu {
  display: flex;
  @include defineSizes();

  &_orientation {
    &-horizontal {
      flex-direction: row;
    }

    &-vertical {
      flex-direction: column;
    }
  }
}
</style>
