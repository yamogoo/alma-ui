import fs from "node:fs/promises";
import path from "node:path";
import { readFileSync } from "node:fs";
import * as _ from "lodash-es";
import Color from "color";

type List<T> = Array<T>;

interface IMap {
  [key: string]: Value<unknown>;
}

type Value<T> = string | number | List<T> | T | IMap;

interface ParseValueOptions {
  convertCase: boolean;
  convertPxToRem: boolean;
  convertToCSSVariables: boolean;
  includeFileName: boolean;
  fileName?: string;
}

interface JSONToSCSSOptions {
  name: string;
  header: string;
  comment: string;
  options: Partial<ParseValueOptions>;
  mapOptions?: Partial<ParseValueOptions>;
  varsOptions?: Partial<ParseValueOptions>;
}

export interface TokensParserOptions {
  source: string;
  outDir: string;
  cssVarsOutDir?: string;
  build?: string;
  entryFilePath?: string;
  mapOptions?: Partial<ParseValueOptions>;
  varsOptions?: Partial<ParseValueOptions>;
  parseOptions?: Partial<ParseValueOptions>;
}

abstract class Parser {
  abstract parseValue<T>(value: Value<T>, opts: ParseValueOptions): Value<T>;
  abstract parseList(list: List<unknown>, opts: ParseValueOptions): string;
  abstract parseMap<T extends object>(
    map: Value<T>,
    opts: ParseValueOptions,
    path?: string[]
  ): string;
}

export class SCSSParser extends Parser {
  private tokensParser: TokensParser;

  constructor(tokensParser: TokensParser) {
    super();
    this.tokensParser = tokensParser;
  }

  parseValue<T>(value: Value<T>, opts: ParseValueOptions): Value<T> {
    const { convertPxToRem } = opts;

    if (_.isArray(value)) return this.parseList(value as List<unknown>, opts);
    else if (_.isPlainObject(value)) return this.parseMap(value as IMap, opts);
    else if (value === "") return '""';
    else if (typeof value === "string")
      return this.tokensParser.parseNestedValue(value, opts);
    else if (typeof value === "number")
      return convertPxToRem
        ? this.tokensParser.valuePxToRem(value)
        : `${value}px`;
    else return value;
  }

  parseList(list: List<unknown>, opts: ParseValueOptions): string {
    return `${list.map((value) => this.parseValue(value, opts)).join(" ")}`;
  }

  parseMap<T extends object>(
    map: Value<T>,
    opts: ParseValueOptions,
    path: string[] = []
  ): string {
    const { convertCase = false } = opts;

    if (typeof map === "string")
      return this.tokensParser.parseNestedValue(map, opts);

    return `(${Object.keys(map)
      .filter((key) => this.tokensParser.isKeyValidated(key))
      .map((key) => {
        const kebabKey = convertCase ? this.tokensParser.toKebabCase(key) : key;
        const fullPath = [...path, kebabKey];
        const value = (map as IMap)[key];
        const parsedValue = _.isPlainObject(value)
          ? this.parseMap(value as Value<object>, opts, fullPath)
          : this.parseValue(value, opts);
        return `${kebabKey}: ${parsedValue}`;
      })
      .join(", ")})`;
  }
}

export class TokensParser {
  private parser: Parser;
  private opts: TokensParserOptions;
  private defaultParseOptions: ParseValueOptions;
  private defaultMapOptions: ParseValueOptions;
  private defaultVarsOptions: ParseValueOptions;

  constructor(opts: TokensParserOptions) {
    this.opts = opts;
    this.parser = new SCSSParser(this);

    this.defaultParseOptions = {
      convertCase: false,
      convertPxToRem: false,
      convertToCSSVariables: false,
      includeFileName: false,
      ...opts.parseOptions,
    };

    this.defaultMapOptions = {
      ...this.defaultParseOptions,
      ...opts.mapOptions,
    };

    this.defaultVarsOptions = {
      ...this.defaultParseOptions,
      ...opts.varsOptions,
    };

    const { source, outDir } = opts;
    this.listDir(source, outDir);

    this.generateEntryFile();
  }

  isKeyValidated(key: string): boolean {
    return /^[^$:].*/.test(key);
  }

  toKebabCase(key: string): string {
    return key
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
      .toLowerCase();
  }

  valuePxToRem(value: number): string {
    return `px2rem(${value}px)`;
  }

  private fileCache: Record<string, any> = {};

  parseNestedValue(value: string, opts: ParseValueOptions, depth = 0): string {
    if (depth > 10) {
      console.warn("⚠️ Maximum reference depth exceeded for", value);
      return value;
    }

    // match all {...} expressions inside any string
    const regex = /{([^}]+)}/g;
    let result = value;

    let match: RegExpExecArray | null;
    while ((match = regex.exec(value)) !== null) {
      const fullMatch = match[0];
      const pathStr = match[1];
      const pathParts = pathStr.split(".");
      const fileName = pathParts.shift();
      if (!fileName) continue;

      try {
        let json: any;
        if (this.fileCache[fileName]) {
          json = this.fileCache[fileName];
        } else {
          const filePath = `${this.opts.source}/${fileName}.json`;
          const file = readFileSync(filePath, "utf-8");
          json = JSON.parse(file);
          this.fileCache[fileName] = json;
        }

        let nestedValue = pathParts.reduce((acc, key) => acc?.[key], json);

        if (nestedValue === undefined) {
          console.warn(`⚠️ Unresolved token: ${fullMatch}`);
          continue;
        }

        if (typeof nestedValue === "string") {
          // Recursively resolve nested string tokens
          nestedValue = this.parseNestedValue(nestedValue, opts, depth + 1);
        } else if (typeof nestedValue === "number") {
          nestedValue = opts.convertPxToRem
            ? this.valuePxToRem(nestedValue)
            : `${nestedValue}px`;
        }

        result = result.replace(fullMatch, nestedValue);
      } catch (err) {
        console.error(`❌ Error resolving token ${match[0]}`, err);
      }
    }

    result = this.evaluateColorFunctions(result);
    result = this.evaluateMathExpressions(result);

    return result;
  }

  private async listDir(source: string, output: string) {
    try {
      const fileNames = await fs.readdir(source);

      for (const fileName of fileNames) {
        if (/^(?=.).*.json$/.test(fileName)) {
          await this.JSONToSCSS(
            `${source}/${fileName}`,
            `${output}`,
            `_${fileName.replace(".json", ".scss")}`,
            {
              options: {
                ...this.defaultParseOptions,
                fileName: fileName.replace(/\.json$/, ""),
              },
              mapOptions: this.defaultMapOptions,
              varsOptions: this.defaultVarsOptions,
              name: fileName.replace(".json", ""),
            }
          );

          await this.resolveAndSaveJson(`${source}/${fileName}`, fileName);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  private flattenToCSSVariables(
    obj: any,
    path: string[] = [],
    result: string[] = [],
    opts: ParseValueOptions
  ) {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = opts.convertCase ? this.toKebabCase(key) : key;
      const newPath = [...path, newKey];

      if (_.isPlainObject(value)) {
        this.flattenToCSSVariables(value, newPath, result, opts);
      } else {
        const flatPath =
          opts.includeFileName && opts.fileName
            ? [
                opts.convertCase
                  ? this.toKebabCase(opts.fileName)
                  : opts.fileName,
                ...newPath,
              ]
            : newPath;

        const cssVarName = `--${flatPath.join("-")}`;
        const finalValue = this.parser.parseValue(value, opts);
        result.push(`${cssVarName}: ${finalValue};`);
      }
    }
    return result;
  }

  private async JSONToSCSS(
    inputPath: string,
    outputDir: string,
    outputFileName: string,
    opts?: Partial<JSONToSCSSOptions>
  ): Promise<void> {
    const {
      header = "// Generated by tokensParser. ‼️ DO NOT MODIFY THIS FILE ‼️ /\n",
      name = "",
      comment = "",
      options,
      mapOptions,
      varsOptions,
    } = { ...opts } as JSONToSCSSOptions;

    const baseOptions: ParseValueOptions = {
      ...this.defaultParseOptions,
      fileName: options?.fileName || "",
      ...options,
    };

    const parseMapOptions: ParseValueOptions = {
      ...baseOptions,
      ...mapOptions,
    };

    const parseVarsOptions: ParseValueOptions = {
      ...baseOptions,
      ...varsOptions,
    };

    const outputPath = `${outputDir}/${outputFileName}`;

    try {
      const isOutputExists = await fs
        .access(outputDir)
        .then(() => true)
        .catch(() => false);
      if (!isOutputExists) {
        await fs.mkdir(outputDir, { recursive: true });
      }

      const data = await fs.readFile(inputPath, "utf-8");
      const json = JSON.parse(data);
      let content = `${header}\n${comment}\n`;

      const topLevelKey =
        parseMapOptions.includeFileName && parseMapOptions.fileName
          ? parseMapOptions.convertCase
            ? this.toKebabCase(parseMapOptions.fileName)
            : parseMapOptions.fileName
          : "";

      const rootMap =
        parseMapOptions.includeFileName && parseMapOptions.fileName
          ? { [topLevelKey]: json }
          : json;

      for (const [k, v] of Object.entries(rootMap)) {
        const kebabKey = parseMapOptions.convertCase ? this.toKebabCase(k) : k;
        const keyLine = `$${kebabKey}:`;
        const map = v as IMap;
        const str = `${keyLine}${this.parser.parseMap(map, parseMapOptions)};`;
        content += `${str}\n`;
      }

      if (parseVarsOptions.convertToCSSVariables) {
        const flatVars = this.flattenToCSSVariables(
          json,
          [],
          [],
          parseVarsOptions
        );
        const cssContent = `:root {\n  ${flatVars.join("\n  ")}\n}`;

        if (this.opts.cssVarsOutDir) {
          const cssOutPath = `${this.opts.cssVarsOutDir}/${parseVarsOptions.fileName}.css`;
          await fs.writeFile(cssOutPath, cssContent);
          console.log(`CSS variables written to ${cssOutPath}`);
        } else {
          content += `\n${cssContent}\n`;
        }
      }

      await fs.writeFile(outputPath, content);
      console.log(`${name} parsed to ${outputPath}`);
    } catch (err) {
      console.error(err);
    }
  }

  private evaluateColorFunctions(value: string): string {
    const colorFuncRegex = /(rgba|rgb|lighten|darken|saturate|hue)\(([^)]+)\)/g;
    let result = value;
    let match: RegExpExecArray | null;

    while ((match = colorFuncRegex.exec(result)) !== null) {
      const fullMatch = match[0];
      const func = match[1];
      const args = match[2].split(",").map((a) => a.trim());

      try {
        let base: ReturnType<typeof Color>;

        if (/^\d+$/.test(args[0]) || /^\d/.test(args[0])) {
          const rgbString = `rgb(${args.slice(0, 3).join(", ")})`;
          base = Color(rgbString);
          args.splice(0, 3);
        } else {
          base = Color(args[0]);
          args.splice(0, 1);
        }

        let computed: ReturnType<typeof Color>;

        switch (func) {
          case "rgba":
          case "rgb":
            computed = base.alpha(parseFloat(args[0]));
            break;
          case "lighten":
            computed = base.lighten(parseFloat(args[0]));
            break;
          case "darken":
            computed = base.darken(parseFloat(args[0]));
            break;
          case "saturate": {
            const amount = parseFloat(args[0]);
            computed =
              amount < 0
                ? base.desaturate(Math.abs(amount))
                : base.saturate(amount);
            break;
          }
          case "hue":
            computed = base.hue(parseFloat(args[0]));
            break;
          default:
            continue;
        }

        const finalColor =
          func === "rgba" || func === "rgb"
            ? computed.hex().toLowerCase() +
              Math.round(computed.alpha() * 255)
                .toString(16)
                .padStart(2, "0")
            : computed.hex().toLowerCase();

        result = result.replace(fullMatch, finalColor);
      } catch (e) {
        console.warn(`⚠️ Failed to evaluate color function: ${fullMatch}`, e);
      }
    }

    return result;
  }

  private evaluateMathExpressions(value: string): string {
    const mathRegex =
      /(-?\d+(?:\.\d+)?(?:px|rem)?)(\s*[*\/+\-]\s*-?\d+(?:\.\d+)?(?:px|rem)?)+/g;
    let result = value;
    let match: RegExpExecArray | null;

    while ((match = mathRegex.exec(result)) !== null) {
      const fullMatch = match[0];
      try {
        const numericExpr = fullMatch.replace(/(px|rem)/g, "");
        const computed = Function(`"use strict"; return (${numericExpr})`)();

        if (typeof computed === "number" && !isNaN(computed)) {
          const rounded = parseFloat(computed.toFixed(2));
          const unitMatch = fullMatch.match(/px|rem/);
          const unit = unitMatch ? unitMatch[0] : "";
          result = result.replace(fullMatch, `${rounded}${unit}`); // + "px"
        }
      } catch (e) {
        console.warn(`⚠️ Failed to evaluate math expression: ${fullMatch}`, e);
      }
    }
    return result;
  }

  private async resolveAndSaveJson(
    inputPath: string,
    fileName: string
  ): Promise<void> {
    if (!this.opts.build) return;

    const unresolvedTokens: string[] = [];

    try {
      const jsonRaw = await fs.readFile(inputPath, "utf-8");
      const json = JSON.parse(jsonRaw);

      const resolveRecursive = (
        obj: any,
        opts: ParseValueOptions,
        depth = 0
      ): any => {
        if (_.isString(obj)) {
          const regex = /{([^}]+)}/g;
          let result = obj;
          let match: RegExpExecArray | null;

          while ((match = regex.exec(obj)) !== null) {
            const fullMatch = match[0]; // {file.token.path}
            const pathStr = match[1];
            const pathParts = pathStr.split(".");
            const fileName = pathParts.shift();
            if (!fileName) continue;

            try {
              let json: any;
              if (this.fileCache[fileName]) {
                json = this.fileCache[fileName];
              } else {
                const filePath = `${this.opts.source}/${fileName}.json`;
                const file = readFileSync(filePath, "utf-8");
                json = JSON.parse(file);
                this.fileCache[fileName] = json;
              }

              let nestedValue = pathParts.reduce(
                (acc, key) => acc?.[key],
                json
              );

              if (nestedValue === undefined) {
                unresolvedTokens.push(fullMatch);
                result = result.replace(fullMatch, "");
                continue;
              }

              if (typeof nestedValue === "string") {
                nestedValue = resolveRecursive(nestedValue, opts, depth + 1);
              } else if (typeof nestedValue === "number") {
                nestedValue = opts.convertPxToRem
                  ? this.valuePxToRem(nestedValue)
                  : `${nestedValue}px`;
              }

              result = result.replace(fullMatch, nestedValue);
            } catch (err) {
              unresolvedTokens.push(fullMatch);
              result = result.replace(fullMatch, "");
            }
          }

          result = this.evaluateColorFunctions(result);
          result = this.evaluateMathExpressions(result);
          return result;
        }

        if (_.isArray(obj))
          return obj.map((v) => resolveRecursive(v, opts, depth));
        if (_.isPlainObject(obj)) {
          const res: Record<string, any> = {};
          for (const [key, value] of Object.entries(obj)) {
            res[key] = resolveRecursive(value, opts, depth);
          }
          return res;
        }

        return obj;
      };

      const resolvedJson = resolveRecursive(json, {
        ...this.defaultParseOptions,
        fileName: fileName.replace(/\.json$/, ""),
      });

      const buildDir = this.opts.build;
      const isDir = await fs
        .access(buildDir)
        .then(() => true)
        .catch(() => false);
      if (!isDir) await fs.mkdir(buildDir, { recursive: true });

      const buildPath = `${buildDir}/${fileName}`;
      await fs.writeFile(
        buildPath,
        JSON.stringify(resolvedJson, null, 2),
        "utf-8"
      );

      if (unresolvedTokens.length > 0) {
        const logPath = `${buildDir}/unresolved-tokens.log`;
        const uniqueTokens = [...new Set(unresolvedTokens)];
        const logContent =
          `Unresolved tokens in ${fileName}:\n` +
          uniqueTokens.join("\n") +
          "\n\n";
        await fs.appendFile(logPath, logContent);
        console.warn(
          `⚠️ ${uniqueTokens.length} unresolved tokens in ${fileName}. See ${logPath}`
        );
      } else {
        console.log(`✅ ${fileName} resolved with no unresolved tokens`);
      }
    } catch (err) {
      console.error(`❌ Failed to resolve JSON ${fileName}`, err);
    }
  }

  private async generateEntryFile() {
    const { build, entryFilePath } = this.opts;
    if (!build || !entryFilePath) return;

    try {
      const files = await fs.readdir(build);
      const jsonFiles = files.filter((f) => f.endsWith(".json"));

      const relativeImportPath = path.relative(
        path.dirname(entryFilePath),
        build
      );

      const imports = jsonFiles
        .map((file) => {
          const name = file.replace(".json", "");
          let importPath = path
            .join(relativeImportPath, file)
            .replace(/\\/g, "/");

          // ✅ Ensure it starts with './'
          if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
            importPath = "./" + importPath;
          }

          return `import ${name} from "${importPath}";`;
        })
        .join("\n");

      const spreadList = jsonFiles
        .map((file) => file.replace(".json", ""))
        .join(", ");

      const content = `${imports}

const module = {
  ${spreadList
    .split(", ")
    .map((name) => `...${name}`)
    .join(",\n  ")}
};

export default module;
`;

      const entryDir = path.dirname(entryFilePath);
      await fs.mkdir(entryDir, { recursive: true });

      await fs.writeFile(entryFilePath, content, "utf-8");
      console.log(`✅ TypeScript entry file generated at ${entryFilePath}`);
    } catch (err) {
      console.error("❌ Failed to generate TypeScript entry file", err);
    }
  }
}
