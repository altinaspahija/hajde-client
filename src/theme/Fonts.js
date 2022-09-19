/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ FontSize, Colors }) {
  return StyleSheet.create({
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
      fontFamily: 'Montserrat-Regular'
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
      fontFamily: 'Montserrat-Regular'
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
      fontFamily: 'Montserrat-Regular'
    },
    titleSmall: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
      fontFamily: 'Montserrat-Bold'
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
      fontFamily: 'Montserrat-Bold'
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
      fontFamily: 'Montserrat-Bold'
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    textFontRegular: {
      fontFamily: 'Montserrat-Regular'
    },
    textFontBold: {
      fontFamily: 'Montserrat-Bold'
    },
    textFontItalic: {
      fontFamily: 'Montserrat-Italic'
    },
  })
}
