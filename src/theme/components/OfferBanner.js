import { StyleSheet } from "react-native";
export default function ({ Colors, Gutters, Layout }) {
  const text= {
    color: Colors.white,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
  }
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.primaryTransparent,
      position: "absolute",
      bottom: 0,
      left: 0,
      zIndex: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      ...Gutters.smallHPadding,
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      width: "100%",
      height: 24,
    },
    description: {
      ...text
    },
    time: {
      ...text
    },
  });
}
