import { useTheme } from "@/hooks";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { s, vs, ms, mvs } from "react-native-size-matters";

export default (props) => {
  const { Layout, Gutters, Common } = useTheme();
  return (
    <TouchableOpacity
      key={props.id}
      onPress={props.onPress}
      style={[Layout.fill, Layout.center, Gutters.smallLMargin]}
    >
      <View style={[Layout.fill, Layout.center, Gutters.smallBMargin, Gutters.smallTMargin]}>
        <Image
          source={props.img}
          style={{ width: s(80), height: s(80), resizeMode: "cover" }}
        />
        <View style={[Layout.center, Gutters.smallTMargin]}>
          <Text style={Common.textBlack}>{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
