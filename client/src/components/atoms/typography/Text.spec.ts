import { mount, shallowMount } from "@vue/test-utils";

import Text from "./Text.vue";

describe("Text", () => {
  describe("classes", () => {
    test("should have variant class", () => {
      const wrapper = shallowMount(Text, {
        props: {
          variant: "body-1",
        },
      });

      const el = wrapper.find(".text");

      expect(el.classes("text_variant-body-1")).toBeTruthy();
    });

    test("should have color class", () => {
      const wrapper = shallowMount(Text, {
        props: {
          textColor: "primary",
        },
      });

      const el = wrapper.find(".text");

      expect(el.classes("text_color-primary")).toBeTruthy();
    });
  });

  describe("styles", () => {
    test("pass styles from props", () => {
      const wrapper = mount(Text, {
        props: {
          display: "block",
          color: "red",
          align: "center",
          letterSpacing: "2px",
          textTransform: "uppercase",
          textDecoration: "underline",
          fontFamily: "Arial",
          fontStyle: "italic",
          fontStretch: "condensed",
          fontVariant: "small-caps",
          fontFeatureSettings: "'liga' 1",
          fontSynthesis: "none",
          textIndent: "10px",
        },
      });

      const style = wrapper.find("span").attributes("style");

      expect(style).toContain("display: block");
      expect(style).toContain("color: red");
      expect(style).toContain("text-align: center");
      expect(style).toContain("letter-spacing: 2px");
      expect(style).toContain("text-transform: uppercase");
      expect(style).toContain("text-decoration: underline");
      expect(style).toContain("font-family: Arial");
      expect(style).toContain("font-style: italic");
      expect(style).toContain("font-stretch: condensed");
      expect(style).toContain("font-variant: small-caps");
      expect(style).toContain("font-feature-settings: 'liga' 1");
      expect(style).toContain("font-synthesis: none");
      expect(style).toContain("text-indent: 10px");
    });

    test("adds overflow and whiteSpace if textOverflow is passed", () => {
      const wrapper = mount(Text, {
        props: {
          textOverflow: "ellipsis",
        },
      });

      const style = wrapper.find("span").attributes("style");

      expect(style).toContain("text-overflow: ellipsis");
      expect(style).toContain("overflow: hidden");
      expect(style).toContain("white-space: nowrap");
    });

    test("does not add overflow and whiteSpace if textOverflow is not passed", () => {
      const wrapper = mount(Text);

      const style = wrapper.find("span").attributes("style") || "";

      expect(style).not.toContain("overflow");
      expect(style).not.toContain("white-space");
    });
  });

  describe("slots", () => {
    test("should render default slot content", () => {
      const slotContent = "Some Content";

      const wrapper = shallowMount(Text, {
        slots: {
          default: slotContent,
        },
      });

      const el = wrapper.find(".text");
      const expectedSlotContent = el.text();

      expect(expectedSlotContent).toBe(slotContent);
    });
  });
});
