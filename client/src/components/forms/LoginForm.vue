<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useAuthStore, useLocaleStore } from "@/stores";

import Form from "@/components/base/forms/Form.vue";
import ActionButton from "@/components/base/buttons/ActionButton.vue";
import Input from "@/components/base/inputs/Input.vue";
import Text from "@/components/base/typography/Text.vue";
import Group from "@/components/base/containers/Group.vue";
import Divider from "@/components/base/dividers/Divider.vue";
import PasswordInput from "@/components/base/inputs/PasswordInput.vue";

const { $t } = storeToRefs(useLocaleStore());

const router = useRouter();

const {
  isLoggedIn,
  error: loginError,
  isLoading,
} = storeToRefs(useAuthStore());
const { login } = useAuthStore();

const MIN_PASSWORD_LENGTH =
  +import.meta.env.VITE__FORM_PASSWORD_MIN_LENGTH || 6;

const localEmail = ref("");
const localPassword = ref("");
const localIsPasswordMasked = ref(true);

const isPasswordValid = computed(
  () => localPassword.value.length >= MIN_PASSWORD_LENGTH
);

const isValid = computed(() => isPasswordValid.value);
const isError = computed(() => !!loginError.value);

const onSubmit = async (): Promise<void> => {
  onLogin(localEmail.value, localPassword.value);
};

const onContinueAsGuest = (): void => {
  onRedirectToEditor();
};

const onRedirectToEditor = (): void => {
  router.push("/editor");
};

const onRedirectIfLoggedIn = (): void => {
  if (isLoggedIn.value) onRedirectToEditor();
};

const onLogin = async (email: string, password: string): Promise<void> => {
  await login(email, password);
  onRedirectIfLoggedIn();
};

onMounted(() => {
  onRedirectIfLoggedIn();
});
</script>

<template>
  <Form :color="'primary'" :aria-label="'Signin'">
    <Input
      v-model:value="localEmail"
      :placeholder="$t.auth.login.form.userName"
      :type="'text'"
      :is-error="isError"
    ></Input>
    <PasswordInput
      v-model:value="localPassword"
      v-model:masked="localIsPasswordMasked"
      :type="'password'"
      :placeholder="$t.auth.login.form.password"
      :is-error="isError"
    ></PasswordInput>
    <Text
      v-if="isError"
      :data-testid="'auth-form-error'"
      :variant="'caption-1'"
      :text-color="'error'"
      >{{ loginError }}</Text
    >
    <!-- <Divider :orientation="'horizontal'" :size="'sm'"></Divider> -->
    <Text :variant="'caption-2'" :text-color="'secondary'">{{
      $t.auth.login.form.description
    }}</Text>

    <template #footer>
      <Group :orientation="'vertical'" :size="'sm'" :stretch="'fill'">
        <ActionButton
          :color="'accent'"
          :size="'md'"
          :stretch="'fill'"
          :label="$t.auth.login.form.login"
          :is-disabled="!isValid || isLoading"
          @press="onSubmit"
          @key.enter="onSubmit"
        >
        </ActionButton>
        <Divider :orientation="'horizontal'" :size="'md'"></Divider>
        <ActionButton
          :color="'transparent'"
          :size="'md'"
          :stretch="'fill'"
          :label="$t.auth.login.form.skip"
          @press="onContinueAsGuest"
        ></ActionButton>
      </Group>
    </template>
  </Form>
</template>
