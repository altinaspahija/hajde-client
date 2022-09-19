import { StyleSheet } from "react-native";
import { s, vs, mvs } from "react-native-size-matters";


export default function ({ Colors, Gutters, Layout }) {
  return StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: mvs(40),
        fontFamily: "Montserrat-Bold",
        color: Colors.white
    },
    description: {
        textAlign: 'center',
        fontSize: mvs(12),
        fontFamily: "Montserrat-SemiBold",
        color: Colors.white
    },
    bodyTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: mvs(13),
        fontFamily: "Montserrat-Bold",
        color: '#707070'
    },
    footerNotice: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: mvs(13),
        fontFamily: "Montserrat-SemiBold",
        color: '#707070'
    },
    footerDescription: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: mvs(50),
        fontFamily: "Montserrat-SemiBold",
        color: Colors.gray
    },
    footerOnPress: {
        width: 50,
        height: 20,
        borderRadius: 20,
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
    },
    footerOnPressText: {
        color: Colors.white,
        fontFamily: "Montserrat-SemiBold",
        fontSize: mvs(13),
    }
})
}
