<script setup lang="ts">
import { type ToggleSwitchProps } from "@/components/atoms";

withDefaults(defineProps<ToggleSwitchProps>(), {
  isActive: false,
  isDisabled: false,
});
</script>

<template>
  <div class="toggle-switch"></div>
</template>

<style lang="scss">
/* .toggle-switch { } */
</style>
