import { StyleSheet } from "react-native";
import {
  black,
  buttonColor,
  grayColor,
  primary,
  textColor,
} from "../../styles/global";

export default StyleSheet.create({
  circleText: {
    color: "black",
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    paddingTop: 8,
  },
  buttonText: {
    color: primary,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
  circleButtons: {
    width: 122,
    height: 122,
    borderRadius: 122,
    backgroundColor: primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  largeButton: {
    width: "65%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: buttonColor,
    shadowOffset: {
      width: 0.3,
      height: 0.3
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    margin: 5
  },
  largeButtonRadius: {
    width: "55%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: buttonColor,
    borderRadius: 25,
  },
  addButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
  },
  circleButton: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    textAlign: "center",
  },
  linkButton: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: buttonColor,
  },
  backButtonContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 30
  },
  backButtonRestaurantContainer: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    marginTop: 20
  },
  quickButtonContainer: {
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  trackButton: {
    width: 70,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: buttonColor,
  },
  trackButtonText: {
    fontSize: 14,
    color: primary,
    fontFamily: "Montserrat-Regular",
  },
  solidButton: {
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#FFF",//"#e8f8f7",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: black,
    borderWidth: 2,
    marginLeft: 5,
  },
  iconImage: {
    height: 35,
    width: 35,
    resizeMode: 'cover'
  },
  solidButtonTitle: {
    fontSize: 10,
    fontFamily: "Montserrat-Regular",
    color: black,
    textAlign: "center",
    paddingHorizontal: 5,
    paddingBottom: 8
  },
  selectedBackground: {
    borderColor: buttonColor,
    borderBottomWidth: 5,
  },
  produktetButton: {
    borderRadius: 10,
    backgroundColor: "#00ccbb",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 15
  },
  selectedBackgroundProduktet: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#00ccbb",
    paddingVertical: 3,
    paddingHorizontal: 15
  },
  produktetButtonTitle: {
    fontSize: 16,
    color: "white"
  },
  selectedProduktetTitle: {
    fontSize: 16,
    color: "#00ccbb"
  }
});
