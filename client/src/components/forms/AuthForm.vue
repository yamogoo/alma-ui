<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useLocaleStore } from "@/stores";

import FormWrapper from "@/components/base/forms/FormWrapper.vue";
import StepPagination from "@/components/base/indicators/StepPagination.vue";
import CarouselView from "../base/containers/CarouselView.vue";
import LoginForm from "./LoginForm.vue";
import SigninForm from "./SigninForm.vue";

const { $t } = storeToRefs(useLocaleStore());
const formSid = ref(0);

const onUpdateSid = (sid: number): void => {
  formSid.value = sid;

  // if (sid === 1) {
  //   emit("update:email", localEmail.value);
  //   emit("update:password", localPassword.value);
  // }
};
</script>

<template>
  <FormWrapper class="auth-form" :color="'primary'" bordered>
    <template #header>
      <StepPagination
        :sid="formSid"
        :items="[
          { id: 0, label: $t.auth.login.form.title },
          { id: 1, label: $t.auth.signin.form.title },
        ]"
        @update:sid="onUpdateSid"
      >
      </StepPagination>
    </template>
    <CarouselView
      :sid="formSid"
      :screen-count="2"
      :orientation="'horizontal'"
      :direction="'forward'"
    >
      <template #screen-1="{ isActive }">
        <LoginForm v-show="isActive"></LoginForm>
      </template>
      <template #screen-2="{ isActive }">
        <SigninForm v-show="isActive"></SigninForm>
      </template>
    </CarouselView>
  </FormWrapper>
</template>

<style lang="scss">
.auth-form {
  box-sizing: border-box;
  width: 100%;
  max-width: px2rem(378px);
}
</style>
