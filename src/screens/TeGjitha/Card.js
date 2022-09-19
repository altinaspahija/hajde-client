import { useTheme } from "@/hooks";
import React from "react";
import { Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useWindowDimensions } from "react-native";
import styles from "./styles";
export default function Card({ onPress, title, img }) {
  const { height, width } = useWindowDimensions();
  const { Common } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={img}
        resizeMode="contain"
        style={[styles.containerCard, { width: width / 2 - 20 }, Common.shadow]}
      >
        <Text
          style={[styles.categorieName, Common.textShadow]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
