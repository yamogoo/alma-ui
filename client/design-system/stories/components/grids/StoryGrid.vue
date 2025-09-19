<script setup lang="ts">
import type { StoryGridProps } from "./StoryGrid";

withDefaults(defineProps<StoryGridProps>(), {
  columns: 1,
});
</script>

<template>
  <div class="story-grid" :style="{ '--story-grid-cols': columns }">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.story-grid {
  display: grid;
  grid-template-columns: repeat(var(--story-grid-cols), 1fr);
  gap: px2rem(get($spacing, "md"));
}
</style>
