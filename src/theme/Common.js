/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from "react-native";
import buttonStyles from "./components/Buttons";
import login from "./components/Login";
import home from "./components/Home";
import restaurant from "./components/Restaurant";
import market from "./components/Market";
import noContent from "./components/NoContent";
import subCategory from "./components/SubCategory";
import Fonts from "./Fonts";

import { s, vs, ms, mvs } from "react-native-size-matters";
import Orders from "./components/Orders";
import Picker from "./components/Picker";
import orderItem from "./components/OrderItem";
import shoppingCart from "./components/ShoppingCart";
import RestaurantProducts from "./components/RestaurantProducts";
import OfferBanner from "./components/OfferBanner";

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors, ...args }) {
  const baseText = {
    ...Fonts({ Colors, ...args }).textSmall,
  };
  return {
    button: buttonStyles({ Colors, ...args }),
    login: login({ Colors, ...args }),
    home: home({ Colors, ...args }),
    restaurant: restaurant({ Colors, ...args }),
    market: market({ Colors, ...args }),
    noContent: noContent({ Colors, ...args }),
    subCategory: subCategory({ Colors, ...args }),
    orders: Orders({ Colors, ...args }),
    orderItem: orderItem({ Colors, ...args }),
    shoppingCart: shoppingCart({ Colors, ...args }),
    restaurantProducts: RestaurantProducts({ Colors, ...args }),
    picker: Picker({ Colors, ...args }),
    offerBanner: OfferBanner({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundWhite: {
        backgroundColor: Colors.backgroundColor,
      },
      backgroundGray: {
        backgroundColor: Colors.grayCode,
      },
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundSecondary: {
        backgroundColor: Colors.secondary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      backgroundHalfDark: {
        backgroundColor: "#00000070",
      },
      textPrimary: {
        ...baseText,
        color: Colors.primary,
      },
      textWhite: {
        ...baseText,
        color: Colors.white,
      },
      textBlack: {
        ...baseText,
        color: Colors.black,
      },
      textRed: {
        ...baseText,
        color: Colors.red,
      },
      textBlackBold: {
        ...baseText,
        color: Colors.black,
        fontFamily: "Montserrat-Bold",
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
      },
      titleBanner: {
        fontSize: mvs(17, 1.7),
        fontWeight: "bold",
        color: Colors.text,
        fontFamily: "Montserrat-Bold",
      },
      title: {
        fontSize: mvs(20, 0.5),
        color: Colors.white,
        fontFamily: "Montserrat-Medium",
      },
      titleBlack: {
        fontSize: mvs(20, 0.5),
        color: Colors.black,
        fontFamily: "Montserrat-Bold",
      },
      titleGray: {
        fontSize: mvs(20, 0.5),
        color: Colors.gray,
        fontFamily: "Montserrat-Bold",
      },
      subTitleGray: {
        fontSize: mvs(15),
        color: Colors.gray,
        fontFamily: "Montserrat-Regular",
      },
      subTitleBoldGray: {
        fontSize: mvs(15),
        color: Colors.gray,
        fontFamily: "Montserrat-Bold",
      },
      activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      emptyText: {
        textAlign: "center",
        color: Colors.header,
        fontFamily: "Montserrat-Regular",
        fontSize: 16,
      },
      primaryText: {
        width: 200,
        color: Colors.black,
        fontFamily: "Montserrat-Bold",
        fontSize: 14,
      },
      searchContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 10,
        paddingVertical: 10,
        backgroundColor: "white",
        borderColor: "#a4a4a490",
      },
      whiteSpace: {
        position: "absolute",
        bottom: 0,
        height: "40%",
        width: "100%",
        backgroundColor: "white",
      },
      shadow: {
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
      },
      textShadow: {
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
      },
      headerContainerStyle: {
        backgroundColor: Colors.primary,
        borderBottomWidth: 1,
      },
      headerCenterStyle: {
        color: "white",
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
      },
    }),
    statusBarStyle: {
      barStyle: "dark-content",
      translucent: true,
      backgroundColor: "transparent",
    },
    pickerStyle: {
      marginBottom: 10,
      paddingLeft: 5,
      paddingRight: 5,
      width: "93%",
      height: 45,
      backgroundColor: Colors.white,
      borderRadius: 10,
      fontSize: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 3,
    },
    pickerHomeStyle: {
      marginBottom: 0,
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 5,
      paddingRight: 5,
      height: 35,
      backgroundColor: Colors.primary,
      borderRadius: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    flatListBPadding: {
      paddingBottom: 100,
    },
    logoContainer: {
      width: 20,
      height: 25,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      //width: 100,
      paddingHorizontal: 12,
      height: 30,
      backgroundColor: Colors.white,
    },
    buttonText: {
      ...baseText,
      paddingHorizontal: 5,
      color: Colors.buttonColor,
    },
  };
}
