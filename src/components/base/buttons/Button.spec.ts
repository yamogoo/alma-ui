import { mount, shallowMount } from "@vue/test-utils";
import g from "gsap";

import Button from "@/components/base/buttons/Button.vue";

vi.mock("gsap", () => ({
  default: {
    to: vi.fn(),
  },
}));

describe("Button.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("classes", () => {
    test("renders with base classes and attributes", () => {
      const wrapper = mount(Button, {
        props: { size: "md", color: "primary" },
      });

      const btn = wrapper.get("[data-testid='button']");

      expect(btn.classes()).toContain("button");
      expect(btn.classes()).toContain("button_size-md");
      expect(btn.classes()).toContain("button_color-primary");
    });
  });

  describe("attributes", () => {
    test("sets aria-label by label props", () => {
      const wrapper = mount(Button, {
        props: { size: "md", color: "primary", label: "Click me" },
      });

      const btn = wrapper.get("[data-testid='button']");

      expect(btn.attributes("aria-label")).toBe("Click me");
    });
  });

  describe("elements", () => {
    test("renders prepend and append icons", () => {
      const wrapper = shallowMount(Button, {
        props: {
          size: "md",
          color: "primary",
          prependIconName: "back",
          appendIconName: "check",
        },
      });

      const icons = wrapper.findAllComponents({ name: "BaseSymbol" });

      expect(icons.length).toBe(2);
      expect(icons[0].props("name")).toBe("back");
      expect(icons[1].props("name")).toBe("check");
    });
  });

  describe("animations", () => {
    test("runs gsap.to on pointerdown and pointerup", async () => {
      const wrapper = mount(Button, {
        props: { size: "md", color: "primary" },
        attachTo: document.body,
      });

      const btnEl = wrapper.get("[data-testid='button']")
        .element as HTMLButtonElement;

      await wrapper.get("[data-testid='button']").trigger("pointerdown");
      expect(g.to).toHaveBeenLastCalledWith(
        btnEl,
        expect.objectContaining({
          scale: 0.95,
          duration: 0.05,
          ease: "power4.out",
        })
      );

      await wrapper.get("[data-testid='button']").trigger("pointerup");
      expect(g.to).toHaveBeenLastCalledWith(
        btnEl,
        expect.objectContaining({
          scale: 1,
          duration: 0.05,
          ease: "power4.in",
        })
      );
    });

    test("custom scale is usedPressed", async () => {
      const wrapper = mount(Button, {
        props: { size: "md", color: "primary", scalePressed: 0.8 },
      });

      const btnEl = wrapper.get("[data-testid='button']")
        .element as HTMLButtonElement;

      await wrapper.get("[data-testid='button']").trigger("pointerdown");

      expect(g.to).toHaveBeenCalledWith(
        btnEl,
        expect.objectContaining({
          scale: 0.8,
        })
      );
    });
  });

  // describe("events", () => {
  //   test("emits pointerdown and pointerup", async () => {
  //     const wrapper = mount(Button, {
  //       props: { size: "md", color: "primary" },
  //     });

  //     const btn = wrapper.get("[data-testid='button']");
  //     const downEvent = new PointerEvent("pointerdown");
  //     const upEvent = new PointerEvent("pointerup");

  //     await btn.trigger("pointerdown", downEvent);
  //     expect(wrapper.emitted("pointerdown")?.[0][0]).toBe(downEvent);

  //     await btn.trigger("pointerup", upEvent);
  //     expect(wrapper.emitted("pointerup")?.[0][0]).toBe(upEvent);
  //   });
  // });
});
