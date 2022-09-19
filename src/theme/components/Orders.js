import { StyleSheet } from "react-native";

export default function ({ Colors, Gutters, Layout }) {
  const base = {
    ...Gutters.normalHMargin,
    backgroundColor: Colors.white,
  };
  const text = {
    fontFamily: "Montserrat-Bold",
  };
  const textRegular = {
    fontFamily: "Montserrat-Regular",
  };
  const space = {
    width: "22%",
    marginHorizontal: 5,
    height: 6,
    borderRadius: 6,
  };

  return StyleSheet.create({
    base,
    container: {
      ...base,
      ...Gutters.regularTPadding,
    },
    containerCard: {
      width: "100%",
      height: 100,
      borderRadius: 8,
      alignSelf: "center",
      backgroundColor: "white",
      shadowColor: "black",
      shadowOffset: {
        width: 2,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    coreContainerImage: {
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
    },
    coreImage: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    orderCard: {
      height: 120,
      paddingBottom: 20,
    },
    title: {
      ...text,
      fontSize: 24,
    },
    titleOnDetails: {
      ...text,
      fontSize: 20,
      color: Colors.grayCode70,
    },
    subTitleOnDetails: {
      ...textRegular,
      fontSize: 14,
      color: Colors.grayCode70,
    },
    circleOne: {
      position: "absolute",
      top: 2,
      right: 2,
      width: 30,
      height: 30,
      borderRadius: 30,
      zIndex: 10,
    },
    circleTwo: {
      position: "absolute",
      top: 5,
      left: 5,
      width: 20,
      height: 20,
      borderRadius: 50,
    },
    circleThree: {
      position: "absolute",
      top: 10,
      left: 10,
      width: 10,
      height: 10,
      borderRadius: 50,
    },
    statusOrder: {
      position: "absolute",
      backgroundColor: "rgba(255,255,255,0.77)",
      zIndex: 10,
      top: 7,
      left: 7,
      paddingHorizontal: 8,
      borderRadius: 3,
    },
    statusOrderText: {
      fontFamily: "Montserrat-Regular",
      fontSize: 10,
    },
    modalView: {
      flex: 1,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      width: "100%",
      height: "100%",
    },
    buttonStyle: {
      marginTop: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      width: 40,
      height: 30,
      marginRight: 10,
    },
    showText: {
      color: "#333",
      fontSize: 18,
      textAlign: "center",
    },
    triangle: {
      width: 0,
      height: 0,
      borderLeftWidth: 15,
      borderLeftColor: Colors.grayCode,
      borderRightWidth: 15,
      borderRightColor: Colors.grayCode,
      borderTopWidth: 10,
      borderTopColor: Colors.white,
      shadowColor: Colors.grayCode,
      shadowOpacity: 0.2,
      shadowRadius: 0.2,
      shadowOffset: {
        height: 2,
        width: 2,
      },
      elevation: 1,
    },
    bill: {
      flex: 1,
      backgroundColor: Colors.grayCode,
    },
    spaceActive: {
      ...space,
      backgroundColor: Colors.primaryDark,
    },
    spaceDeactive: {
      ...space,
      backgroundColor: Colors.grayCode30,
    },
    moreTouch: {
      backgroundColor: Colors.primary,
      borderRadius: 5,
      paddingHorizontal: 30
    },
    moreText: {
      ...textRegular,
      fontSize: 14,
      color: Colors.white,
      paddingVertical: 5
    },
  });
}
