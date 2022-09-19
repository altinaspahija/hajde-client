import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks";
export default function CardOld({ onPress, title, img, price, currency }) {
  const { Common } = useTheme();
  const styles = Common.restaurantProducts;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerInfo}>
        <View style={styles.cardOldContainer}>
          <Image
            source={img}
            style={{ height: 60, width: 60, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text numberOfLines={2} style={styles.name}>
            {title}
          </Text>
          <Text style={styles.price}>
            {price} {currency}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
