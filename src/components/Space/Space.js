import React from "react";
import { View } from "react-native";

export default ({ children, value = 1, style }) => {
  return <View style={[{ height: value }, style]}>{children}</View>;
};
