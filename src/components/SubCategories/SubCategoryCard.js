import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks";
import { DecrementButton, QuickButton } from "../Button/Button";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default ({ onPress, title, img, price, currency, id, index, item, decNum, incNum }) => {
  const { subCategory: styles } = useTheme().Common;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: "90%", marginLeft: 10, marginTop: 25, marginBottom: 10 }}>
        <Image source={img} style={styles.cardImg} />
        <View style={styles.quantityContainer}>
          <DecrementButton
            iconColor={Colors.white}
            style={styles.button}
            onPress={() => decNum(id, index)}
          />
          <Text style={styles.number}>
            {item.quantity ? item.quantity : 0}
          </Text>
          <QuickButton
            title="Add"
            iconColor={Colors.white}
            style={styles.button}
            onPress={() => incNum(id, index)}
          />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
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
