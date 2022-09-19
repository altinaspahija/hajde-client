import { StyleSheet, Platform } from "react-native";
import { s, vs, ms } from "react-native-size-matters";

export default function ({ Colors, Gutters, Layout }) {
  return StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 20,
    },
    inputContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 0,
    },
    inputStyle: {
      flex: 1,
      fontSize: 16,
      fontFamily: "Montserrat-Regular",
      textAlign: "center",
    },
    addressInput: {
      backgroundColor: Colors.white,
      borderRadius: 10,
      paddingVertical: 13,
      paddingHorizontal: 5,
      borderBottomWidth: 0,
      width: "94%",
      marginBottom: 15,
    },
    errorInputStyle: {
      marginTop: 0,
      marginBottom: 2,
      fontSize: 12,
      fontFamily: "Montserrat-Regular",
      textAlign: "center",
      textShadowColor: "#111",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 20,
      color: "#00FFEA",
      shadowColor: "#111",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 3.84,
      ...Platform.select({
        android: {
          elevation: 15,
        },
        backgroundColor: "#FFF",
      }),
    },
    signUpButtonText: {
      fontSize: 13,
    },
    signUpButton: {
      width: 250,
      borderRadius: Math.round(45 / 2),
      height: 45,
    },
    loginHereContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    alreadyAccountText: {
      fontSize: 12,
      color: "white",
    },
    loginHereText: {
      color: "#FF9800",
      fontSize: 12,
    },
    imageContainer: {
      width: s(200),
      height: vs(200),
      marginTop: ms(15),
    },
    imageContainerRegister: {
      width: vs(160),
      height: vs(160),
      padding: ms(25),
    },
    image: {
      //marginTop: 70,
      width: "100%",
      // Without height undefined it won't work
      height: "100%",
      // figure out your image aspect ratio
      aspectRatio: 135 / 76,
    },

    inputView: {
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      width: "80%",
      height: 45,
      marginBottom: 10,
      justifyContent: "center",
      alignItems: "center",
    },

    TextInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: "blue",
      padding: 10,
      marginLeft: 20,
      marginRight: 20,
      fontFamily: "Montserrat-Regular",
      fontSize: 16,
    },

    forgot_button: {
      fontFamily: "Montserrat-Regular",
      color: "#FFFFFF",
      fontSize: 14,
      height: 30,
      marginBottom: 30,
      textDecorationLine: "underline",
    },

    loginBtn: {
      height: s(53),
      width: s(53),
      alignItems: "center",
      justifyContent: "center",
    },

    back: {
      height: s(22),
      width: s(22),
      alignItems: "center",
      justifyContent: "center",
      marginTop: ms(15),
    },
    signUpText: {
      color: "white",
      fontSize: 28,
      fontFamily: "UbuntuLight",
      textAlign: "center",
    },
    whoAreYouText: {
      color: "#7384B4",
      fontFamily: "Montserrat-Regular",
      fontSize: 14,
      textAlign: "center",
    },
    userTypesContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      alignItems: "center",
    },
    userTypeItemContainer: {
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.5,
    },
    userTypeItemContainerSelected: {
      opacity: 1,
    },
    userTypeMugshot: {
      margin: 4,
      height: 70,
      width: 70,
    },
    userTypeMugshotSelected: {
      height: 100,
      width: 100,
    },
    userTypeLabel: {
      color: "yellow",
      fontSize: 11,
    },
    picker: {
      backgroundColor: Colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderBottomStartRadius: 10,
      borderTopStartRadius: 10,
      paddingLeft: 8,
      width: 50,
      height: 45,
    },
    inputIOS: {
      zIndex: 1,
      fontSize: 16,
      paddingVertical: 8,
      height: 40,
      fontFamily: "Montserrat-Regular",
      color: "white",
      paddingRight: 30,
      flexDirection: "row",
      alignItems: "center", // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 8,
      height: 40,
      fontFamily: "Montserrat-Regular",
      color: "white",
      paddingRight: 5,
      flexDirection: "row",
      alignItems: "center", // to ensure the text is never behind the icon
    },
    inputPrefix: {
      fontSize: 16,
      fontFamily: "Montserrat-Regular",
      color: "white",
      alignItems: "center",
    },
    title: {
      fontFamily: "Montserrat-Regular",
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    quot: {
      fontFamily: "Montserrat-Regular",
      color: "#FFFFFF",
      fontSize: 14,
      height: 30,
    },
    footer: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      left: 0,
      right: 0,
      bottom: 10,
      marginBottom: ms(18),
    },
    quotRegister: {
      fontFamily: "Montserrat-Regular",
      color: "#FFFFFF",
      fontSize: 14,
      height: 20,
    },
    footerRegister: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      left: 0,
      right: 0,
      bottom: 5,
      marginBottom: ms(1),
    },
    autoFill70: {
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    autoFill: {
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  });
}
