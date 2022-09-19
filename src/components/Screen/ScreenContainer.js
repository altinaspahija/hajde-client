import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/hooks";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../Button/Button";
import { Header } from "react-native-elements";

const ScreenContainer = ({ title, children, backButton = true, rightComponent }) => {
  const { Layout, Common, Colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={[Layout.fill, Common.backgroundWhite]}>
      <Header
        statusBarProps={{
          barStyle: "dark-content",
          translucent: true,
          backgroundColor: Colors.transparent,
        }}
        containerStyle={{
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={backButton ? <BackButton onPress={() => navigation.goBack()} /> : null}
        rightComponent={rightComponent}
        centerComponent={{
          text: title,
          style: {
            color: Colors.header,
            fontSize: 20,
            fontFamily: "Montserrat-Regular",
          },
        }}
      />
      {children}
    </View>
  );
};

export default ScreenContainer;
