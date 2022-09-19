import { StyleSheet } from "react-native";
import { backgroundColor, black, textColor } from "../../styles/global";
export default StyleSheet.create({
  container: {
    flex: 1.3,
    justifyContent: "flex-start",
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
    flex: 1,
    justifyContent: "space-between"
    //paddingBottom: 100
  },

  imgPrs: {
    height: 120,
    width: 120,
    borderRadius: 80,
    backgroundColor: "#D8D8D8",
    resizeMode: "cover",
  },
  name: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
    marginVertical: 10
  },

  descriptionContainer: {
    justifyContent: "flex-start",
  },
  desContainer: {
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
    fontSize: 14,
    padding: 5,
    fontFamily: "Montserrat-Regular",
    color: "#77838F",
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
    backgroundColor: "#707070",
    justifyContent: "center",
    alignItems: "center",
  }
});
