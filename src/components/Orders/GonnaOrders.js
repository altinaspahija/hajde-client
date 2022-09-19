import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/hooks";
import OrderItem from "./OrderItem";
import Space from "../Space/Space";
import { useFocusEffect } from "@react-navigation/native";
import axiosApiInstance from "../../authentification/request/request";

export default function GonnaOrders({ data }) {
  const { Layout, Common, Gutters } = useTheme();
  const { orders: styles } = Common;

  //move logic to container and use RTK Query
  const [orderData, setOrderData] = useState([]);
  const [page, setPage] = useState(2);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const OrdersWithAxios = async () => {
    setFetchMore(false);
    const response = await axiosApiInstance.get(
      `/client/orders/get-orders/all?page=${page}`,
    );

    setOrderData([...orderData, ...response.data.gonnaOrders]);
    setHasMoreItems(response.data.gonnaOrders.length !== 0);
    setFetchMore(true);
    setPage(page + 1);
    return response;
  };

  const callApi = () => {
    if (!fetchMore) return null;
    OrdersWithAxios()
      .then((res) => {
        console.log("orderWithAxios: ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadMore = () => {
    callApi();
  };

  useFocusEffect(
    React.useCallback(() => {
      setOrderData(data);
      setPage(2);
      setFetchMore(true);
    }, []),
  );

  const _renderFooter = () => {
    if (hasMoreItems && !fetchMore) {
      return (
        <ActivityIndicator animating size="large" color={Common.buttonColor} />
      );
    }
    return null;
  };

  return (
    <View>
      <Text style={styles.title}>Të kaluara </Text>
      {data.length !== 0 ? (
        <>
          <Space value={10} />
          <SafeAreaView>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={orderData}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({ item }) => {
                return <OrderItem data={item} />;
              }}
              onEndReached={loadMore}
              ListFooterComponent={_renderFooter}
              onEndReachedThreshold={1}
              contentContainerStyle={[Gutters.smallHPadding, Gutters.extraBPadding]}
            />
          </SafeAreaView>
        </>
      ) : (
        <Space value={120} style={Layout.center}>
          <Text style={Common.textPrimary}>Nuk ka porosi te kaluara</Text>
        </Space>
      )}
    </View>
  );
}
