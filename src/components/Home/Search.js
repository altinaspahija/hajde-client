import { TouchableOpacity, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { useTheme } from "@/hooks";
import { vs, mvs } from "react-native-size-matters";


export default ({
  title = "Kërko supermarket/ restorantin që dëshironi...",
  onPress,
}) => {
  const { Colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        zIndex: 10,
        position: "absolute",
        top: vs(155),
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        padding: 10,
        marginStart: 40,
        borderRadius: 10,
        marginTop: mvs(15, 0.9),

        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        // for Android
        elevation: 7,
      }}
    >
      <Icon
        name="search"
        color={Colors.primary}
        size={25}
        style={{ marginRight: 10 }}
      />
      <Text
        style={{
          flex: 1,
          fontSize: 10,
          fontFamily: "Montserrat-Medium",
          color: "grey",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
