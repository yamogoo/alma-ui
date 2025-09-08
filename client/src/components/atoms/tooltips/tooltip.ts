import type { UIElementAlignment } from "@/typings";

import type { CharTooltipLabelProps } from "./charTooltipLabel";

export type TooltipAlign = UIElementAlignment;

export interface TooltipProps extends Pick<CharTooltipLabelProps, "label"> {
  align?: TooltipAlign;
}
