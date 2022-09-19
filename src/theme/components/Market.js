import { StyleSheet } from "react-native";
import { s, vs, ms } from "react-native-size-matters";


export default function ({ Colors, Gutters, Layout }) {
  return StyleSheet.create({
  pickerIconsContainer: {
    flex: 0.08,
    marginTop: 10,
    width: "91%",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: Colors.buttonColor,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 30,
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    borderTopColor: Colors.white,
    borderTopWidth: 1,
  },
  containerCard: {
    width: "100%",
    height: 100,
    borderRadius: 6,
    backgroundColor: "#f6f6f6",
  },

  nameContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  cardImg: {
    height:"100%",
    width: "100%",
    borderTopRightRadius:6,
  borderTopLeftRadius:6  },
  bottomCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.aquaSecondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  bottomCardItems: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: Colors.header,
    fontFamily: "Montserrat-Regular",
  },
  icon: {
    paddingRight: 5,
  },
  inputIOS: {
    color: "white",
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderRadius: 20,
  },
  inputAndroid: {
    width: "95%",
    color: Colors.white,
    backgroundColor: Colors.buttonColor,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  }, 
  searchText:{
    fontFamily: "Montserrat-SemiBold",
    fontSize: ms(21),
    marginLeft: 30,
    color: Colors.white,
    letterSpacing: ms(2),
  },
})
}
