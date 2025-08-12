import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import type { IconName, IconStyle, IconWeight } from "./icons";

import Icon from "./Icon.vue";

const icons: Array<IconName> = ["back", "check"];

const weightList: Array<IconWeight> = ["100", "200", "300", "400", "500"];

describe("Icon", () => {
  test.each(icons)("should render %s icon from the Icons Set", async (name) => {
    const _name = name as IconName;
    const _style: IconStyle = "outline";

    for (const weight of weightList) {
      const wrapper = mount(Icon, {
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
