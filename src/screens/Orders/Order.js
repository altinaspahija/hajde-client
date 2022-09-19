import { View } from "react-native";
import React from "react";
import { OrderPanelComponents } from "@/components";
import { useTheme } from "@/hooks";

const Order = () => {
  const { Images, Layout } = useTheme();
  return (
    <View style={Layout.fill}>
      <OrderPanelComponents
        source={[Images.amHiWink, Images.amGroceriesiFood]}
      />
    </View>
  );
};

export default Order;
