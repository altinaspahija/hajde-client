import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/hooks";
import { BackButton } from "@/components";

export default ({ navigation, title, titleDescription }) => {
  const { Layout, Colors, Common, Gutters } = useTheme();
  return (
    <View
      style={[
        Layout.fill15,
        Layout.center,
        Gutters.largeTPadding,
        { backgroundColor: Colors.primary },
      ]}
    >
      <View style={[Layout.fill, Layout.rowCenter]}>
        <TouchableOpacity onPress={() => navigation.pop()}  style={[Layout.fill15, Layout.rowCenter]}>
          <BackButton onPress={() => navigation.pop()} />
        </TouchableOpacity>
        <View style={[Layout.fill85]} />
      </View>
      <Text style={Common.noContent.title}>{title}</Text>
      <Text style={Common.noContent.description}>{titleDescription}</Text>
    </View>
  );
};
