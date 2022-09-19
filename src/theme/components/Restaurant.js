import { StyleSheet, Platform } from "react-native";
import { s, vs, ms, mvs } from "react-native-size-matters";

export default function ({ Colors, Gutters, Layout, FontSize }) {
  return StyleSheet.create({
    container: {
      flex: 1,
      // flexDirection: "column",
      backgroundColor: Colors.white,
      // justifyContent: "flex-start",
      // alignItems: "center",
      paddingBottom: 10,
    },
    allContainer: {
      width: "90%",
      display: "flex",
      alignItems: "flex-end",
      paddingBottom: 10,
      marginBottom: 5,
    },
    allButton: {
      backgroundColor: Colors.primary,
      borderWidth: 1,
      borderColor: Colors.white,
      paddingHorizontal: 5,
      paddingVertical: 3,
      borderRadius: 15,
      alignItems: "center",
      width: 100,
    },
    allButtonTitle: {
      fontSize: 15,
      fontFamily: "Montserrat-Regular",
      color: Colors.black,
      textAlign: "center",
    },
    containerSearch: {
      backgroundColor: "transparent",
      borderBottomColor: "transparent",
      borderTopColor: "transparent",
      marginVertical: 5,
    },
    input: {
      backgroundColor: Colors.white,
      fontFamily: "Montserrat-Regular",
      borderRadius: 10,
    },
    categoriesContainer: {
      width: "100%",
      paddingBottom: 15,
      flexDirection: "row",
    },
    catContainer:{
      width: 40,
      height: 40,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      paddingLeft: 5,
      paddingRight: 5,
    },
    leftIconContainerStyle:{
        color: Colors.primary
    },
    containerCard: {
      width: "100%",
      height: 100,
      borderRadius: 8,
      alignSelf: "center",
    },
    img: {
      width: "100%",
      height: 100,
      borderRadius: 10,
    },
    categorieContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    categorieName: {
      fontSize: 30,
      fontFamily: "Montserrat-SemiBold",
      color: "white",
      textTransform: "uppercase",
    },
    infoContainer: {
      width: "100%",
      alignSelf: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop:3,
      paddingBottom:10,
      paddingHorizontal: 14
    },
    infoRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    leftInfo: {
      paddingLeft: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    infoText: {
      fontSize: 12,
      fontFamily: "Montserrat-Regular",
      paddingRight: 5,
    },
    clockInfo: {
      fontSize: 16,
      fontFamily: "Montserrat-Regular",
      fontWeight: "bold",
      marginLeft: 0,
    },
    categorieContainerDisabled: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    categorieNameDisabled: {
      fontSize: 16,
      fontFamily: "Montserrat-SemiBold",
      color: "white",
    },
    leftInfoDisabled: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      // alignItems:"center"
    },
    infoContainerDisabled: {
      width: "100%",
      alignSelf: "center",
      display: "flex",
      flexDirection: "column",
      // alignItems: "flex-start",
      marginBottom: 20,
    },
  
    row: {
      paddingTop: 3,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    marketContainer: {
      height: 140,
      width: "100%",
      backgroundColor: "#D8D8D8",
      justifyContent: "center",
      alignItems: "center",
    },
    imgMarket: {
      height: 100,
      width: 150,
      backgroundColor: "#D8D8D8",
      resizeMode: "contain",
    },
    text:{
      fontFamily: "Montserrat-SemiBold",
      fontSize: 24,
      color: Colors.white
    },
    back: {
      height: s(22),
      width: s(22),
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
