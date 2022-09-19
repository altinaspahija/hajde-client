import { StyleSheet } from "react-native";
import {
  textColor,
  backgroundColor,
  primary,
  grayColor,
  buttonColor,
  header,
} from "../../styles/global";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    backgroundColor: primary,
    width: "100%",
    paddingBottom: 20,
  },
  // locationContainer: {
  //   minHeight: 300,
  //   width: "95%",
  //   alignSelf: "center",
  //   marginBottom: 30,
  // },
  topContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  indicator: {
    alignSelf: "flex-start",
    minHeight: 230,
    marginTop: 20,
    paddingLeft: 25,
  },
  text: {
    fontSize: 16,
    color: textColor,
    paddingVertical: 5,
    textAlign: "center",
  },
  ordersContainer: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: backgroundColor,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  ordersTitle: {
    fontSize: 16,
    color: textColor,
    paddingVertical: 20,
    textAlign: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: grayColor,
  },
  listProductContainer: {
    width: "70%",
  },
  listProductContainer1: {
    width: "100%",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: grayColor,
  },
  listTitle: {
    fontSize: 16,
    color: textColor,
    paddingVertical: 10,
  },
  listProduct: {
    fontSize: 16,
    color: textColor,
    fontFamily: "Avenire-Regular",
    paddingTop: 10,
  },
  listProductTyped: {
    fontSize: 16,
    color: textColor,
    fontFamily: "Avenire-Regular",
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 16,
    color: textColor,
    fontFamily: "Avenire-Regular",
    paddingVertical: 5,
  },
  totalPriceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPrice: {
    fontSize: 18,
    color: textColor,
    paddingVertical: 10,
  },
  manualishtContainer: {
    width: "95%",
    alignSelf: "center",
  },
  manualisht: {
    alignSelf: "center",
    width: "100%",
    height: 50,
    backgroundColor: primary,
    marginBottom: 30,
    borderRadius: 10,
    fontSize: 16,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  note: {
    fontSize: 16,
    color: textColor,
    paddingVertical: 20,
    fontFamily: "Avenire-Regular",
  },
  anulo: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  porosia: {
    paddingVertical: 20,
    fontFamily: "Avenire-Regular",
    color: "#800000",
    fontSize: 16,
  },
  userList: {
    width: "100%",
    // paddingVertical: 5,
  },
  description: {
    fontSize: 15,
    color: buttonColor,
    fontFamily: "Avenire-Regular",
    paddingBottom: 5,
    // paddingTop: 5,
  },
  descriptionName: {
    fontSize: 14,
    color: header,
    fontFamily: "Avenire-Regular",
    paddingBottom: 5,
  },
  
});
