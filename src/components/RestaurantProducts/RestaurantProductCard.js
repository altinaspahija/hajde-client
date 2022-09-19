import { DecrementButton, QuickButton } from "@/components";
import { useTheme } from "@/hooks";
import CoreImage from "@/utils/CoreImage";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
export default function RestaurantProductCard({
  onPress,
  title,
  description,
  img,
  price,
  quantity,
  currency,
  item,
  index,
  incNum,
  decNum,
}) {
  const { Common, Layout, Gutters, Colors } = useTheme();
  const styles = Common.restaurantProducts;
  return (
    <TouchableOpacity
      key={item?._id}
      onPress={onPress}
      style={styles.containerCard}
    >
      <View style={styles.containerInfo}>
        <View style={[Layout.center, Gutters.smallTPadding]}>
          <CoreImage
            source={img}
            resizeMode={"contain"}
            style={styles.coreImage}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {title}
          </Text>

          <Text numberOfLines={2} style={styles.description}>
            {description ? description : title}
          </Text>
          <View style={[Layout.row, Layout.justifyContentEnd]}>
            <Text style={styles.price}>
              {price} {currency}
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <DecrementButton
              iconColor={Colors.white}
              style={styles.button}
              onPress={() => decNum(item._id, index)}
            />
            <Text style={styles.number}>{quantity ? quantity : 0}</Text>
            <QuickButton
              title="Add"
              onPress={() => incNum(item._id, index)}
              style={styles.button}
              iconColor={Colors.white}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
