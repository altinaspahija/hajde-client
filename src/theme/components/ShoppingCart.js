import { StyleSheet } from "react-native";
import { s, vs, ms, mvs } from "react-native-size-matters";

export default function ({ Colors, Gutters, Layout }) {
  const base = {
    ...Gutters.largeHPadding,
    backgroundColor: Colors.white,
  };
  const text = {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
  };

  return StyleSheet.create({
    base,
    container: {
      ...base,
      ...Gutters.regularTPadding,
    },
    infoText: {
      ...text,
      paddingLeft: 22,
      paddingBottom: 22,
    },
    baseText: {
      ...text,
    },
    deleteBox: {
      backgroundColor: Colors.buttonColor,
      paddingHorizontal: 15,
      borderRadius: 10,
      fontFamily: "Avenire-Regular",
      minHeight: 30,
      marginBottom: 24,
    },
    itemsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      minHeight: 30,
      marginBottom: 24,
    },
    quantityText: {
      fontFamily: "Montserrat-SemiBold",
      paddingRight: 10,
    },
    nameContainer: {
      // paddingLeft: 15,
      flexDirection: "row",
      width: 170,
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    number: {
      ...text,
      paddingHorizontal: 5,
      color: Colors.primary,
      fontSize: 18,
    },
    button: {
      height: 20,
      width: 20,
      borderRadius: 20,
      backgroundColor: Colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    address: {
      height: 157,
      borderRadius: 5,
      marginTop: 10,
    },
    addressButton: {
      paddingHorizontal: 36,
      paddingVertical: 16,
      borderRadius: 10,
      backgroundColor: Colors.white,
    },
    addressButtonText: {
      ...text,
      textAlign: "center",
    },
    deleteNoteContainer: {
      width: "95%",
      justifyContent: "center",
      alignItems: "center",
    },
    deleteProduct: {
      fontSize: 15,
      color: "#800000",
      marginBottom: 10,
    },
    marketStyle: {
      marginTop: 15,
      alignItems: "flex-start",
    },
    offerItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 15,
      backgroundColor: Colors.primary,
      borderRadius: 20,
    },
    offerItemText: {
      ...text,
      fontSize: 10,
      paddingRight: 15,
      maxWidth: "70%",
      color: Colors.white,
      textAlign: "justify",
    },
    offerItemTextBold: {
      fontFamily: "Montserrat-SemiBold",
      fontSize: 12,
      color: Colors.white,
    },
    textInput: {
      backgroundColor: Colors.white,
      width: "100%",
      height: 150,
      textAlignVertical: "top",
      paddingLeft: 15,
      paddingTop: 15,
      fontSize: 16,
      borderRadius: 17,
      marginBottom: 20,
      shadowColor: Colors.black,
      shadowOffset: {
        width: 5,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    stampOriginalContainer: {
      width: 27,
      height: 36,
    },
    editIconContainer: {
      width: 65,
      height: 30,
    },
    confirmButton: {
      marginTop: 10,
      marginHorizontal: 10,
      backgroundColor: Colors.white,
      paddingVertical: 15,
      borderRadius: 50,
      shadowColor: Colors.black,
      shadowOffset: {
        width: 5,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    confirmButtonText: {
      fontFamily: "Montserrat-Bold",
      fontSize: mvs(20, 1.5),
      color: Colors.primary,
    },
  });
}
