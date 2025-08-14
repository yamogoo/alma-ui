<script setup lang="ts">
import tokens from "@/tokens";

import type {
  UIElementAlignment,
  UIElementAxisDirection,
  UIElementColor,
  UIElementOrientation,
  UIElementStretch,
} from "@/typings";

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  role: "group",
  size: "md",
  color: "primary",
  orientation: "horizontal",
  ariaLabel: "group",
});

const componentTag = props.as;
</script>

<script lang="ts">
export type Size = keyof typeof tokens.group;

export type Color = Extract<UIElementColor, "primary" | "secondary">;

export interface Props {
  size?: keyof typeof tokens.group;
  color?: Color;
  orientation?: UIElementOrientation;
  direction?: UIElementAxisDirection;
  verticalAlignment?: UIElementAlignment;
  horizontalAlignment?: UIElementAlignment;
  stretch?: UIElementStretch;
  wrap?: boolean;
  gapX?: string;
  gapY?: string;
  divider?: boolean;
  as?: keyof HTMLElementTagNameMap;
  role?: string;
  ariaLabel?: string;
}
</script>

<template>
  <component
    :is="componentTag"
    class="group"
    :class="[
      `group_size-${size}`,
      `group_color-${color}`,
      {
        [`group_direction-${direction}`]: !!direction,
        [`group_orientation-${orientation}`]: !!orientation,
        [`group_align-vertical-${verticalAlignment}`]: !!verticalAlignment,
        [`group_align-horizontal-${horizontalAlignment}`]:
          !!horizontalAlignment,
        [`group_stretch-${stretch}`]: !!stretch,
        group_wrap: wrap,
        group_divider: divider,
      },
    ]"
    :role="role"
    :aria-label="ariaLabel"
    :style="{ gap: gapY ? gapY : undefined }"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineSize($map: $group) {
  @each $size, $val in $map {
    $gap: px2rem(map.get($val, "gap"));
    $border-width: px2rem(map.get($val, "divider"));

    &_size-#{$size} {
      gap: $gap;

      &.group_divider {
        &.group_orientation-horizontal {
          border-right-width: $border-width;
          padding-right: $gap;
        }

        &.group_orientation-vertical {
          border-bottom-width: $border-width;
          padding-bottom: $gap;
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_color-#{$name} {
      &.group_divider {
        &.group_orientation-horizontal {
          @include themify($themes) {
            border-right-color: themed("group.divider-#{$name}");
          }
        }

        &.group_orientation-vertical {
          @include themify($themes) {
            border-bottom-color: themed("group.divider-#{$name}");
          }
        }
      }
    }
  }
}

.group {
  display: flex;
  @extend %base-transition;

  @include defineSize();
  @include defineThemes(primary secondary);

  &_orientation {
    &-horizontal {
      flex-direction: row;
    }

    &-vertical {
      flex-direction: column;
    }
  }

  &_direction {
    &-forward {
      direction: ltr;
    }

    &-backward {
      direction: rtl;
    }
  }

  &_align {
    &-horizontal {
      &-start {
        &.group_orientation-horizontal {
          justify-content: flex-start;
        }
        &.group_orientation-vertical {
          align-items: flex-start;
        }
      }

      &-center {
        &.group_orientation-horizontal {
          justify-content: center;
        }
        &.group_orientation-vertical {
          align-items: center;
        }
      }

      &-end {
        &.group_orientation-horizontal {
          justify-content: flex-end;
        }
        &.group_orientation-vertical {
          align-items: flex-end;
        }
      }
    }

    &-vertical {
      &-start {
        &.group_orientation-horizontal {
          align-items: flex-start;
        }
        &.group_orientation-vertical {
          justify-content: flex-start;
        }
      }

      &-center {
        &.group_orientation-horizontal {
          align-items: center;
        }
        &.group_orientation-vertical {
          justify-content: center;
        }
      }

      &-end {
        &.group_orientation-horizontal {
          align-items: flex-end;
        }
        &.group_orientation-vertical {
          justify-content: flex-end;
        }
      }
    }
  }

  &_stretch {
    &-fill {
      @include box(100%);
    }

    &-auto {
      &.group_orientation {
        &-vertical {
          @include box(auto, 100%);
        }

        &-horizontal {
          @include box(100%, auto);
        }
      }
    }
  }

  &_wrap {
    flex-wrap: wrap;
  }

  &_divider {
    &.group_orientation-horizontal {
      border-right-style: solid;
    }

    &.group_orientation-vertical {
      border-bottom-style: solid;
    }
  }

  @each $size, $val in $group {
    &_size-#{$size} {
      gap: map.get($val, "gap");
    }
  }
}
</style>
