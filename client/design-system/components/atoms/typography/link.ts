import type { TextProps } from "./text";

import type { Route } from "@/typings/routes";

export interface LinkProps extends TextProps {
  to?: Route;
  href?: string;
}
