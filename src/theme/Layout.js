import { StyleSheet } from "react-native";

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function () {
  return StyleSheet.create({
    /* Column Layouts */
    column: {
      flexDirection: "column",
    },
    columnReverse: {
      flexDirection: "column-reverse",
    },
    colCenter: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    colVCenter: {
      flexDirection: "column",
      alignItems: "center",
    },
    colHCenter: {
      flexDirection: "column",
      justifyContent: "center",
    },
    /* Row Layouts */
    row: {
      flexDirection: "row",
    },
    rowReverse: {
      flexDirection: "row-reverse",
    },
    rowCenter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    rowVCenter: {
      flexDirection: "row",
      justifyContent: "center",
    },
    rowHCenter: {
      flexDirection: "row",
      alignItems: "center",
    },
    /* Default Layouts */
    center: {
      alignItems: "center",
      justifyContent: "center",
    },
    alignItemsCenter: {
      alignItems: "center",
    },
    alignItemsStart: {
      alignItems: "flex-start",
    },
    alignItemsStretch: {
      alignItems: "stretch",
    },
    justifyContentCenter: {
      justifyContent: "center",
    },
    justifyContentEnd: {
      justifyContent: "flex-end",
    },
    justifyContentAround: {
      justifyContent: "space-around",
    },
    justifyContentBetween: {
      justifyContent: "space-between",
    },
    scrollSpaceAround: {
      flexGrow: 1,
      justifyContent: "space-around",
    },
    scrollSpaceBetween: {
      flexGrow: 1,
      justifyContent: "space-between",
    },
    selfStretch: {
      alignSelf: "stretch",
    },
    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    flex2: {
      flex: 2,
    },
    flex3: {
      flex: 3,
    },
    flex4: {
      flex: 4,
    },
    flexGrow: {
      flexGrow: 1,
    },
    half: {
      flex: 1 / 2,
    },
    quarter: {
      flex: 0.25,
    },
    fill95: {
      flex: 0.95,
    },
    fill90: {
      flex: 0.9,
    },
    fill85: {
      flex: 0.85,
    },
    fill80: {
      flex: 0.8,
    },
    fill75: {
      flex: 0.75,
    },
    fill70: {
      flex: 0.7,
    },
    fill65: {
      flex: 0.65,
    },
    fill60: {
      flex: 0.6,
    },
    fill55: {
      flex: 0.55,
    },
    fill50: {
      flex: 0.5,
    },
    fill45: {
      flex: 0.45,
    },
    fill40: {
      flex: 0.4,
    },
    fill35: {
      flex: 0.35,
    },
    fill30: {
      flex: 0.3,
    },
    fill25: {
      flex: 0.25,
    },
    fill20: {
      flex: 0.2,
    },
    fill15: {
      flex: 0.15,
    },
    fill10: {
      flex: 0.1,
    },
    fill05: {
      flex: 0.05,
    },
    fullSize: {
      height: "100%",
      width: "100%",
    },
    width85percent: {
      width: "85%",
    },
    halfSize: {
      height: "50%",
      width: "50%",
    },
    fullWidth: {
      width: "100%",
    },
    fullHeight: {
      height: "100%",
    },
    halfWidth: {
      width: "50%",
    },
    width10: {
      width: 10,
    },
    width20: {
      width: 20,
    },
    width30: {
      width: 30,
    },
    width40: {
      width: 40,
    },
    width50: {
      width: 50,
    },
    width60: {
      width: 60,
    },
    width70: {
      width: 70,
    },
    width80: {
      width: 80,
    },
    width90: {
      width: 90,
    },
    width100: {
      width: 100,
    },
    height10: {
      height: 10,
    },
    height20: {
      height: 20,
    },
    height30: {
      height: 30,
    },
    height40: {
      height: 40,
    },
    height50: {
      height: 50,
    },
    height60: {
      height: 60,
    },
    height70: {
      height: 70,
    },
    height80: {
      height: 80,
    },
    height90: {
      height: 90,
    },
    height100: {
      height: 100,
    },
    halfHeight: {
      height: "50%",
    },
    /* Operation Layout */
    mirror: {
      transform: [{ scaleX: -1 }],
    },
    rotate90: {
      transform: [{ rotate: "90deg" }],
    },
    rotate90Inverse: {
      transform: [{ rotate: "-90deg" }],
    },
  });
}
