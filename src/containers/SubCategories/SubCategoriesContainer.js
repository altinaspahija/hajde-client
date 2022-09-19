//External dependencies
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert} from "react-native";
// Internal dependencies
import axiosApiInstance from "@/authentification/request/request";
import { SubCategoriesScreen } from "@/screens";

export default ({ navigation, route }) => {
  const item = route?.params?.item;
  const id = item?._id === undefined ? null : item?._id ;
  const marketID = item.marketId;

  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [currency, setCurrency] = useState();
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);
  let [total, setTotal] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(
        `/product-categories/list-subcategories/${id}`
      );
      setSubCategories(response?.data);
    })();
  }, []);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }

    (async () => {
      if (subCategoriesId === null) {
        const response = await axiosApiInstance.get(
          `/products/list?name=${searchText}&page=${page}&companyId=${marketID}&categoryId=${id}`
        );
        if (response?.data?.products?.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
          setBanner(response?.data?.offers);
        }
        if (searchText) {
          setData([...response.data.products]);
        } else {
          setData([...data, ...response.data.products]);
        }
        setCurrency(response.data.currency);
        setFetchMore(false);
        setLoading(false);
      } else {
        const response = await axiosApiInstance.get(
          `/products/list?name=${searchText}&page=${page}&companyId=${marketID}&subcategoryId=${
            subCategoriesId === null ? "" : subCategoriesId
          }`
        );
        if (response.data.products.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
        if (searchText) {
          setData([...response.data.products]);
        } else {
          setData([...data, ...response.data.products]);
        }
        setFetchMore(false);
        setLoading(false);
      }
    })();
  }, [subCategoriesId, page]);

  const loadMore = () => {
    if (hasMoreItems && !searchText) {
      setPage(page + 1);
    }
  };

  const _renderFooter = () => {
    if (searchText) return null;
    if (hasMoreItems && fetchMore) {
      return <ActivityIndicator animating size="large" color={Colors.buttonColor} />;
    }
    return null;
  };

  const onSubmitSearched = async (text) => {
    setPage(1);
    setSearchText(text);
    if (subCategoriesId == null) {
      const response = await axiosApiInstance.get(
        `/products/list?name=${text}&page=${page}&companyId=${marketID}&categoryId=${id}`
      );
      setData(response.data.products);
    } else {
      const response = await axiosApiInstance.get(
        `/products/list?name=${text}&page=${page}&companyId=${marketID}&subcategoryId=${
          subCategoriesId === null ? "" : subCategoriesId
        }`
      );
      setData(response.data.products);
    }
  };

  const onSubmit = async (id, quantity, clearBasket = false) => {
    try {
      const response = await axiosApiInstance.post(`/basket/add-to-basket`, {
        productId: id,
        quantity: quantity,
        orderType: "market",
        clearBasket

      });
      getTotal()
    } catch (error) {
      errorResponse(error, id, quantity)
    }
  };

  const errorResponse = (error, id, quantity) =>{
    Alert.alert(
      "Info",
      error?.message,
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
    const newdata = [...data];
    if (newdata[index].quantity) {
      newdata[index].quantity++;
    } else {
      newdata[index].quantity = 1;
    }
    setData(newdata);
    onSubmit(id, newdata[index].quantity);
  };

  const decNum = (id, index) => {
    const newdata = [...data];
    if (newdata[index].quantity < 1) {
      return;
    }

    newdata[index].quantity--;
    setData(newdata);
    onSubmit(id, newdata[index].quantity);
  };
  const getTotal = async () => {
    const response = await axiosApiInstance.get(`/basket/get-basket-total-shopping`);
    setTotal(response?.data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTotal();
    });
    return unsubscribe;
  }, [navigation]);
  return (
      <SubCategoriesScreen 
            navigation={navigation}
            setPage={setPage}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
            data={data}
            setData={setData}
            subCategoriesId={subCategoriesId}
            setSubCategoriesId={setSubCategoriesId}
            fetchMore={fetchMore}
            hasMoreItems={hasMoreItems}
            setHasMoreItems={setHasMoreItems}
            searchText={searchText}
            currency={currency}
            setCurrency={setCurrency}
            loading={loading}
            setLoading={setLoading}
            banner={banner}
            setBanner={setBanner}
            total={total}
            setTotal={setTotal}
            loadMore={loadMore}
            _renderFooter={_renderFooter}
            onSubmitSearched={onSubmitSearched}
            incNum={incNum}
            decNum={decNum}
            item={item}
            marketID={marketID}
      />
  );
}
