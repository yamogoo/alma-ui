import { useTypedLocalStorage } from "./useTypedLocalStorage";
import type { LocalStorageKey } from "@/typings/lcoalStorage";

type TypedValue = [
  LocalStorageKey,
  any,
  "string" | "number" | "null" | "function" | "undefined" | "object",
];

const values: Array<TypedValue> = [
  ["APP_VERSION", 1, "number"],
  ["APP_VERSION", "SOME_STRING_VALUE", "string"],
];

describe("useTypedLocalStorage", () => {
  describe("types", () => {
    test.each(values)(
      "key %s with value %s should have %s type",
      ([key, value, typeString]) => {
        const storedValue = useTypedLocalStorage(key, value);
        const isExpectedType = typeof storedValue === typeString;

        expect(isExpectedType).toBeTruthy();
      }
    );
  });
});
