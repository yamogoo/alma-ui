<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  isOpen: false,
  isDialog: false,
});
</script>

<script lang="ts">
export interface Props {
  isOpen: boolean;
  isDialog?: boolean;
}
</script>

<template>
  <div v-if="isOpen" class="sheet" :class="{ sheet_dialog: isDialog }">
    <div class="sheet__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
/* .modal { } */
</style>
