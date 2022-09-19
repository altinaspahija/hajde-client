/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: "rgba(0,0,0,0)",
  inputBackground: "#FFFFFF",
  white: "#FFFFFF",
  text: "#212529",
  primary: "#00CCBB",
  primaryTransparent: "#00CCBB80",
  primaryDark: "#09887E",
  secondary: "#CCFFFB",
  success: "#28a745",
  error: "#dc3545",
  textColor: "#004E48",
  backgroundColor: "#FFFFFF",
  grayColor: "#dcdcdc",
  buttonColor: "#00CCBB",
  aqua: "#E7FDFB",
  aquaPrimary: "#A8F9F2",
  aquaSecondary: "#93F2EA",
  header: "#004E48",
  black: "#2d2d2d",
  grayCode: "#E9E9E9",
  grayCode30: "#859392",
  grayCode70: "#707070",
  gray30: "#303030",
  red: "red",
  green: "green",
  gray: "#5B5C5E",
  yellow: "yellow",
  purple: "purple",
};

export const NavigationColors = {
  primary: Colors.primary,
};

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  normal: 30,
  large: 40,
  heavy: 60,
  extra: 900,
};

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const normal = small * 2; //20
const large = regular * 2; // 30
const nLarge = -regular * 2;
const heavy = large * 2; // 60
const extra = 850;
export const MetricsSizes = {
  tiny,
  small,
  regular,
  normal,
  large,
  nLarge,
  heavy,
  extra,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
