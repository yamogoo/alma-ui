// tokensParser.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { TokensParser, SCSSParser } from "./TokensParser";

describe("TokensParser helpers", () => {
  let parser: TokensParser;

  beforeEach(() => {
    parser = new TokensParser({
      outDir: "out",
      build: "build",
    });
  });

  it("toKebabCase should convert camelCase to kebab-case", () => {
    expect(parser.toKebabCase("fontSizeLarge")).toBe("font-size-large");
  });

  it("convertNumberByKey should append px by default", () => {
    expect(parser.convertNumberByKey(16, "width")).toBe("16px");
  });

  it("convertNumberByKey should append em for font-size", () => {
    expect(parser.convertNumberByKey(1.5, "font-size")).toBe("1.5em");
  });

  it("convertNumberByKey should respect unit override", () => {
    expect(
      parser.convertNumberByKey(20, "custom", { unit: "rem" } as any)
    ).toBe("20rem");
  });

  it("normalizeValue should convert numeric string", () => {
    expect(
      parser.normalizeValue("24", { convertPxToRem: false, key: "width" })
    ).toBe("24px");
  });
});

describe("SCSSParser parseMap", () => {
  let tokensParser: TokensParser;
  let scssParser: SCSSParser;

  beforeEach(() => {
    tokensParser = new TokensParser({
      outDir: "out",
      build: "build",
      mapOptions: { convertToCSSVariables: true },
    });
    scssParser = new SCSSParser(tokensParser);
  });

  it("should generate SCSS map and CSS variable for simple token", () => {
    const token = {
      value: 16,
      type: "font-size",
      meta: {
        build: { web: { exportAsVar: true } },
      },
    };

    const result = scssParser.parseMap(token, {
      convertPxToRem: false,
      fileName: "font",
    });

    expect(result).toContain("value: 16em"); // SCSS map value
    const cssBlock = scssParser.getCssVarsBlock();
    expect(cssBlock).toContain("--font"); // CSS variable
  });

  it("should respect excludeCSSVariables", () => {
    const tp = new TokensParser({
      outDir: "out",
      build: "build",
      mapOptions: {
        convertToCSSVariables: true,
        excludeCSSVariables: ["font.json"],
      },
    });
    const sp = new SCSSParser(tp);

    const token = {
      value: 10,
      type: "line-height",
      meta: {
        build: { web: { exportAsVar: true } },
      },
    };

    sp.parseMap(token, {
      convertPxToRem: false,
      fileName: "font",
    });

    expect(sp.getCssVarsBlock()).not.toContain("--font");
  });
});

describe("TokensParser flattenToCSSVariables", () => {
  let parser: TokensParser;

  beforeEach(() => {
    parser = new TokensParser({
      outDir: "out",
    });
  });

  it("should flatten nested JSON into CSS variables", () => {
    const json = {
      colors: {
        primary: "#ff0000",
        secondary: "#00ff00",
      },
    };

    const vars = parser.flattenToCSSVariables(json, [], [], {
      fileName: "theme",
      includeFileName: true,
      convertCase: true,
      convertPxToRem: false,
    });

    expect(vars).toContain("--theme-colors-primary: #ff0000;");
    expect(vars).toContain("--theme-colors-secondary: #00ff00;");
  });
});
