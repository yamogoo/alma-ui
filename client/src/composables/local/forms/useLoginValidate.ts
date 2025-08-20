import { ref, type Ref, watch } from "vue";

import type { ServerResponseError } from "@/typings";

export const useLoginValidate = (
  error: Ref<ServerResponseError | null>,
  onChange: () => void
) => {
  const isError = ref(false);

  watch(error, (error) => {
    isError.value = !!error;
    onChange();
  });

  const reset = (): void => {
    isError.value = false;
    error.value = null;
  };

  return {
    isError,
    reset,
  };
};
