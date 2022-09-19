//External dependencies
import React from "react";
import {
  View,
  Image,
  BackHandler,
  ImageBackground,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// Internal dependencies
import { LargeButton } from "@/components/Button/Button";
import { useBackHandler } from "@react-native-community/hooks";
import { useTheme } from "@/hooks";

export default function LaunchContainer({ navigation }) {
  useBackHandler(() => {
    BackHandler.exitApp();
  });

  const { Images, Layout, Colors, Common, Gutters } = useTheme();
  const { login } = Common;
  return (
    <ImageBackground source={Images.background} style={Layout.fill}>
     <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      <View
        style={[
          Layout.fill,
          Layout.colCenter,
          Gutters.largeVPadding,
          Gutters.largeVMargin,
          //Common.backgroundPrimary,
        ]}
      >
        <Image
          style={Layout.fullSize}
          resizeMode="contain"
          source={Images.firstLogo}
        />
      </View>
      <View style={[Layout.fill, Layout.colCenter]}>
        <LargeButton
          title="Hyr"
          color={Colors.white}
          textColor={Colors.primary}
          onPress={() => navigation.navigate("Login")}
        />
        <LargeButton
          title="Regjistrohu"
          color={Colors.white}
          textColor={Colors.primary}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <View style={Layout.fill}>
        <View style={login.footer}>
          <Text style={login.quot}>| Nëse vonojmë, ne kompensojmë |</Text>
          <TouchableOpacity
            style={Layout.footer}
            onPress={() =>
              Linking.openURL("https://hajde.market/privacy-policy")
            }
          >
            <Text
              style={[
                login.quot,
                { textDecorationLine: "underline", fontSize: 12 },
              ]}
            >
              Lexo Kushtet e perdorimit dhe privatësisë
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
