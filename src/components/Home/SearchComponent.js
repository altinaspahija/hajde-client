import { Colors } from "@/theme/Variables";
import React from "react";
import { View, TextInput } from "react-native";
import { Icon } from "react-native-elements";

export default ({onPress}) => {
  return (
    <View
      style={{
        
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderRadius: 10,
          backgroundColor: "white",
          marginHorizontal: 20,
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "black",
          shadowOpacity: 0.2,
          elevation: 1,
          marginTop: Platform.OS == "android" ? 30 : null,
        }}
      >
        <Icon
          name="search"
          color={Colors.primary}
          size={25}
          style={{ marginRight: 10 }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Kërko supermarket/ restorantin që dëshironi..."
          placeholderTextColor="grey"
          style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
        />
      </View>
    </View>
  );
};
