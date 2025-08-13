<script setup lang="ts">
import { useId } from "vue";

import tokens from "@/tokens";

import type { UIElementColor } from "@/typings";

import Text from "@/components/base/typography/Text.vue";

withDefaults(defineProps<Props>(), {
  size: "md",
});

const id = useId();
</script>

<script lang="ts">
export type Size = keyof typeof tokens.form;

export type Color = Extract<UIElementColor, "primary" | "secondary">;

export interface Props {
  title?: string;
  color?: Color;
  size?: Size;
}
</script>

<template>
  <form
    :id
    class="form"
    :class="[
      { [`form_color-${color}`]: !!color },
      { [`form_size-${size}`]: !!size },
    ]"
    @submit.prevent
  >
    <div class="form__container">
      <div
        v-if="$slots.header || title"
        class="form__header"
        data-testid="form-header"
      >
        <Text :variant="'title-4'" :text-color="'primary'">{{ title }}</Text>
        <slot name="header"></slot>
      </div>
      <div class="form__body">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" class="form__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSizes($map: $form) {
  @each $size, $val in $map {
    $border-radius: map.get($val, "border-radius");
    $padding: map.get($val, "padding-v") map.get($val, "padding-h");

    &_#{$size} {
      padding: $padding;
      border-radius: $border-radius;

      @include themify($themes) {
        box-shadow: 0px 4px 32px themed("form.shadow");
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_#{$name} {
      @include themify($themes) {
        background-color: themed("form.background-#{$name}");
      }
    }
  }
}

.form {
  @extend %base-transition;

  @include defineSizes();
  @include defineThemes(primary secondary);

  &__container {
    @include transition(height, 250ms, ease-in-out);
  }

  &__header,
  &__footer {
    display: flex;
    justify-content: center;
  }

  &__header,
  &__body,
  &__footer {
    padding: map.get($spacing, "sm") 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: px2rem(map.get($spacing, "md"));
  }
}
</style>
