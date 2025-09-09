import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import g from "gsap";

import Button from "@/components/atoms/buttons/Button.vue";

const getIcon = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find('[data-testid="button__icon"]');
};

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

      const icons = wrapper.findAllComponents({ name: "Icon" });

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

  describe("slots", () => {
    test("renders custom prepend icon in slots", () => {
      const expectedSlotContent = "Icon";
      const expectedSlot = `<span data-testid="button__icon">${expectedSlotContent}</span>`;

      const wrapper = shallowMount(Button, {
        props: {
          size: "md",
          color: "primary",
        },
        slots: {
          "prepend-icon": expectedSlot,
        },
      });

      const iconEl = getIcon(wrapper);
      const isIconExists = iconEl.exists();

      expect(isIconExists).toBeTruthy();
      expect(isIconExists).toMatchInlineSnapshot(`true`);
    });

    test("renders custom append icon in slots", () => {
      const expectedSlotContent = "Icon";
      const expectedSlot = `<span data-testid="button__icon">${expectedSlotContent}</span>`;

      const wrapper = shallowMount(Button, {
        props: {
          size: "md",
          color: "primary",
        },
        slots: {
          "append-icon": expectedSlot,
        },
      });

      const iconEl = getIcon(wrapper);
      const isIconExists = iconEl.exists();

      expect(isIconExists).toBeTruthy();
      expect(isIconExists).toMatchInlineSnapshot(`true`);
    });
  });
});
