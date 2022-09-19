import { ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { MarketDetailsScreen } from "@/screens";
import axiosApiInstance from "@/authentification/request/request";
import { useTheme } from "@/hooks";

export default ({ navigation, route }) => {
  const {
    item,
    marketID,
    isSaved,
    city,
    title,
    img,
    imageURL,
    deliveryTime,
    currency,
  } = route?.params;

  const { Colors } = useTheme();
  const [saved, setSaved] = useState(isSaved);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!fetchMore || searchText) return null;
      const response = await axiosApiInstance.get(
        `/product-categories/list-company-categories?name=${searchText}&page=${page}&marketId=${marketID}`
      );
      // response.data.map(async x=> {
      //   const sc = await axiosApiInstance.get(
      //     `/product-categories/list-subcategories/${x._id}`
      //   );
      //   return(
      //   x.subCategories = sc?.data
      // )});
      setData([...data, ...response.data]);
      setHasMoreItems(response.data.length !== 0);
      setFetchMore(false);
      setPage(page + 1);
      setLoading(false);
    })();
  }, [page, fetchMore, loading, data]);

  const loadMore = () => {
    if (hasMoreItems && !searchText) {
      setFetchMore(true);
    }
  };

  const _renderFooter = () => {
    if (searchText) return null;
    if (hasMoreItems && fetchMore) {
      return (
        <ActivityIndicator animating size="large" color={Colors.buttonColor} />
      );
    }
    return null;
  };
  const onSubmitSearched = async (text) => {
    if (text) {
      const response = await axiosApiInstance.get(
        `/product-categories/list-company-categories?name=${text}&marketId=${marketID}`
      );
      setData([...response.data]);
      setFetchMore(true);
    } else {
      setData([]);
      setPage(1);
      setFetchMore(true);
    }
  };
  useEffect(() => {
    onSubmitSearched(searchText);
  }, [searchText]);

  const onSave = async () => {
    try {
      const response = await axiosApiInstance.post(
        `/favorites/save-market?id=${item._id}&city=${city}`
      );
      if (response.data.message === "Preferenca u ruajt me sukses") {
        setSaved(true);
      }

      Alert.alert("Mesazhi", response?.data?.message, [
        {
          text: "Në rregull",
        },
      ]);
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  const onRemove = async () => {
    try {
      console.log(`/favorites/remove-market?id=${item._id}&city=${city}`);

      const response = await axiosApiInstance.put(
        `/favorites/remove-market?id=${item._id}&city=${city}`
      );

      if (response.data.message) {
        setSaved(false);
      }
    } catch (err) {
      console.log("err", err);
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  return (
    <MarketDetailsScreen
      marketFast={false}
      marketData={item}
      marketID={marketID}
      title={title}
      img={img}
      imageURL={imageURL}
      deliveryTime={deliveryTime}
      currency={currency}
      navigation={navigation}
      saved={saved}
      setSaved={setSaved}
      page={page}
      setPage={setPage}
      subCategoriesData={data}
      fetchMore={fetchMore}
      setFetchMore={setFetchMore}
      hasMoreItems={hasMoreItems}
      setHasMoreItems={setHasMoreItems}
      searchText={searchText}
      setSearchText={setSearchText}
      loading={loading}
      loadMore={loadMore}
      _renderFooter={_renderFooter}
      onSave={onSave}
      onRemove={onRemove}
      offer={item?.offer}
    />
  );
};
