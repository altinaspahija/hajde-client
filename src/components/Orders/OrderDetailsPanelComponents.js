import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "@/hooks";
import { s, vs, ms, mvs } from "react-native-size-matters";

export const SPLASH_DURATION = Platform.select({ android: 4000, ios: 3000 });

const OrderPanelComponents = ({ source, backgroundColor, loop = true }) => {
  const { Layout, Colors, Images } = useTheme();
  if (source.length === 0) source.push(Images.amFastFood);
  return (
    <View style={Layout.center}>
      <View style={[styles.overlay, { backgroundColor: backgroundColor ?? Colors.secondary }]}>
        {source.map((item, key) => (
          <View key={key} style={[Layout.fill, Layout.center, { width: '100%', height: '100%' }]}>
            <LottieView
              key={key}
              source={item}
              autoPlay
              loop={loop}
              resizeMode="cover"
              duration={SPLASH_DURATION}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    //...StyleSheet.absoluteFillObject,
    //flex: 1,
    width: mvs(250,1.2),
    height: '100%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    padding: 20
  },
});
export default OrderPanelComponents;
