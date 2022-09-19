import { StyleSheet } from "react-native";

export default function ({ Colors, Gutters }) {
  return StyleSheet.create({
    container: {
      height: 102,
    },
    imageBackground: {
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomWidth: 0,
    },
    imageText: {
      color: Colors.white,
      fontSize: 24,
      fontWeight: "bold",
    },
    details: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: Colors.white,
      shadowColor: Colors.black,
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
        height: 1,
        width: 1,
      },
      elevation: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      ...Gutters.smallHPadding,
    },
    quantity: {
      fontSize: 14,
      fontWeight: "bold",
      color: Colors.gray30
    },
    price: {
      fontSize: 14,
      fontWeight: "bold",
      color: Colors.gray30
    },
    date : {
      color: Colors.gray30,
    },
    button: {
      backgroundColor: Colors.primary,
      ...Gutters.regularHPadding,
      borderRadius: 10,
    },
    buttonText: {
      color: Colors.white,
      fontSize: 14,
    },
    buttonContainer: { position: "absolute", bottom: 0, left: 48 },
    address: { width: 150, paddingLeft: 5, paddingRight: 15 },
    tint: {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  });
}
