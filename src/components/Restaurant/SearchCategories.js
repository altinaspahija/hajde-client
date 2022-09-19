import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { useTheme } from "@/hooks";
import { vs, mvs } from "react-native-size-matters";


export default ({
  title,
  placeholder = "Kërko ...",
  onChangeText,
  onPress
}) => {
  const { Colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        padding: 10,
        marginStart: 10,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "black",
        shadowOpacity: 0.2,
      }}
    >
      <Icon
        name="search"
        color={Colors.primary}
        size={25}
        style={{ marginRight: 10 }}
      />
      <TextInput
        onPressIn={onPress}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray30}
        onChangeText={onChangeText}
        style={{
          flex: 1,
          fontSize: 12,
          fontFamily: "Montserrat-Medium",
          color: "grey",
        }}
      >
        {title}
      </TextInput>
    </View>
  );
};
