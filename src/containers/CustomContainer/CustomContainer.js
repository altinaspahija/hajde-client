import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks";
import { Header } from "@react-navigation/stack";

export default (props) => {
  const { Layout, Images, Common } = useTheme();
  const { login } = Common;
  return (
    <ImageBackground
      source={Images.authBackground}
      imageStyle={Layout.fill}
      style={Layout.fill}
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: props.behavior || "padding" })}
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: Header.HEIGHT + 20,
        })}
        style={Layout.fill}
      >
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
        <ScrollView
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Layout.flexGrow}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={Layout.fill}>{props.children}</SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={login.footer}>
        <Text style={login.quot}>| Nëse vonojmë, ne kompensojmë |</Text>
        <TouchableOpacity
          style={Layout.footer}
          onPress={() => Linking.openURL("https://hajde.market/privacy-policy")}
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
        <TouchableOpacity style={login.back} onPress={props.back}>
          <Image style={Layout.fullSize} source={Images.backButton} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
