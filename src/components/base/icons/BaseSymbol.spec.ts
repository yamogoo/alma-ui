import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import type { SymbolName, SymbolStyle, SymbolWeight } from "./symbols";

import BaseSymbol from "./BaseSymbol.vue";

const icons: Array<SymbolName> = ["back", "check"];

const weightList: Array<SymbolWeight> = ["100", "200", "300", "400", "500"];

describe("BaseSymbol", () => {
  test.each(icons)("should render %s icon from the Icons Set", async (name) => {
    const _name = name as SymbolName;
    const _style: SymbolStyle = "outline";

    for (const weight of weightList) {
      const wrapper = mount(BaseSymbol, {
        props: {
          name: _name,
          weight: weight,
          style: _style,
        },
      });

      await vi.dynamicImportSettled();

      const res = wrapper.find("svg");

      expect(res.exists()).toBe(true);
      expect(res.exists()).toMatchSnapshot();
    }
  });
});
