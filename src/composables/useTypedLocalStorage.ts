import { useLocalStorage } from "@vueuse/core";
import type { LocalStorageKey } from "@/typings/lcoalStorage";

export const useTypedLocalStorage = <V, K extends string = LocalStorageKey>(
  key: K,
  value: V
) => {
  const data = useLocalStorage<V>(key, value);
  return data;
};
