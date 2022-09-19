//External dependencies
import React, { useState, useEffect } from "react";

import axiosApiInstance from "../../authentification/request/request";
import { RestaurantProductsScreen } from "@/screens";
import { Alert } from "react-native";

export default function RestaurantProductsContainer({ navigation, route }) {
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
  const [offer, setOffer] = useState();
  const [search, setSearch] = useState();
  let [total, setTotal] = useState({});
  const [headerVisible, setHeaderVisible] = useState(true);

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
      return (
        <ActivityIndicator animating size="large" color={Colors.buttonColor} />
      );
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
      const response = await axiosApiInstance.get(`v2/restaurants/${restoranId}`);
      setData(response.data);
      setDelivery(response.data.restaurant);
      setAddress(response.data.restaurant.address);
      setOffer(response.data.offer);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTotal();
    });
    return unsubscribe;
  }, [navigation]);

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
            await onSubmit(id, quantity, true).then(() => menus.find(item => item._id === id).quantity = 1);
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
    <RestaurantProductsScreen
      offer={offer}
      subCategories={subCategories}
      loading={loading}
      headerVisible={headerVisible}
      setHeaderVisible={setHeaderVisible}
      total={total}
      delivery={delivery}
      address={address}
      data={data}
      search={search}
      subCategoriesId={subCategoriesId}
      setSubCategoriesId={setSubCategoriesId}
      setPage={setPage}
      menus={menus}
      loadMore={loadMore}
      _renderFooter={_renderFooter}
      incNum={incNum}
      decNum={decNum}
      navigation={navigation}
      onChangeSearch={onChangeSearch}
    />
  );
}
