<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useAuthStore, useLocaleStore } from "@/stores";

import Form from "@/components/base/forms/Form.vue";
import ActionButton from "@/components/base/buttons/ActionButton.vue";
import Input from "@/components/base/inputs/Input.vue";
import PasswordInput from "@/components/base/inputs/PasswordInput.vue";
import Text from "@/components/base/typography/Text.vue";

const { $t } = storeToRefs(useLocaleStore());

const router = useRouter();

const { isLoggedIn, error: loginError } = storeToRefs(useAuthStore());
const { login } = useAuthStore();

const MIN_PASSWORD_LENGTH =
  +import.meta.env.VITE__FORM_PASSWORD_MIN_LENGTH || 6;

const localEmail = ref("");
const localPassword = ref("");
const localRepeatedPassword = ref("");
const localIsPasswordMasked = ref(true);
const localIsRepeatedPasswordMasked = ref(true);

const validatePassword = (password: string) => {
  return password.length >= MIN_PASSWORD_LENGTH;
};

const isPasswordValid = computed(() => validatePassword(localPassword.value));

const isRepeatedPasswordValid = computed(() =>
  validatePassword(localRepeatedPassword.value)
);

const isValid = computed(
  () => isPasswordValid.value && isRepeatedPasswordValid.value
);
const isError = computed(() => !!loginError.value);

const onSubmit = async (): Promise<void> => {
  onLogin(localEmail.value, localPassword.value);
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
  <Form :color="'primary'" :aria-label="'Login'">
    <Input
      v-model:value="localEmail"
      :placeholder="$t.auth.signin.form.userName"
      :type="'text'"
      :is-error="isError"
    ></Input>
    <PasswordInput
      v-model:value="localPassword"
      v-model:masked="localIsPasswordMasked"
      :type="'password'"
      :placeholder="$t.auth.signin.form.password"
      :is-error="isError"
    ></PasswordInput>
    <PasswordInput
      v-model:value="localRepeatedPassword"
      v-model:masked="localIsRepeatedPasswordMasked"
      :type="'password'"
      :placeholder="$t.auth.signin.form.repeatPassword"
      :is-error="isError"
    ></PasswordInput>
    <Text :variant="'caption-2'" :text-color="'secondary'">{{
      $t.auth.login.form.description
    }}</Text>
    <Text
      v-if="isError"
      :data-testid="'auth-form-error'"
      :variant="'caption-1'"
      :text-color="'error'"
      >{{ loginError }}</Text
    >
    <template #footer>
      <ActionButton
        :color="'accent'"
        :size="'md'"
        :stretch="'fill'"
        :label="$t.auth.signin.form.register"
        :is-disabled="!isValid"
        @press="onSubmit"
        @key.enter="onSubmit"
      ></ActionButton>
    </template>
  </Form>
</template>
