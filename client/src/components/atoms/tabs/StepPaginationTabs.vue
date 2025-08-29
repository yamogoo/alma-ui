<script setup lang="ts">
import { computed } from "vue";

import tokens from "@/tokens";

import type { UIElementColor, UIElementUnionProps } from "@/typings";

import Text, { type Variant } from "@/components/atoms/typography/Text.vue";

// TODO: finish carousel view

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  selectedItemId: 0,
  color: "primary",
  size: "md",
});

const emit = defineEmits<{
  (e: "update:selected-item-id", selectedItemId: number): void;
}>();

const visibleItems = computed(() => {
  const len = props.items.length;
  if (len === 0) return [];

  if (len <= 3) return props.items;

  const activeIndex = props.items.findIndex(
    (i) => i.id === props.selectedItemId
  );
  const prevIndex = (activeIndex - 1 + len) % len;
  const nextIndex = (activeIndex + 1) % len;

  return [
    props.items[prevIndex],
    props.items[activeIndex],
    props.items[nextIndex],
  ];
});

const itemPosition = (_item: StepItem, idx: number) => {
  if (idx === 0) return "left";
  if (idx === 1) return "center";
  if (idx === 2) return "right";
  return "";
};

const textVariant = computed(() => {
  return tokens.stepPaginationTabs.default[props.size].fontStyle
    .value as Variant;
});

const onItemClick = (item: StepItem): void => {
  if (item.id !== props.selectedItemId) {
    emit("update:selected-item-id", item.id);
  }
};
</script>

<script lang="ts">
export type Size = keyof typeof tokens.stepPaginationTabs.default;

export type Color = Extract<UIElementColor, "primary">;

export interface StepItem {
  id: number;
  label: string;
}

export interface Props extends Partial<UIElementUnionProps> {
  items: StepItem[];
  selectedItemId?: number;
  size?: Size;
  color?: Color;
}
</script>

<template>
  <div
    class="step-pagination-tabs"
    :class="[
      `step-pagination-tabs_variant-${props.variant}`,
      {
        [`step-pagination-tabs_size-${props.size}`]: !!size,
        [`step-pagination-tabs_color-${props.color}`]: !!color,
      },
    ]"
  >
    <div class="step-pagination-tabs__track">
      <Text
        v-for="(item, idx) in visibleItems"
        :key="item.id"
        :class="[
          'step-pagination-tabs__item',
          { 'step-pagination-tabs__item_active': idx === selectedItemId },
          itemPosition(item, idx),
        ]"
        :variant="textVariant"
        @click="onItemClick(item)"
      >
        {{ item.label }}
      </Text>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: $step-pagination-tabs) {
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      &_variant-#{$variant} {
        &.step-pagination_size-#{$size} {
          $font-style: get($val, "font-style.value");

          .step-pagination__item {
            @extend %t__#{$font-style};
          }
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      .step-pagination__item {
        @include themify($themes) {
          color: themed("step-pagination-tabs.label-#{$name}-normal");
        }

        &_active {
          @include themify($themes) {
            color: themed("step-pagination-tabs.label-#{$name}-active");
          }
        }
      }
    }
  }
}

.step-pagination-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @include defineSizes();
  @include defineThemes(primary);

  &__track {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  &__item {
    opacity: 0.5;
    transition: all 0.3s ease;
    cursor: pointer;

    &_active {
      opacity: 1;
    }
  }
}
</style>
