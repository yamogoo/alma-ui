<script setup lang="ts">
import { computed } from "vue";

import tokens from "@/tokens";

import type { UIElementColor } from "@/typings";

import Text, { type Variant } from "@/components/base/typography/Text.vue";

const props = withDefaults(defineProps<Props>(), {
  sid: 0,
  color: "primary",
  size: "md",
});

const emit = defineEmits<{
  (e: "update:sid", sid: number): void;
}>();

const visibleItems = computed(() => {
  const len = props.items.length;
  if (len === 0) return [];

  if (len <= 3) {
    if (len === 2 && props.sid === 1) return props.items;
    return props.items;
  }

  const activeIndex = props.items.findIndex((i) => i.id === props.sid) ?? 0;
  const start = Math.max(0, activeIndex - 1);
  const end = Math.min(len, activeIndex + 2);

  return props.items.slice(start, end);
});

const itemPosition = (_item: StepItem, idx: number) => {
  const len = visibleItems.value.length;
  if (len === 1) return "center";
  if (len === 2)
    return props.sid === 1
      ? idx === 0
        ? "left"
        : "center"
      : idx === 0
        ? "center"
        : "right";
  if (len === 3) return idx === 0 ? "left" : idx === 1 ? "center" : "right";
};

const textVariant = computed(() => {
  return tokens.stepPagination[props.size].fontStyle as Variant;
});

const onItemClick = (item: StepItem): void => {
  if (item.id !== props.sid) {
    emit("update:sid", item.id);
  }
};
</script>

<script lang="ts">
export type Size = keyof typeof tokens.stepPagination;

export type Color = Extract<UIElementColor, "primary">;

export interface StepItem {
  id: number;
  label: string;
}

export interface Props {
  items: StepItem[];
  sid?: number;
  size?: Size;
  color?: Color;
}
</script>

<template>
  <div
    class="step-pagination"
    :class="[
      {
        [`step-pagination_size-${props.size}`]: !!size,
        [`step-pagination_color-${props.color}`]: !!color,
      },
    ]"
  >
    <div class="step-pagination__track">
      <Text
        v-for="(item, idx) in visibleItems"
        :key="item.id"
        :class="[
          'step-pagination__item',
          { 'step-pagination__item_active': idx === sid },
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

@mixin defineSizes($map: $step-pagination) {
  @each $size, $val in $map {
    &_size-#{$size} {
      $font-style: map.get($val, "font-style");

      .step-pagination__item {
        @extend %t__#{$font-style};
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      .step-pagination__item {
        @include themify($themes) {
          color: themed("step-pagination.label-#{$name}-normal");
        }

        &_active {
          @include themify($themes) {
            color: themed("step-pagination.label-#{$name}-active");
          }
        }
      }
    }
  }
}

.step-pagination {
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
