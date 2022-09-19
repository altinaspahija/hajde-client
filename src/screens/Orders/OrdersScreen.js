import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Header,
  CurrentOrders,
  GonnaOrders,
  ModalComponent,
  ScreenContainer,
} from "@/components";
import { useTheme } from "@/hooks";

export default function OrdersScreen({ data }) {
  const { Layout, Common, Colors } = useTheme();
  const { buttonStyle, modalView, showText, container } = Common.orders;
  const [modalVisible, setModalVisible] = useState(false);
  const [carryPrice, setCarryPrice] = useState(100);

  const [page, setPage] = useState(2);
  const [orderData, setOrderData] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const OrdersWithAxios = async () => {
    setIsFetching(true);
    const response = await axiosApiInstance.get(
      `/client/orders/get-orders/all?page=${page}`
    );

    setOrderData([...orderData, ...response.data.gonnaOrders]);
    setHasMoreItems(response.data.gonnaOrders.length !== 0);
    setPage(page + 1);
    setIsFetching(false);
    return response;
  };
  const callApi = () => {
    OrdersWithAxios()
      .then((res) => {
        console.log("orderWithAxios: ", res.data.gonnaOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reducer = (group, current) => {
    let i = group.findIndex(
      (single) => single.year == current.year && single.month == current.month
    );
    if (i == -1) {
      return [...group, current];
    }

    group[i].price += current.price;
    return group;
  };

  const mapper = (single) => {
    let d = single.orderDate.split("-");
    let p = Number(single.total);
    return { year: d[0], month: d[1], price: p };
  };

  useFocusEffect(
    React.useCallback(() => {
      setOrderData(data.gonnaOrders);
      setPage(2);
    }, [])
  );

  const totalPrice = () => {
    const sumPrices = data.gonnaOrders.map(mapper).reduce(reducer, []);
    return sumPrices.map((item, i) => (
      <View style={[modalView, { backgroundColor: Colors.secondary }]} key={i}>
        <View style={{ flex: 1 }}>
          <Text style={[showText, { color: "green", fontSize: 22 }]}>
            Shuma totale:{"\n"}
            {item.price?.toFixed(2)}
            {"\n"}
            <Text style={showText}>
              Shuma e mbetur ({carryPrice}): {"\n"}
              {(carryPrice - item.price)?.toFixed(2)}
              {"\n"}
            </Text>
          </Text>
          <Text style={showText}>Per muajin: {item.month}</Text>
          <Text style={showText}>Viti: {item.year}</Text>
        </View>
      </View>
    ));
  };

  return (
    <ScreenContainer
      title="POROSITË"
      backButton={false}
      rightComponent={
        <TouchableHighlight
          style={[Layout.width70, Layout.height30]}
          onLongPress={() => setModalVisible(true)}
        >
          <Text></Text>
        </TouchableHighlight>
      }
    >
      <View style={container}>
        <CurrentOrders data={data?.currentOrders} />
        <GonnaOrders data={data?.gonnaOrders} />
      </View>

      <ModalComponent
        visible={modalVisible}
        dismiss={() => setModalVisible(false)}
      >
        <ScrollView>
          <View style={[Layout.fill20, Layout.row, Layout.center]}>
            <TouchableOpacity
              style={[buttonStyle, { backgroundColor: Colors.primary }]}
              onPress={() => setCarryPrice(200)}
            >
              <Text>200</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttonStyle, { backgroundColor: Colors.primary }]}
              onPress={() => setCarryPrice(100)}
            >
              <Text>100</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttonStyle, { backgroundColor: Colors.primary }]}
              onPress={() => setCarryPrice(50)}
            >
              <Text>50</Text>
            </TouchableOpacity>
          </View>
          {totalPrice()}
        </ScrollView>
      </ModalComponent>
    </ScreenContainer>
  );
}
