import { StyleSheet, Platform } from "react-native";
import { s, vs, ms, mvs } from "react-native-size-matters";

export default function ({ Colors, Gutters, Layout, FontSize }) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      justifyContent: "center",
      //height: '50%'
    },
    logo: {
      height: "20%",
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 30,
    },
    searchContainer: {
      height: "10%",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    notificationIcon: {
      ...Platform.select({
        ios: {
          position: "absolute",
          zIndex: 2,
          right: 20,
          top: 50,
        },
        android: {
          position: "absolute",
          right: 20,
          top: 40,
        },
      }),
    },
    searchTxtInput: {
      ...Platform.select({
        ios: {
          width: "85%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 30,
          paddingHorizontal: 50,
          paddingVertical: 10,
          backgroundColor: "white",
          fontFamily: "Montserrat-SemiBoldItalic",
        },
        android: {
          width: "85%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 30,
          paddingHorizontal: 50,
          backgroundColor: "white",
          fontFamily: "Montserrat-SemiBoldItalic",
        },
      }),
    },
    buttonsContainer: {
      backgroundColor: Colors.white,
      // height: "40%",
      flex: 3,
    },
    buttonButtos: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    containerModal: {
      alignItems: "center",
      backgroundColor: "#ede3f2",
      padding: 100,
    },
    modal: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#f7021a",
      padding: 100,
    },
    text: {
      color: "#3f2949",
      marginTop: 10,
    },
    bannersContainer: {
      flex: 1.2,
      // height: "20%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 2,
    },
    titleBody: {
      fontSize: mvs(FontSize.regular),
      fontWeight: "700",
      paddingHorizontal: 20,
      color: Colors.primary,
      fontFamily: "Montserrat-SemiBoldItalic",
      fontStyle: "italic",
    },
    locationContainer: {
      marginTop: mvs(15, 4.5),
      marginLeft: 20,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    locationRight: {
      width: 35,
      height: 35,
      marginRight: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    locationLeft: {
      width: 30,
      height: 25,
      justifyContent: "center",
      alignItems: "center",
    },
  });
}
