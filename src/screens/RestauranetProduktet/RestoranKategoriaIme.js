//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
// Internal dependencies

import global, { buttonColor } from "../../styles/global";
import Card from "./Card";
import {
  BackButtonRestaurant,
  DecrementButton,
  QuickButton,
  ProduktetButton,
} from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks";

export default function RestauranetProduktet({ navigation, route }) {
  const restoranId = route?.params?.restoranId;
  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);
  const [menus, setMenus] = useState([]);
  const [page, setPage] = useState(1);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(true);
  let [total, setTotal] = useState({});
  const [delivery, setDelivery] = useState([]);
  const { Common, Images } = useTheme();
  const { subCategory } = Common;
  const styles = Common.restaurantProducts;
  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(
        `/product-categories/list-restaurant-subcategories/${restoranId}`,
      );
      setSubCategories(response.data);
    })();
  }, []);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }
    (async () => {
      const response = await axiosApiInstance.get(
        `/menus/list?name=&page=${page}&restaurantId=${restoranId}&categoryId=${subCategoriesId}`,
      );

      if (response.data.menus.menus.length === 0) {
        setHasMoreItems(false);
        // setMenus(response.data.menus);
      } else {
        setHasMoreItems(true);
        setMenus([...menus, ...response.data.menus.menus]);
      }
      setFetchMore(false);
      setLoading(false);
    })();
  }, [subCategoriesId, page, hasMoreItems]);

  const loadMore = () => {
    if (hasMoreItems) {
      setPage(page + 1);
    }
  };

  const _renderFooter = () => {
    if (hasMoreItems && fetchMore) {
      return <ActivityIndicator animating size="large" color={buttonColor} />;
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(`/restaurants/${restoranId}`);
      setData(response.data);
      setDelivery(response.data.restaurant);
      setAddress(response.data.restaurant.address);
    })();
  }, []);
  const getTotal = async () => {
    const response = await axiosApiInstance.get(`/basket/get-basket-total`);
    setTotal(response?.data);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTotal();
    });
    return unsubscribe;
  }, [navigation]);
  const Menu = ({ item, index }) => {
    return (
      <View style={styles.containerCard}>
        <Card
          title={item.name}
          price={item.price}
          currency={data?.currency}
          item={item}
          quantity={item.quantity}
          img={{ uri: item.coverURL ?? item.imageURL }}
          incNum={incNum}
          decNum={decNum}
          onPress={() => navigation.navigate("RestoranInfo", { item })}
          index={index}
        />
        <View style={styles.quantityContainer}>
          <QuickButton title="Add" onPress={() => incNum(item._id, index)} />
          <Text style={styles.number}>{item.quantity ? item.quantity : 0}</Text>
          <DecrementButton onPress={() => decNum(item._id, index)} />
        </View>
      </View>
    );
  };
  const onSubmit = async (id, quantity, clearBasket = false) => {
    try {
      const response = await axiosApiInstance.post(`/basket/add-to-basket`, {
        productId: id,
        quantity: quantity,
        orderType: "restaurant",
        clearBasket
      });
      getTotal();
    } catch (err) {
      errorResponse(err, id, quantity)
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

  const incNum = (id, index) => {
    const newdata = [...menus];
    if (newdata[index].quantity) {
      newdata[index].quantity++;
    } else {
      newdata[index].quantity = 1;
    }
    setMenus(newdata);
    onSubmit(id, newdata[index].quantity);
  };

  const decNum = (id, index) => {
    const newdata = [...menus];
    if (newdata[index].quantity < 1) {
      return;
    }

    newdata[index].quantity--;
    setMenus(newdata);
    onSubmit(id, newdata[index].quantity);
  };
  const menu = menus.map((item, index) => (
    <View style={styles.containerCard}>
      <Card
        title={item.name}
        price={item.price}
        currency={data?.currency}
        img={{ uri: item.coverURL ?? item.imageURL }}
        incNum={incNum}
        decNum={decNum}
        //onPress={() => navigation.pop({ item })}

        onPress={() => navigation.navigate("RestoranInfo", { item })}
        index={index}
      />
      <View style={styles.quantityContainer}>
        <QuickButton title="Add" onPress={() => incNum(item._id, index)} />
        <Text style={styles.number}>{item.quantity ? item.quantity : 0}</Text>
        <DecrementButton onPress={() => decNum(item._id, index)} />
      </View>
    </View>
  ));
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <ImageBackground
        style={styles.img}
        source={{
          uri: data?.restaurant?.coverURL ?? data?.restaurant?.imageURL,
        }}
      >
        <View style={styles.backButton}>
          <BackButtonRestaurant onPress={() => navigation.goBack()} />
        </View>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <View style={styles.restoranTitleContainer}>
          <View style={{ width: "85%", alignSelf: "center", paddingLeft: 5 }}>
            <Text style={styles.restoranTitle}>{delivery?.name}</Text>
          </View>
        </View>
        <View style={styles.infoInnerContainer}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View>
              {address?.map((item) => (
                <View style={styles.informations}>
                  <Image
                    source={require("../../assets/images/lokacioni.png")}
                  />
                  <Text style={styles.subTitle}>{item.street},</Text>
                  <Text style={styles.subTitle}>{item.city},</Text>
                  <Text style={styles.subTitle}>{item.country}</Text>
                </View>
              ))}
              <View style={styles.timeContainer}>
                <Image source={require("../../assets/images/ora.png")} />
                <Text style={styles.time}>Porosit p??r n?? or??n</Text>
                <Text style={styles.date}>
                  {delivery?.availability?.hour}:
                  {delivery?.availability?.minutes}
                </Text>
              </View>
              <View style={styles.currency}>
                <Image source={require("../../assets/images/motorri.png")} />
                <Text style={styles.currency}>
                  {data?.transportPrice} {data?.currency}
                </Text>
              </View>
            </View>
            {/* <View style={styles.bannerContainer}>
              <ImageBackground
                source={require("../../assets/images/oferta.png")}
                style={styles.ofertaImage}
                resizeMode="stretch"
              >
                <View>
                  <Text style={styles.bannerTitleBottomTitle}>Ofert??</Text>
                  <Text style={styles.ofertPrice}>500</Text>
                  <Text style={styles.bannerTitleBottomTitle}>Lek??</Text>
                </View>
              </ImageBackground>
            </View> */}
          </View>
          <View style={styles.categoriesContainer}>
            <FlatList
              data={subCategories}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1, marginTop: 5 }}
              // contentContainerStyle={{ paddingBottom: 70, paddingTop: 0 }}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      marginRight: 0,
                    }}
                  >
                    <ProduktetButton
                      title={item.name}
                      onPress={() => {
                        setMenus([]);
                        setSubCategoriesId(item._id);
                        setPage(1);
                      }}
                      isSelected={subCategoriesId === item._id}
                    />
                  </View>
                );
              }}
            />
          </View>
          {loading ? (
            <View style={global.activityIndicator}>
              <ActivityIndicator size="large" color={buttonColor} />
            </View>
          ) : menus?.length === 0 ? (
            <View style={global.activityIndicator}>
              <Text style={global.emptyText}>P??r momentin nuk ka menu</Text>
            </View>
          ) : (
            <FlatList
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              style={{ height: 150 }}
              contentContainerStyle={{ paddingBottom: 70, paddingTop: 0 }}
              data={menus}
              keyExtractor={(item, i) => i.toString()}
              renderItem={Menu}
              onEndReached={loadMore}
              ListFooterComponent={_renderFooter}
              onEndReachedThreshold={1}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Shporta")}
          style={subCategory.bottomContainer}
        >
          <Image source={Images.cartIcon} style={subCategory.shportaImg} />
          <Text style={{ color: "#00cbbb", fontSize: 20, fontWeight: "bold" }}>
            Shko tek Shporta
          </Text>
          <Text style={{ color: "#00cbbb", fontSize: 18 }}>
            {total?.total} {total?.currency}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
