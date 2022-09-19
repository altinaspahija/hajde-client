import React from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from "@/hooks";

export default ({ bodyTitle, bodyImage }) => {
  const { Layout, Common, Gutters } = useTheme();
  return (
    <View style={[Layout.fill70]}>
      <View style={[Layout.fill15, { padding: 40 }]}>
        <Text style={Common.noContent.bodyTitle}>{bodyTitle}</Text>
      </View>
      <View style={[Layout.fill90, Gutters.mediumBPadding]}>
        <Image
          source={bodyImage}
          style={Layout.fullSize}
          resizeMode={"contain"}
        />
      </View>
    </View>
  );
};
