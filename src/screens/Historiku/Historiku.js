//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axiosApiInstance from "../../authentification/request/request";
import RNPickerSelect from "react-native-picker-select";
import { LinkButton } from "../../components/Button/Button";
// Internal dependencies
import styles from "./styles";
import global, { primary, header, buttonColor } from "../../styles/global";
import Card from "./Card";
import { ModalComponent } from "@/components";
import { useTheme } from "@/hooks";

const items = [
  { label: "Në pritje", value: "PENDING" },
  { label: "Në progres", value: "IN_PROGRESS" },
  { label: "E kompletuar", value: "COMPLETED" },
  { label: "Problem", value: "ISSUE" },
  { label: "Anuluar", value: "CANCELLED" },
];
const pickerStyle = {
  inputIOS: {
    width: "100%",
    color: primary,
    backgroundColor: buttonColor,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    paddingVertical: 10,
  },
  inputAndroid: {
    width: "100%",
    color: primary,
    backgroundColor: buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    fontSize: 16,
    paddingVertical: 10,
  },
};
const Historiku = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("PENDING");
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [carryPrice, setCarryPrice] = useState(100);
  const { Colors } = useTheme();

  const OrdersWithAxios = async () => {
    const response = await axiosApiInstance.get(
      `client/orders/get-orders/${page}/${filter}`
    );
    if (page === 1) {
      setData([...response.data]);
    } else {
      setData([...data, ...response.data]);
    }
    setHasMoreItems(response.data.length !== 0);
    setFetchMore(false);
    setPage(page + 1);
    setLoading(false);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setFilter("PENDING");
      callApi();
      setData([]);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation, data]);

  useEffect(() => {
    callApi();
  }, [fetchMore, filter]);

  const loadMore = () => {
    if (hasMoreItems) {
      setFetchMore(true);
    }
  };

  const _renderFooter = () => {
    if (hasMoreItems && fetchMore) {
      // return <ActivityIndicator animating size="large" color={buttonColor} />;
    }
    return null;
  };

  const mapper = (single) => {
    let d = single.orderDate.split("-");
    let p = Number(single.total);
    return { year: d[0], month: d[1], price: p };
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

  const totalPrice = () => {
    const sumPrices = data.map(mapper).reduce(reducer, []);
    return sumPrices.map((item) => (
      <>
        <View style={[styles1.modalView, { backgroundColor: Colors.secondary}]}>
         
          <View style={{ flex: 1 }}>
            <Text style={[styles1.showText, { color: "green", fontSize: 22 }]}>
              Shuma totale:{"\n"}
              {item.price?.toFixed(2)}
              {"\n"}
              <Text style={styles1.showText}>
                Shuma e mbetur ({carryPrice}): {"\n"}
                {(carryPrice - item.price)?.toFixed(2)}
                {"\n"}
              </Text>
            </Text>
            <Text style={styles1.showText}>Per muajin: {item.month}</Text>
            <Text style={styles1.showText}>Viti: {item.year}</Text>
          </View>
        </View>
      </>
    ));
  };

  return (
    <View style={global.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        centerComponent={{
          text: "Historiku",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
        rightComponent={() => (
          <TouchableHighlight
            style={{ width: 70, height: 25 }}
            onLongPress={() => setModalVisible(true)}
          >
            <Text></Text>
          </TouchableHighlight>
        )}
      />
      <View style={styles.picker}>
        <RNPickerSelect
          fixAndroidTouchableBug={true}
          items={items}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => {
            setPage(1);
            setData([]);
            setFetchMore(true);
            setHasMoreItems(true);
            setFilter(value);
          }}
          placeholder={{}}
          value={filter}
          style={pickerStyle}
          Icon={() => {
            return (
              <View
                style={{
                  ...Platform.select({
                    ios: {
                      paddingRight: 15,
                      paddingTop: 10,
                    },
                    android: {
                      paddingRight: 15,
                      paddingTop: 10,
                    },
                  }),
                }}
              >
                <Ionicons name="ios-arrow-down" size={20} color={primary} />
              </View>
            );
          }}
          activeItemTextStyle={{ fontSize: 10, fontWeight: "bold" }}
        />
      </View>
      {loading ? (
        <View style={global.activityIndicator}>
          <ActivityIndicator size="large" color={buttonColor} />
        </View>
      ) : data?.length === 0 ? (
        <View style={global.activityIndicator}>
          <Text style={global.emptyText}>Për momentin nuk ka porosi</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          data={data}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerCard}>
                <Card
                  img={require("../../assets/images/Shopping_List_Homepage.png")}
                  day={item.orderNumber}
                  date={item.orderDate}
                  total={item.total}
                  currency={item.currency}
                  onPress={() =>
                    navigation.navigate("ShoppingDetails", {
                      item,
                    })
                  }
                />
                {filter === "COMPLETED" ? (
                  <View style={styles.buttonContainer}>
                    <LinkButton
                      title="Hajde prapë"
                      onPress={() =>
                        navigation.navigate("PorosiaDuplicate", { item })
                      }
                    />
                  </View>
                ) : null}
              </View>
            );
          }}
          onEndReached={loadMore}
          ListFooterComponent={_renderFooter}
          onEndReachedThreshold={1}
        />
      )}
      <ModalComponent
        visible={modalVisible}
        dismiss={() => setModalVisible(false)}
      >
      <ScrollView>
      <View style={{ flex: 0.2, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
              style={[styles1.buttonStyle, {backgroundColor: Colors.primary}]}
              onPress={() => setCarryPrice(200)}
            >
              <Text>200</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles1.buttonStyle, {backgroundColor: Colors.primary}]}
              onPress={() => setCarryPrice(100)}
            >
              <Text>100</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles1.buttonStyle, {backgroundColor: Colors.primary}]}
               onPress={() => setCarryPrice(50)}
            >
              <Text>50</Text>
            </TouchableOpacity>
          </View>
        {totalPrice()}
        </ScrollView>
      </ModalComponent>
    </View>
  );
};

export default Historiku;

const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ececec",
  },
  modalView: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  showText: {
    color: "#333",
    fontSize: 18,
    textAlign: "center",
  },
  buttonStyle: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 40,
    height: 30,
    marginRight: 10,
  },
});
