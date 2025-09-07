<script setup lang="ts">
import Page from "~/src/components/atoms/containers.temp/Page.vue";
import Text from "@/components/atoms/typography/Text.vue";

import LandingHeader from "@@/components/molecules/LandingHeader.vue";
import LandingCover from "@@/components/molecules/LandingCover.vue";
import LandingFooter from "@@/components/molecules/LandingFooter.vue";
</script>

<template>
  <Page>
    <LandingHeader></LandingHeader>
    <LandingCover>
      <Text :variant="'title-1'">Promo</Text>
    </LandingCover>
    <LandingFooter></LandingFooter>
  </Page>
</template>
