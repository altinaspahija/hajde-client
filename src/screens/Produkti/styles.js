import { StyleSheet } from "react-native";
import { backgroundColor, black, textColor, buttonColor } from "../../styles/global";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: backgroundColor,
  },
  productContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  savedImg: {
    paddingRight: 10,
  },
  img: {
    height: 200,
    width: 300,
    // backgroundColor: "#D8D8D8",
    resizeMode: "contain",
  },

  imgPrs: {
    height: 120,
    width: 120,
    borderRadius: 80,
    backgroundColor: "#D8D8D8",
    resizeMode: "cover",
  },
  name: {
    color: textColor,
    fontSize: 22,
    fontFamily: "Montserrat-Bold",
    paddingTop: 15,
    marginBottom: 15,
  },

  descriptionContainer: {
    justifyContent: "flex-start",
  },
  desContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  unitContainer: {
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  desTitle: {
    padding: 5,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: textColor,
    paddingTop: 8,
  },
  des: {
    padding: 5,
    fontFamily: "Montserrat-Regular",
    color: black,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 20,
  },
  number: {
    paddingHorizontal: 15,
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },

  button: {
    height: 27,
    width: 27,
    borderRadius: 27,
    backgroundColor: buttonColor,
    justifyContent: "center",
    alignItems: "center",
  }
});
