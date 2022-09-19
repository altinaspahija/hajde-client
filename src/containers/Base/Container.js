import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CustomContainer } from "@/containers";
import { useTheme } from "@/hooks";

export default (props) => {
  const { Common, Images, Layout, Colors } = useTheme();
  const { login } = Common;

  return (
    <CustomContainer back={props.back}>
        <View style={[Layout.fill75, Layout.alignItemsCenter]}>
          <View style={[Layout.colCenter, login.imageContainerRegister]}>
            <Image
              style={login.image}
              resizeMode={"contain"}
              source={Images.hajdeStamp}
            />
          </View>
        </View>
        <View style={[Layout.fill, Layout.alignItemsCenter, login.autoFill70]}>
          {props.children}
          {!props.isLoading ? (
            <TouchableOpacity style={login.loginBtn} onPress={props.onPress}>
              <Image
                style={Layout.fullSize}
                resizeMode="contain"
                source={Images.loginButton}
              />
            </TouchableOpacity>
          ) : (
            <View style={login.loginBtn}>
              <ActivityIndicator
                animating
                size="large"
                color={Colors.inputBackground}
              />
            </View>
          )}
        </View>
    </CustomContainer>
  );
}
