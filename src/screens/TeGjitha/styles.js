import { StyleSheet } from "react-native";
import {
  backgroundColor,
} from "../../styles/global";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: backgroundColor,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 20,
  },
  containerSearch: {
    backgroundColor: backgroundColor,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#e8f8f7",
    borderRadius: 30,
  },
  containerCard: {
    marginVertical: 10,
    marginLeft: 10,
    height: 140,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 15,
  },
  categorieName: {
    fontSize: 24,
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
  },
  title: {
    color: "#1E2022",
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
  }
});
