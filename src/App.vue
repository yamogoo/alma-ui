<script setup lang="ts">
import { useMeta, useTheme } from "@/composables";

useMeta("author", import.meta.env.APP_AUTHOR_NAME);
useTheme("light");
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
}
</style>
