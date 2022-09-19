import { Platform, StyleSheet } from "react-native";
import { vs } from "react-native-size-matters";

const BORDER_RADIUS = vs(15);
const TABBAR_HEIGHT = vs(46);
export default function ({ Colors }) {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: Colors.backgroundColor,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBottom: 10,
    },
    marketContainer: {
      height: 140,
      width: "100%",
      backgroundColor: "#D8D8D8",
      justifyContent: "center",
      alignItems: "center",
    },
    savedImg: {
      paddingRight: 10,
    },
    img: {
      height: 100,
      width: 150,
      backgroundColor: "#D8D8D8",
      resizeMode: "contain",
    },
    marketTitile: {
      fontSize: 24,
      fontFamily: "Avenire-Regular",
      color: Colors.textColor,
      paddingTop: 5,
      textAlign: "center",
    },

    searchBarcontainer: {
      backgroundColor: Colors.white,
      borderBottomColor: Colors.backgroundColor,
      borderTopColor: "transparent",
      marginVertical: 10,
      width: "98%",
    },
    input: {
      borderRadius: 30,
      backgroundColor: "#EAECEF",
    },
    subCatContainer: {
      width: "100%",
      //paddingLeft: 10,
      // borderBottomWidth: 2,
      // borderBottomColor: Colors.black,
      // paddingBottom: 15,
      flexDirection: "row",
    },
    subline: {
      position: "absolute",
      borderBottomWidth: 4,
      borderColor: Colors.black,
      width: "100%",
      height: 3,
      top: 21,
    },

    titile: {
      fontSize: 20,
      fontFamily: "Avenire-Regular",
      color: Colors.textColor,
    },
    containerCard: {
      flex: 1,
      width: "50%",
      flexDirection: "row",
      justifyContent: "flex-start",
      //alignItems: "flex-end",
      //alignSelf: "center",
      marginBottom: 10,
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-around",
      paddingHorizontal: 10,
      paddingBottom: 8,
    },
    number: {
      paddingHorizontal: 5,
      fontSize: 22,
      fontFamily: "Montserrat-SemiBold",
      color: Colors.primary,
    },
    containerInfo: {
      display: "flex",
      flexDirection: "row",
    },
    cardImg: {
      height: 90,
      width: 90,
      resizeMode: "contain",
      alignSelf: "center",
    },
    nameContainer: {
      width: "80%",
      alignItems: "center",
    },
    name: {
      fontSize: 12,
      fontFamily: "Montserrat-Regular",
      color: Colors.black,
    },
    price: {
      fontSize: 14,
      fontFamily: "Montserrat-Bold",
      color: Colors.black,
    },
    bottomContainer1: {
      bottom: 20,
      zIndex: 1,
      display: "flex",
      flexDirection: "row",
      alignSelf: "center",
      backgroundColor: "#00cbbb",
      width: "100%",
      borderRadius: 30,
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 5,
    },
    bottomContainer: {
      width: "90%",
      alignSelf: "center",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      flexDirection: "row",
      paddingBottom: 5,
      padding: 4,
      position: "absolute",
      ...Platform.select({
        ios: { bottom: vs(20) },
        android: { bottom: vs(7) },
        default: { bottom: vs(37) },
      }),
      right: "5%",
      borderRadius: BORDER_RADIUS,
      height: TABBAR_HEIGHT,
      // shadow is handled differently for iOS and Android
      // for iOS
      shadowOffset: {
        // width: 5,
        // height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      // for Android
      elevation: 7,
    },
    bottomContainerSmall: {
      alignSelf: "flex-end",
      width: "auto",
      paddingHorizontal: 20,
    },
    shportaImg: {
      height: 30,
      width: 30,
      resizeMode: "contain",
    },
    button: {
      height: 27,
      width: 27,
      borderRadius: 27,
      backgroundColor: "#00CCBB",
      justifyContent: "center",
      alignItems: "center",
    },
    headerContainer: {
      paddingTop: 30,
      height: 70,
      flexDirection: "row",
      borderBottomColor: Colors.black,
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: Colors.white,
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
}
