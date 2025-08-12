<script setup lang="ts">
import Resizer, { globalClassNames, type Props } from "vue3-resize-bounding";

import tokens from "@/tokens";

const knobWidth = tokens.resizer["knobWidth"];
const knobHeight = tokens.resizer["knobHeight"];
const knobRoundness = tokens.resizer["knobRoundness"];
const activeAreaWidth = tokens.resizer["activeAreaWidth"];

const PREFIX = "resizer__";

const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits<{
  (e: "update:width", width: number): void;
  (e: "update:height", height: number): void;
}>();
</script>

<template>
  <Resizer
    v-bind="props"
    data-testid="resizer"
    :options="{
      prefix: PREFIX,
      width: 4,
      splitterWidthNormal: 4,
      splitterWidthActive: 4,
      activeAreaWidth,
      position: 'internal',
      knob: {
        show: false,
      },
      touchActions: true,
    }"
    :styles="{
      knob: [
        globalClassNames(PREFIX).knob,
        {
          width: knobWidth,
          height: knobHeight,
          borderRadius: knobRoundness,
          transition: 'background 75ms ease-out',
        },
      ],
    }"
    @update:width="(width) => emits('update:width', width)"
    @update:height="(height) => emits('update:height', height)"
  >
    <slot></slot>
  </Resizer>
</template>

<style lang="scss">
$prefix: "resizer__";

.#{$prefix} {
  &knob {
    width: 128px;
    height: 4px;
  }
  &pane {
    // normal state:
    .#{$prefix}splitter {
      @include themify($themes) {
        background: rgba(themed("resizer.splitter-normal"), 0);
      }
    }

    .#{$prefix}knob {
      @include themify($themes) {
        background: themed("resizer.knob-normal");
      }
    }

    // selected pane:
    &.active {
      .#{$prefix}splitter {
        @include themify($themes) {
          background: rgba(themed("resizer.splitter-active"), 1);
        }
      }
    }
  }

  &splitter {
    @include transition(background, 125ms, ease-out);
  }
}
</style>
