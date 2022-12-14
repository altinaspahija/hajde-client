//External dependencies
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import Searchbar from "../../components/Searchbar/Searchbar";
import { Header } from "react-native-elements";
// Internal dependencies
import styles from "./styles";
import global, { buttonColor } from "../../styles/global";
import Card from "./Card";
import { BackButton, QuickButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import { primary, header } from "../../styles/global";

export default function ShtoProdukt({ navigation, route }) {
  const marketId = route?.params?.marketId;
 
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(1);

  useEffect(() => {
    (async () => {
      if (!fetchMore || searchText) return null;
      const response = await axiosApiInstance.get(
        `/products/list?name=&page=${page}&companyId=${marketId}`
      );
      // setData(response.data.products);
      setData([...data, ...response.data.products]);
      setHasMoreItems(response.data.products.length !== 0);
      setFetchMore(false);
      setPage(page + 1);
      setLoading(false);
    })();
  }, [page, fetchMore]);

  const loadMore = () => {
    if (hasMoreItems && !searchText) {
      setFetchMore(true);
    }
  };

  const _renderFooter = () => {
    if (searchText) return null;
    if (hasMoreItems && fetchMore) {
      return <ActivityIndicator animating size="large" color={buttonColor} />;
    }
    return null;
  };
  const onSubmitSearched = async (text) => {
    setSearchText(text);
    if (text) {
      const response = await axiosApiInstance.get(
        `/products/list?name=${text}&companyId=${marketId}`
      );
      setData([...response.data.products]);
      setFetchMore(true);
    } else {
      setData([]);
      setPage(1);
      setFetchMore(true);
    }
  };
  const onSubmit = async (id, clearBasket = false) => {
    try {
      const response = await axiosApiInstance.post(`/basket/add-to-basket`, {
        productId: id,
        quantity: num,
        clearBasket
      });
      Alert.alert("Mesazhi", response?.data?.message, [
        {
          text: "N?? rregull",
        },
      ]);
    } catch (err) {
      errorResponse(err, id, num)
    }
  };

  const errorResponse = (err, id, quantity) =>{
    Alert.alert(
      "Info",
      err?.message,
      [
        {
          text: "Po",
          onPress: async () => {
            await onSubmit(id, quantity, true).then(() => data.find(item => item._id === id).quantity = 1);
          }
        },
        {
          text: "Jo",
          onPress: () => null,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        centerComponent={{
          text: "Shto produkt",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <View style={{ width: "100%" }}>
        <Searchbar
          containerStyle={styles.searchBarcontainer}
          inputContainerStyle={styles.input}
          onSubmitEditing={(text) => {
            onSubmitSearched(text);
          }}
        />
      </View>
      {loading ? (
        <View style={global.activityIndicator}>
          <ActivityIndicator size="large" color={buttonColor} />
        </View>
      ) : data.length === 0 ? (
        <View style={global.activityIndicator}>
          <Text style={global.emptyText}>P??r momentin nuk ka produkte</Text>
        </View>
      ) : (
        <FlatList
          style={{ width: "100%" }}
          data={data}
          keyExtractor={(item, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerCard}>
                <Card
                  title={item.name}
                  price={item.price}
                  img={{ uri: item.imageURL }}
                  onPress={() =>
                    navigation.navigate("ProduktiShporta", { item })
                  }
                />
                <QuickButton title="Add" onPress={() => onSubmit(item._id)} />
              </View>
            );
          }}
          onEndReached={loadMore}
          ListFooterComponent={_renderFooter}
          onEndReachedThreshold={1}
        />
      )}
    </View>
  );
}
