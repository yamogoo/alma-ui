<script lang="ts" setup>
import { computed, type ComputedRef, type CSSProperties } from "vue";

import tokens from "@/tokens";

import type { UIElementColor } from "@/typings";

export type Variant = keyof typeof tokens.typography.styles;

export type Style = "normal" | "italic" | "oblique";

export type Transform =
  | "none"
  | "capitalize"
  | "uppercase"
  | "lowercase"
  | "full-width";

export type Decoration = "none" | "underline" | "line-through";

export type Color = Extract<
  UIElementColor,
  "primary" | "secondary" | "disabled" | "accent" | "warning" | "error" | "info"
>;

export interface Props {
  as?: string;
  value?: string;
  variant?: Variant;
  textColor?: Color;
  display?: "inline-block" | "block";
  color?: string;
  weight?: string;
  align?: "left" | "center" | "right" | "justify";
  size?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: Transform;
  textDecoration?: Decoration;
  fontFamily?: string;
  fontStyle?: Style;
  fontSize?: string;
  fontWeight?: string;
  fontStretch?: string;
  fontVariant?: string;
  fontFeatureSettings?: string;
  fontSynthesis?: string;
  textIndent?: string;
  textOverflow?: "clip" | "ellipsis";
}

const props = withDefaults(defineProps<Props>(), {
  as: "span",
  textColor: "primary",
});

const componentTag = props.as;

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
  <component
    :is="componentTag"
    class="text"
    :class="[
      {
        [`text_variant-${variant}`]: !!variant,
        [`text_color-${textColor}`]: !!textColor,
      },
    ]"
    :style="computedStyle"
  >
    {{ value }}
    <slot></slot>
  </component>
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
    &_color-#{$name} {
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
  @include defineThemes(primary secondary disabled accent info warning error);

  b {
    &.accent {
      @include themify($themes) {
        color: themed("label.accent");
      }
    }
  }
}
</style>
