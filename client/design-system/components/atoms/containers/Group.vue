<script setup lang="ts">
import type { GroupProps } from "./group";

const props = withDefaults(defineProps<GroupProps>(), {
  variant: "default",
  as: "div",
  role: "group",
  size: "md",
  mode: "primary",
  orientation: "horizontal",
  ariaLabel: "group",
});

const componentTag = props.as;
</script>

<template>
  <component
    :is="componentTag"
    class="group"
    :class="[
      `group_variant-${variant}`,
      `group_size-${size}`,
      `group_mode-${mode}`,
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
  @each $variant, $sizes in $map {
    @each $size, $val in $sizes {
      $gap: px2rem(get($val, "self.gap"));
      $divider-border-width: px2rem(get($val, "self.border-width"));

      &_variant-#{$variant} {
        &.group_size-#{$size} {
          gap: $gap;

          &.group_divider {
            &.group_orientation-horizontal {
              border-right-width: $divider-border-width;
              padding-right: $gap;
            }

            &.group_orientation-vertical {
              border-bottom-width: $divider-border-width;
              padding-bottom: $gap;
            }
          }
        }
      }
    }
  }
}

@mixin defineThemes($names) {
  @each $name in $names {
    &_mode-#{$name} {
      &.group_divider {
        &.group_orientation-horizontal {
          @include themify($themes) {
            border-right-color: themed("group.#{$name}.self.divider");
          }
        }

        &.group_orientation-vertical {
          @include themify($themes) {
            border-bottom-color: themed("group.#{$name}.self.divider");
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
  @include defineThemes(map.keys(get($themes, "light.group")));

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

  @each $variant, $sizes in $group {
    @each $size, $val in $sizes {
      &_variant-#{$variant} {
        &.group_size-#{$size} {
          gap: px2rem(get($val, "self.gap"));
        }
      }
    }
  }
}
</style>
