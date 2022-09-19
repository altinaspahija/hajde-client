import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/hooks";
import OrderItem from "./OrderItem";
import Space from "../Space/Space";

export default function CurrentOrders({ data }) {
  const { Layout, Common, Gutters } = useTheme();
  const { orders: styles } = Common;
  return (
    <View style={Gutters.smallHPadding}>
      <Text style={styles.title}>Aktuale</Text>
      {data.length !== 0 ? (
        <>
          <Space value={20} />
          {data.map((item, index) => (
            <OrderItem data={item} key={index} />
          ))}
        </>
      ) : (
        <Space value={120} style={Layout.center}>
          <Text style={Common.textPrimary}>Nuk ka porosi aktuale</Text>
        </Space>
      )}
    </View>
  );
}
