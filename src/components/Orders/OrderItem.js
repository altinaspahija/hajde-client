import { DecrementButton, QuickButton } from "@/components";
import { useTheme } from "@/hooks";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import OrderStatus from "./OrderStatus";
import StatusOrder from "./StatusOrder";

export default function OrderItem({ onPress = () => null, data }) {
  const { Layout, Common, Gutters } = useTheme();
  const navigation = useNavigation();
  const { orders: styles } = Common;
  const {
    _id,
    total,
    title,
    description,
    companyName,
    coverURL,
    imageURL,
    currency,
    price,
    productsCount,
    orderNumber,
    orderDate,
    status,
  } = data;
  let color = "#1492E640";
  switch (status) {
    case "PENDING":
      color = "#1492E640";
      break;

    case "IN_PROGRESS":
      color = "#00CCBB40";
      break;
    case "ISSUE":
      color = "#FF700340";
      break;

    case "CANCELLED":
      color = "#FF030340";
      break;

    case "COMPLETED":
      color = "#059F0040";
      break;

    default:
      color = "#1492E640";
      break;
  }
  return (
    <TouchableOpacity
      key={_id}
      onPress={() => navigation.navigate("OrderDetailsContainer", { id: _id, status })}
      //onPress={onPress}
      style={Gutters.regularBMargin}
    >
      <StatusOrder status={status} />
      <View style={Common.orderItem.container}>
        <View style={Layout.fill60}>
          <View
            style={[
              Common.orderItem.tint,
              {
                backgroundColor: color,
              },
            ]}
          />
          <ImageBackground
            style={[Common.orderItem.imageBackground, Layout.fill]}
            containerStyle
            source={{ uri: coverURL }}
            resizeMode="cover"
          >
            <Text style={Common.orderItem.imageText}>
              {companyName || "Emri i kompanis"}
            </Text>
          </ImageBackground>
        </View>

        <View style={[Common.orderItem.details, Layout.fill50]}>
          <View>
            <Text style={Common.orderItem.quantity}>#{orderNumber}</Text>
            <Text numberOfLines={1} style={Common.orderItem.date}>
              {orderDate.slice(0, 10).split("-").reverse().join("-")}
            </Text>
          </View>
          <Text style={Common.orderItem.price}>
            {total} {currency}
          </Text>
          <View style={Common.orderItem.button}>
            <Text style={Common.orderItem.buttonText}>
              {status === "PENDING" || status === "IN_PROGRESS"
                ? "KU JE?"
                : "SHIKO"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
