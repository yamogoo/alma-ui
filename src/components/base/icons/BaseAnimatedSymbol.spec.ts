import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";

import BaseAnimatedSymbol, { type Props } from "./BaseAnimatedSymbol.vue";

import animationData from "@/assets/animations/spinner.json";

const REQUIRED_PROPS: Props = {
  animationData,
  isActive: false,
};

describe("BaseAnimatedSymbol", () => {
  describe("elements", () => {
    const wrapper = mount(BaseAnimatedSymbol, { props: REQUIRED_PROPS });

    test("should render lottie (svg) dom element", async () => {
      const container = wrapper.find(`.animated-icon`);
      const isContainerExists = container.exists();

      expect(isContainerExists).toBeTruthy();

      const svg = container.find("svg");
      const isSVGExists = svg.exists();

      expect(isSVGExists).toBeTruthy();
      expect(isSVGExists).toMatchInlineSnapshot(`true`);
    });
  });
});
