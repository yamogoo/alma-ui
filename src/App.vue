<script setup lang="ts">
import { useMeta, useTheme } from "@/composables";

useMeta("author", import.meta.env.APP_AUTHOR_NAME);
useTheme("dark");
</script>

<template>
  <div></div>
</template>

<style lang="scss">
#app {
  @debug get($breakpoints, md);
}
</style>
