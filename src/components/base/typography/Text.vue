<script lang="ts" setup>
import { computed, type ComputedRef, type CSSProperties } from "vue";

import tokens from "@/tokens";

import type { UIElementColor } from "@/typings";

export type TypographyVariant = keyof typeof tokens.typography.styles;

export type FontStyle = "normal" | "italic" | "oblique";

export type TextTransform =
  | "none"
  | "capitalize"
  | "uppercase"
  | "lowercase"
  | "full-width";

export type TextDecoration = "none" | "underline" | "line-through";

export type TextColor = Extract<
  UIElementColor,
  | "primary"
  | "secondary"
  | "inactive"
  | "disabled"
  | "accent"
  | "warning"
  | "error"
  | "info"
>;

export interface Props {
  variant?: TypographyVariant;
  textColor?: TextColor;
  display?: "inline-block" | "block";
  color?: string;
  weight?: string;
  align?: "left" | "center" | "right" | "justify";
  size?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: TextTransform;
  textDecoration?: TextDecoration;
  fontFamily?: string;
  fontStyle?: FontStyle;
  fontSize?: string;
  fontWeight?: string;
  fontStretch?: string;
  fontVariant?: string;
  fontFeatureSettings?: string;
  fontSynthesis?: string;
  textIndent?: string;
  textOverflow?: "clip" | "ellipsis";
}

const props = defineProps<Props>();

const computedStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    display: props.display,
    color: props.color,
    textAlign: props.align,
    letterSpacing: props.letterSpacing,
    textTransform: props.textTransform,
    textDecoration: props.textDecoration,
    fontFamily: props.fontFamily,
    fontStyle: props.fontStyle,
    fontStretch: props.fontStretch,
    fontVariant: props.fontVariant,
    fontFeatureSettings: props.fontFeatureSettings,
    fontSynthesis: props.fontSynthesis,
    textIndent: props.textIndent,
    textOverflow: props.textOverflow,
    overflow: props.textOverflow ? "hidden" : undefined,
    whiteSpace: props.textOverflow ? "nowrap" : undefined,
  } as Record<string, string | undefined>;
});
</script>

<template>
  <span
    class="text"
    :class="[
      {
        [`text_variant-${variant}`]: !!variant,
        [`text_color-${textColor}`]: !!textColor,
      },
    ]"
    :style="computedStyle"
  >
    <slot></slot>
  </span>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineVariants($map: map.get($typography, "styles")) {
  @each $variant, $val in $map {
    &_variant-#{$variant} {
      @each $key, $value in $val {
        @if $key == "font-size" {
          #{$key}: px2em($value);
        } @else {
          #{$key}: $value;
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_#{$name} {
      @include themify($themes) {
        color: themed("label.#{$name}");
      }
    }
  }
}

.text {
  b {
    font-style: inherit;
    font-weight: inherit;
  }
  @extend %base-transition;

  @include defineVariants();
  @include defineThemes(
    primary secondary inactive disabled accent info warning error
  );

  b {
    &.accent {
      @include themify($themes) {
        color: themed("label.accent");
      }
    }
  }
}
</style>
