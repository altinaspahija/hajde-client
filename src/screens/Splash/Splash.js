import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks";
import { OrderPanelComponents } from "@/components";

const SplashScreenAnimation = () => {
  const { Images, Layout } = useTheme();
  return (
    <View style={Layout.fill}>
      <OrderPanelComponents source={[Images.amFlying]} />
    </View>
  );
};

export default SplashScreenAnimation;
