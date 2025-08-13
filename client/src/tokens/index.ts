import baseColors from "./build/baseColors.json";
import breakpoints from "./build/breakpoints.json";
import colors from "./build/colors.json";
import components from "./build/components.json";
import themes from "./build/themes.json";
import tokens from "./build/tokens.json";
import typography from "./build/typography.json";

const module = {
  ...baseColors,
  ...breakpoints,
  ...colors,
  ...components,
  ...themes,
  ...tokens,
  ...typography
};

export default module;
