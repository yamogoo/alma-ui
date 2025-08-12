<script setup lang="ts">
import { storeToRefs } from "pinia";

import {
  DEFAULT_NAVIGATOR_MAX_WIDTH,
  DEFAULT_NAVIGATOR_MIN_WIDTH,
  useEditorLayout,
} from "@/stores/useEditorLayout";

import ResizeBounding from "@/components/base/resizer/ResizeBounding.vue";
import Text from "@/components/base/typography/Text.vue";

const { navigatorWidth, isNavigatorShown } = storeToRefs(useEditorLayout());
const { setNavigatorWidth } = useEditorLayout();

const onUpdateWidth = (width: number) => {
  setNavigatorWidth(width);
};
</script>

<template>
  <div class="editor-view">
    <ResizeBounding
      v-if="isNavigatorShown"
      class="editor-view__navigator"
      data-test="editor-navigator"
      :directions="'r'"
      :width="navigatorWidth"
      :min-width="DEFAULT_NAVIGATOR_MIN_WIDTH"
      :max-width="DEFAULT_NAVIGATOR_MAX_WIDTH"
      @update:width="onUpdateWidth"
    >
      <Text>FS Navigator (Sidebar)</Text>
    </ResizeBounding>
    <div class="editor-view__content">
      <Text>Notes</Text>
    </div>
  </div>
</template>

<style lang="scss">
.editor-view {
  position: relative;
  display: flex;
  @include box(100%);

  &__navigator {
    overflow: hidden;
  }

  &__content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
