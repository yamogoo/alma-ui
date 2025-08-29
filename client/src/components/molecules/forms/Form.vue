<script setup lang="ts">
import { useId } from "vue";

import tokens from "@/tokens";

import type { UIElementColor, UIElementUnionProps } from "@/typings";

import Text from "@/components/atoms/typography/Text.vue";

withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
});

const id = useId();
</script>

<script lang="ts">
export type Size = keyof typeof tokens.form.default;

export type Color = Extract<UIElementColor, "primary" | "secondary">;

export interface Props extends UIElementUnionProps {
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
      { [`form_variant-${variant}`]: !!variant },
      { [`form_size-${size}`]: !!size },
      { [`form_color-${color}`]: !!color },
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
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $border-radius: get($val, "border-radius.value");
      $padding: get($val, "padding-v.value") get($val, "padding-h.value");

      &_#{$size} {
        padding: $padding;
        border-radius: $border-radius;

        @include themify($themes) {
          box-shadow: 0px 4px 32px themed("form.shadow");
        }
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
  width: 100%;
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
    padding: get($spacing, "sm.value") 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: px2rem(get($spacing, "md.value"));
  }
}
</style>
