import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";

export default ({ onPress, notifications }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ position: "absolute", right: 40, top: 60 }}
  >
    {!notifications?.count === 0 && (
      <View style={{ position: "absolute", zIndex: 2, bottom: 25, left: 20 }}>
        <Badge status="error" value={notifications?.count} />
      </View>
    )}
    <MaterialIcons name="notifications" size={30} color="white" />
  </TouchableOpacity>
);
