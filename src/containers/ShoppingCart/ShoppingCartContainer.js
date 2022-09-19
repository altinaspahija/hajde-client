import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import moment from "moment";

import { useLocation, useTheme } from "@/hooks";
import axiosApiInstance from "@/authentification/request/request";
import ShoppingCartScreen from "@/screens/ShoppingCart/ShoppingCartScreen";
import { useLazyFetchAddressQuery } from "@/services/modules/address";
import { useFocusEffect } from "@react-navigation/native";

const initialRegion = {
  latitude: 42.653073,
  longitude: 21.150157,
};
const ShoppingCartContainer = ({ navigation }) => {
  const { Layout } = useTheme();
  const { location, permissionResult, displayPermission } = useLocation(
    initialRegion,
    true,
    false
  );

  const [address, setAddresses] = useState({});
  const [formattedAddress, setFormattedAddress] = useState();
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [fetchAddress, { data: addressData, isSuccess }] =
    useLazyFetchAddressQuery();

  useEffect(() => getAddressFunc(), []);
  const getAddressFunc = () => {
    fetchAddress();
    if (addressData) {
      const getDefaultAddress = addressData.addresses.find(
        (x) => x.isDefault === true
      );
      if (getDefaultAddress) {
        setAddresses(getDefaultAddress);
        setStreet(getDefaultAddress.street);
      } else {
        setAddresses({});
        setStreet("");
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      const getData = () => {
        fetchAddress();
      };
      if (isSuccess) {
        if (addressData) {
          const getDefaultAddress = addressData.addresses.find(
            (x) => x.isDefault === true
          );
          if (getDefaultAddress) {
            setAddresses(getDefaultAddress);
            setStreet(getDefaultAddress.street);
            setCountry(getDefaultAddress.country);
          } else {
            setAddresses({});
            setStreet("");
          }
          console.log({ addressData });
        }
      }
      return () => getData();
    }, [navigation, addressData, isSuccess])
  );

  const [comment, setComment] = useState("");
  const [basket, setBasket] = useState();
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [market, setMarket] = useState([]);
  const [marketName, setMarketName] = useState([]);
  const [marketID, setMarketId] = useState();
  const [restaurant, setRestaurant] = useState([]);
  const [restaurantName, setRestaurantName] = useState([]);
  const [restaurantId, setRestaurantId] = useState();
  const [loading, setLoading] = useState(true);
  const [manualData, setManualData] = useState([]);
  const [restoran, setRestoran] = useState([]);
  const [restoranId, setRestoranId] = useState();
  const [offers, setOffers] = useState([]);
  let [total, setTotal] = useState({});

  const getProducts = async () => {
    try {
      const response = await axiosApiInstance.get(`/basket/get-basket`);
      setData(response?.data?.basket?.products);
      setManualData(response.data.basket.typedProducts);
      setBasket(response.data.basket);
      setMarket(response.data);
      setMarketName(response.data.market);
      setMarketId(response.data.marketId);
      setRestoran(response.data);
      setRestaurantName(response.data.restaurant);
      setRestoranId(response.data.restaurantId);
      setCurrency(response.data.currency);
      setDiscount(response.data.discount);
      setLoading(false);
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };

  const getOffers = async () => {
    const response = await axiosApiInstance.get(`/offers/get-offers`);
    let activeOffers = [];
    response?.data?.map((next) => {
      let endDate = moment(new Date(next?.endDate)).format("YYYY-MM-DD");
      let todayDate = moment(new Date()).format("YYYY-MM-DD");
      if (next?.hasPeriod !== false) {
        if (moment(endDate).isSameOrAfter(todayDate)) {
          let currentDate = moment(new Date());
          let tomorrowDate = moment().add(1, "days").endOf("day");
          endDate = moment(endDate).endOf("day");
          let diffCommentDate =
            endDate && moment(endDate).diff(moment(currentDate), "days");
          let time = "";
          if (diffCommentDate >= 1) {
            if (diffCommentDate >= 7) {
              time = `${(diffCommentDate / 7).toFixed()} javë`;
            } else if (diffCommentDate >= 1 && diffCommentDate < 7) {
              time = `${Math.abs(diffCommentDate.toFixed())} ditë`;
            }
          } else {
            diffCommentDate =
              endDate && moment(endDate).diff(moment(currentDate), "hours");
            if (diffCommentDate >= 1) {
              time = `${Math.abs(diffCommentDate.toFixed())} orë`;
            } else {
              diffCommentDate =
                endDate && moment(endDate).diff(moment(currentDate), "minutes");
              if (diffCommentDate >= 1) {
                time = `${Math.abs(diffCommentDate.toFixed())} minuta`;
              } else {
                diffCommentDate =
                  endDate &&
                  moment(endDate).diff(moment(currentDate), "seconds");
                time = `${Math.abs(diffCommentDate.toFixed())} sekonda`;
              }
            }
          }
          // const utc1 = Date.UTC(new Date(endDate).getFullYear(), new Date(endDate).getMonth(), new Date(endDate).getDate());
          // const utc2 = Date.UTC(new Date(todayDate).getFullYear(), new Date(todayDate).getMonth(), new Date(todayDate).getDate());
          // const _MS_PER_DAY = 1000 * 60 * 60 * 24;
          // let differenc = Math.floor((utc1 - utc2) / _MS_PER_DAY)
          // if (differenc < 1) {
          //   next.endDateFormat)
          // }
          // else {
          //   next.endDateFormat = moment(new Date(next?.endDate)).format("YYYY-MM-DD")
          // }
          if (time) {
            next.endDateFormat = time;
          }
          activeOffers.push(next);
        }
      } else {
        next["endDateFormat"] = "Pa kohë të caktuar";
        activeOffers.push(next);
      }
    });
    setOffers(activeOffers || []);
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setLoading(false);
      getProducts();
      getOffers();
      getTotal();
    });
  }, [navigation, getProducts, getOffers, getTotal]);

  const removeProduct = async (id) => {
    const response = await axiosApiInstance.delete(
      `/basket/remove-from-basket/${id}`
    );

    setData(data?.filter((item) => item.id !== id));
    await getProducts();
    await getTotal();
  };

  const removeManualProduct = async (name) => {
    const response = await axiosApiInstance.delete(
      `/basket/remove-text-product/${name}`
    );
    setManualData(manualData?.filter((item) => item.name !== name));
    await getProducts();
    await getTotal();
  };

  const onSubmit = async (id, quantity, manual) => {
    try {
      if (quantity !== 0) {
        const response = await axiosApiInstance.put(
          `${
            manual
              ? `basket/update-text-product-quantity`
              : `basket/update-quantity`
          }`,
          manual
            ? {
                name: id,
                quantity: quantity,
              }
            : {
                productId: id,
                quantity: quantity,
              }
        );
      }
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };

  const incNum = async (i, id, manual) => {
    if (manual) {
      const manualData = [...manualData];
      if (manualData[i].quantity) {
        manualData[i].quantity++;
      } else {
        manualData[i].quantity = 1;
      }
      setManualData(manualData);
      await onSubmit(id.split("_")[0], manualData[i].quantity, true);
    } else {
      const newdata = [...data];
      if (newdata[i].quantity) {
        newdata[i].quantity++;
      } else {
        newdata[i].quantity = 1;
      }
      setData(newdata);
      await onSubmit(id.split("_")[0], newdata[i].quantity, false);
    }
    getTotal();
  };

  const decNum = async (i, id, manual) => {
    if (manual) {
      const manualData = [...manualData];
      if (manualData[i].quantity > 1 || manualData[i].quantity != 1) {
        manualData[i].quantity--;
        setManualData(manualData);
        await onSubmit(id.split("_")[0], manualData[i].quantity, true);
      } else {
        return await removeProduct(id.split("_")[0]);
      }
    } else {
      const newdata = [...data];
      if (newdata[i].quantity > 1 || newdata[i].quantity != 1) {
        newdata[i].quantity--;
        setData(newdata);
        await onSubmit(id.split("_")[0], newdata[i].quantity);
      } else {
        return await removeProduct(id.split("_")[0]);
      }
    }
    getTotal();
  };

  const getTotal = async () => {
    const response = await axiosApiInstance.get(`/basket/get-basket-total`);
    setTotal(response?.data);
  };

  const openPermissionModal = useCallback(
    async (event, page) => {
      if (event) {
        await displayPermission(setFormattedAddress, setStreet);
        //addAddressInDB(location.latitude, location.longitude);
      }
    },
    [location]
  );

  const addAddressInDB = (lat, long) => {
    axiosApiInstance
      .post(`/geolocation`, {
        lat,
        long,
        country: country,
      })
      .then((response) => {
        if (response.status === 201) {
          setAddresses(response.data.address);
          setStreet(response.data.address.street);
          getTotal();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onPress = useCallback(() => {
    if (basket?.products.length === 0) {
      Alert.alert(
        "Mesazhi",
        "Ju lutem shtoni produkte në shportë dhe zgjedhni marketin ose restauranin",
        [{ text: "Në rregull" }]
      );
    } else if (total.cmimiProdukteve < total.minimumValueOrder) {
      Alert.alert(
        "Mesazhi",
        `${
          basket.orderType === "restaurant" ? "Restoranti" : "Marketi"
        } nuk pranon porosi nen vlerën ${total.minimumValueOrder} ${
          total.currency
        } `,
        [{ text: "Në rregull" }]
      );
    } else {
      navigation.navigate("CheckOut", { comment });
    }
  }, [navigation, basket, market, total]);

  useEffect(() => {
    if (formattedAddress && formattedAddress.length !== 0) {
      if (!!formattedAddress.center) {
        Alert.alert(
          "Adresa",
          "A jeni të sigurt që dëshironi të ruani adresën?",
          [
            {
              text: "Po",
              onPress: async () =>
                addAddressInDB(
                  formattedAddress.center[1],
                  formattedAddress.center[0]
                ),
            },
            {
              text: "Jo",
              onPress: () => setStreet(""),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      }
    }
  }, [formattedAddress, setFormattedAddress]);

  return loading ? (
    <View style={Layout.colCenter}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ShoppingCartScreen
      navigation={navigation}
      comment={comment}
      setComment={setComment}
      basket={basket}
      data={data}
      currency={currency}
      discount={discount}
      market={market}
      marketName={marketName}
      marketID={marketID}
      restaurant={restaurant}
      restaurantName={restaurantName}
      restaurantId={restaurantId}
      manualData={manualData}
      address={address}
      offers={offers}
      total={total}
      removeProduct={removeProduct}
      removeManualProduct={removeManualProduct}
      decNum={decNum}
      incNum={incNum}
      onPress={onPress}
      openPermissionModal={openPermissionModal}
      setFormattedAddress={setFormattedAddress}
      formattedAddress={formattedAddress}
      street={street}
      setStreet={setStreet}
      country={country}
    />
  );
};

export default ShoppingCartContainer;
