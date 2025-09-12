import tokens from "@/tokens";

import type { UIElementTypographyTag } from "@/typings";

export type TextVariant = keyof typeof tokens.typography.styles;

export type TextStyle = "normal" | "italic" | "oblique";

export type TextTransform =
  | "none"
  | "capitalize"
  | "uppercase"
  | "lowercase"
  | "full-width";

export type TextDecoration = "none" | "underline" | "line-through";

export type TextColor = keyof typeof tokens.themes.light.abstracts.label;

export interface TextProps {
  as?: UIElementTypographyTag;
  value?: string;
  variant?: TextVariant;
  textColor?: TextColor;
  display?: "inline-block" | "block";
  color?: string;
  weight?: string;
  align?: "left" | "center" | "right" | "justify";
  size?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: TextTransform;
  textDecoration?: TextDecoration;
  fontFamily?: string;
  fontStyle?: TextStyle;
  fontSize?: string;
  fontWeight?: string;
  fontStretch?: string;
  fontVariant?: string;
  fontFeatureSettings?: string;
  fontSynthesis?: string;
  textIndent?: string;
  textOverflow?: "clip" | "ellipsis";
}
