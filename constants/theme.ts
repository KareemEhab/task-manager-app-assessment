/**
 * Brand color palette for the task manager app
 */

import { Platform } from "react-native";

// Brand Colors
export const BrandColors = {
  main: "#3377FF",
  darker: "#256369",
  lighter: "#96B8FF",
  subtle: "#E3EDFF",
};

// Dark Colors
export const DarkColors = {
  dark1: "#3A3A3C",
  dark2: "#687588",
  dark3: "#8B90A6",
  dark4: "#C7C9D9",
};

// Light Colors
export const LightColors = {
  light1: "#DDE5E9",
  light2: "#EBEBF0",
  light3: "#F2F2F6",
  light4: "#FAFAFC",
};

export const Colors = {
  light: {
    text: DarkColors.dark1,
    background: LightColors.light4,
    tint: BrandColors.main,
    icon: DarkColors.dark3,
    tabIconDefault: DarkColors.dark3,
    tabIconSelected: BrandColors.main,
  },
  dark: {
    text: LightColors.light4,
    background: DarkColors.dark1,
    tint: BrandColors.lighter,
    icon: DarkColors.dark3,
    tabIconDefault: DarkColors.dark3,
    tabIconSelected: BrandColors.lighter,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
