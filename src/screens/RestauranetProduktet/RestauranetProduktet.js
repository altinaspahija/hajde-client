//External dependencies
import React, { useState, useEffect, useFocus } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
  ScrollView,
  LayoutAnimation,
  UIManager,
} from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
// Internal dependencies
import global, {
  buttonColor,
  primary,
  header,
  aquaPrimary,
} from "../../styles/global";
import Card from "./Card";
import {
  BackButtonRestaurant,
  DecrementButton,
  QuickButton,
  ProduktetButton,
  BackButton,
} from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/hooks";
import { IconButton } from "@/components";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function RestauranetProduktet({ navigation, route }) {
  const restoranId = route?.params?.restoranId;
  const [data, setData] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [address, setAddress] = useState([]);
  const [menus, setMenus] = useState([]);
  const [page, setPage] = useState(1);

  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(true);
  const [offer, setOffers] = useState();
  const [search, setSearch] = useState();
  let [total, setTotal] = useState({});
  const [headerVisible, setHeaderVisible] = useState(true);

  const { Common, Colors, Layout, Images, Gutters } = useTheme();
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

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
    // if (page === 1) {
    setLoading(true);
    // }
    (async () => {
      const response = await axiosApiInstance.get(
        `/menus/list?name=${
          search ? search : ""
        }&page=1&restaurantId=${restoranId}&categoryId=${
          subCategoriesId === null ? "" : subCategoriesId
        }`,
      );
      if (response?.data?.menus?.menus.length === 0) {
        setHasMoreItems(false);
        setMenus(response.data.menus.menus || []);
      } else {
        setHasMoreItems(true);
        setMenus(response?.data?.menus?.menus);
      }
      setFetchMore(false);
      setLoading(false);
    })();
  }, [subCategoriesId, search]);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }
    (async () => {
      const response = await axiosApiInstance.get(
        `/menus/list?name=${
          search ? search : ""
        }&page=${page}&restaurantId=${restoranId}&categoryId=${
          subCategoriesId === null ? "" : subCategoriesId
        }`,
      );

      if (response?.data?.menus?.menus.length === 0 && page == 1) {
        setHasMoreItems(false);
      } else {
        setHasMoreItems(true);
        setMenus([...menus, ...response.data.menus.menus]);
      }
      setFetchMore(false);
      setLoading(false);
    })();
  }, [page]);

  const loadMore = () => {
    if (hasMoreItems) {
      setPage(page + 1);
    }
  };

  const onChangeSearch = async (value) => {
    setSearch(value);
  };

  const _renderFooter = () => {
    if (hasMoreItems && fetchMore) {
      return <ActivityIndicator animating size="large" color={buttonColor} />;
    }
    return null;
  };
  const getTotal = async () => {
    const response = await axiosApiInstance.get(
      `/basket/get-basket-total-shopping`,
    );
    setTotal(response?.data);
  };
  useEffect(() => {
    (async () => {
      //TO DO: remove v2 because it will be moved to environment
      const response = await axiosApiInstance.get(`/v2/restaurants/${restoranId}`);
      setData(response.data);
      setDelivery(response.data.restaurant);
      setAddress(response.data.restaurant.address);
      setOffers(response.data.offers);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTotal();
    });
    return unsubscribe;
  }, [navigation]);

  const Menu = ({ item, index }) => {
    return (
      <Card
        title={item.name}
        description={item.description}
        price={item.price}
        quantity={item.quantity}
        currency={data?.currency}
        img={{ uri: item.coverURL ?? item.imageURL }}
        onPress={() => navigation.navigate("RestoranInfo", { item })}
        index={index}
        item={item}
        incNum={() => incNum(item._id, index)}
        decNum={() => decNum(item._id, index)}
      />
    );
  };
  const HeadMenu = () => (
    <ImageBackground
      style={Layout.fullWidth}
      source={{ uri: delivery?.coverURL ?? delivery?.imageURL }}
    >
      <View style={styles.headerInfoContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[Layout.fill10, styles.headerInfoBackButton]}
        >
          <BackButton onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <View style={[Layout.fill90]}>
          <View style={[Layout.fill20]}></View>
          <View style={[Layout.fill80]}>
            <View style={[Layout.fill, styles.headerInfo]}>
              <View style={[Layout.fill60, Layout.center]}>
                <Image
                  style={styles.headerInfoImage}
                  source={{
                    uri:
                      delivery?.imageURL ??
                      "https://via.placeholder.com/200/333",
                  }}
                />
              </View>
              <View style={[Layout.fill40, Layout.justifyContentCenter]}>
                {address?.map((item) => (
                  <View
                    style={[
                      Layout.justifyContentCenter,
                      { ...styles.informations },
                    ]}
                  >
                    <Image source={Images.imgLocation} />
                    <Text numberOfLines={1} style={styles.subTitle}>
                      {item.street}, {item.city}, {item.country}
                    </Text>
                  </View>
                ))}
                <View style={styles.timeContainer}>
                  <Image source={Images.imgDate} />
                  <Text style={styles.date}>
                    30'-60' ~ {delivery?.availability?.hour}:
                    {delivery?.availability?.minutes}
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Image source={Images.imgMotor} />
                  <Text style={styles.currency}>
                    {data?.transportPrice} {data?.currency}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[Layout.fill20, { paddingTop: 10, paddingBottom: 10 }]}>
            <View style={styles.searchContainer}>
              <AntDesign name="search1" size={20} color={aquaPrimary} />
              <View style={Layout.width85percent}>
                <TextInput
                  placeholder="Kërkoni produktin"
                  label="city name"
                  value={search}
                  onChangeText={(x) => onChangeSearch(x)}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={Layout.fill10}></View>
      </View>
      <View style={styles.deliveryNameContainer}>
        <Text style={styles.deliveryName}>{delivery?.name}</Text>
      </View>
    </ImageBackground>
  );
  const onSubmit = async (id, quantity, clearBasket = false) => {
    try {
      const response = await axiosApiInstance.post(`/basket/add-to-basket`, {
        productId: id,
        quantity: quantity,
        orderType: "restaurant",
        clearBasket
      });
      getTotal();
      return response;
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
    onSubmit(id, newdata[index].quantity + 1).then((resp) => {
      if (resp) {
        if (newdata[index].quantity) {
          newdata[index].quantity++;
        } else {
          newdata[index].quantity = 1;
        }
        setMenus(newdata);
      }
    });
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

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        onChangeHeaderVisibility={(visibility) => {
          setHeaderVisible(visibility);
        }}
        parallaxHeaderHeight={314}
        renderForeground={() => (
          <>
            <StatusBar
              backgroundColor="transparent"
              translucent={true}
              barStyle="dark-content"
            />
            {HeadMenu()}
          </>
        )}
      >
        {/* <ImageBackground style={styles.img} source={{ uri: data.imageURL }}>
        <View style={styles.backButton}>
          <BackButtonRestaurant onPress={() => navigation.goBack()} />
        </View>
      </ImageBackground> */}
        <View style={Layout.fill}>
          {/* <View style={styles.restoranTitleContainer}>
          <View style={{ width: "85%", alignSelf: "center", paddingLeft: 5 }}><Text style={styles.restoranTitle}>{delivery?.name}</Text></View>
        </View> */}
          <View
            style={{
              ...styles.infoInnerContainer,
              width: "100%",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              {offer === null || offer == undefined ? null : (
                <View style={[styles.bannerContainer, Layout.row, Layout.fill70]}>
                  <ImageBackground
                    source={require("../../assets/images/oferta.png")}
                    style={styles.ofertaImage}
                    resizeMode="stretch"
                  >
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={styles.bannerTitleBottomTitle}>Ofertë</Text>
                      <Text style={styles.ofertPrice}>{offer?.offerPrice} {"5 - 10 €"}</Text>
                      <Text style={styles.bannerTitleBottomTitle}>
                        {offer?.currency}
                      </Text>
                    </View>
                  </ImageBackground>
                  <Text numberOfLines={2} style={[Gutters.smallLPadding]}>Porosisni me 50% zbritje te Kok a'Pule nga Hajde App!</Text>
                </View>
              )}
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#e4e4e4",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                {offer === null || offer == undefined ? null : (
                  <View style={styles.bannerContainer}>
                    <ImageBackground
                      source={require("../../assets/images/oferta.png")}
                      style={styles.ofertaImage}
                      resizeMode="stretch"
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.bannerTitleBottomTitle}>
                          Ofertë
                        </Text>
                        <Text style={styles.ofertPrice}>
                          {offer?.offerPrice}
                        </Text>
                        <Text style={styles.bannerTitleBottomTitle}>
                          {offer?.currency}
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                )}
              </View>

              <View
                style={{
                  ...styles.categoriesContainer,
                  overflow: "hidden",
                  paddingBottom: 10,
                }}
              >
                <FlatList
                  data={subCategories}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ flex: 1, marginTop: 5 }}
                  keyExtractor={(item, i) => i.toString()}
                  renderItem={({ item }) => {
                    return !item?.imageURL ? (
                      <View
                        style={{
                          marginRight: 0,
                        }}
                      >
                        <ProduktetButton
                          title={item.name}
                          onPress={() => {
                            // setMenus([]);
                            setSubCategoriesId(item._id);
                            setPage(1);
                          }}
                          isSelected={subCategoriesId === item._id}
                        />
                      </View>
                    ) : (
                      <View>
                        <IconButton
                          title={item?.name}
                          img={{ uri: item?.imageURL }}
                          onPress={() => {
                            setSubCategoriesId(item._id);
                            setPage(1);
                          }}
                          isSelected={subCategoriesId === item?._id}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </View>
            {loading ? (
              <View style={global.activityIndicator}>
                <ActivityIndicator size="large" color={buttonColor} />
              </View>
            ) : menus?.length === 0 ? (
              <View style={global.activityIndicator}>
                <Text style={global.emptyText}>Për momentin nuk ka menu</Text>
              </View>
            ) : (
              <ScrollView horizontal scrollEnabled={false}>
                <FlatList
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  style={{
                    height: headerVisible
                      ? screenHeight - 230 - 314
                      : screenHeight - 230,
                    paddingHorizontal: 20,
                    width: "100%",
                  }}
                  data={menus}
                  keyExtractor={(item, i) => i.toString()}
                  renderItem={Menu}
                  onEndReached={loadMore}
                  ListFooterComponent={_renderFooter}
                  onEndReachedThreshold={1}
                />
              </ScrollView>
            )}
          </View>
        </View>
      </ParallaxScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Shporta")}
        style={[
          subCategory.bottomContainer,
          !headerVisible ? subCategory.bottomContainerSmall : null,
        ]}
      >
        {headerVisible && (
          <Image source={Images.cartIcon} style={subCategory.shportaImg} />
        )}
        {headerVisible && (
          <Text style={{ color: "#00cbbb", fontSize: 20, fontWeight: "bold" }}>
            Shko tek Shporta
          </Text>
        )}
        <Text style={{ color: "#00cbbb", fontSize: 18 }}>
          {total?.total} {total?.currency}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
