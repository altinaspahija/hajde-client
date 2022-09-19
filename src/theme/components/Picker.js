import { StyleSheet } from "react-native";

export default function ({ Colors }) {
  return StyleSheet.create({
  inputIOS: {
    color:  Colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inputAndroid: {
   // width: "100%",
    color:  Colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    borderRadius: 20,
    paddingHorizontal: 40,
  }, 
})
}
