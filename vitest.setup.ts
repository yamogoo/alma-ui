import { createPinia, setActivePinia } from "pinia";
import { beforeEach, vi } from "vitest";

import "vitest-canvas-mock";

beforeEach(() => {
  const pinia = createPinia();
  setActivePinia(pinia);

  if (typeof PointerEvent === "undefined") {
    (globalThis as any).PointerEvent = class PointerEvent extends MouseEvent {};
  }

  Element.prototype.scrollTo = function () {};

  window.matchMedia = vi.fn((): MediaQueryList => {
    return {
      matches: false,
      media: "",
      onchange: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
});
