<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useConnectionStore } from "@@/stores";

import { ActionSheet, Text } from "@/components/atoms";
import { AppHeader } from "@@/components/organisms";

const { isConnected } = storeToRefs(useConnectionStore());
</script>

<template>
  <AppHeader></AppHeader>
  <RouterView></RouterView>
  <ActionSheet :is-active="!isConnected" :color="'primary'">
    <Text :variant="'caption-2'"> Connection Lost</Text>
  </ActionSheet>
</template>
