import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { OrdersScreen } from "@/screens";
import { useLazyFetchOrdersQuery } from "@/services/modules/orders";
import { useTheme } from "@/hooks";
import { useFocusEffect } from "@react-navigation/native";

export default function OrdersContainer() {
  const [fetchOrders, { data, isSuccess, isError }] = useLazyFetchOrdersQuery();
  const { Layout } = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      const getData = () => {
        fetchOrders();
      };

      getData();
    }, []),
  );

  return !data ? (
    <View style={Layout.colCenter}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <OrdersScreen data={data} />
  );
}
