//External dependencies
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Header } from "react-native-elements";
// Internal dependencies
import styles from "./styles";
import global, {
  buttonColor,
  primary,
  header,
} from "../../styles/global";
import axiosApiInstance from "../../authentification/request/request";
import Searchbar from "../../components/Searchbar/Searchbar";
import { RestoranContext, MarketContext } from "../../../MarketContext";
import {Card, DisabledCard,  BackButton, IconButton, SearchCategories} from "@/components"
import { useSelector } from "react-redux";

export default function SetRestoran({ navigation, route }) {
  const allCategorieId = route?.params?.allCategorieId;
  const citySelected = useSelector(state=>state?.city?.city);
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  let { defaultRestoran, setDefaultRestoran } = useContext(RestoranContext);
  let { defaultMarket, setDefaultMarket } = useContext(MarketContext);

  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(
        `/product-categories/list-restaurant-categories/null/${page}`
      );
      setSubCategories(response.data);
    })();
  }, []);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }
    (async () => {
      if (subCategoriesId === null) {
        const response = await axiosApiInstance.get(
          `/restaurants/list-restaurants?name=${searchText}&categoryId=${subCategoriesId}&page=${page}&city=${citySelected}`
        );
        if (response.data.data.restaurants.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
        if (searchText) {
          setData([...response.data.data.restaurants]);
        } else {
          setData([...data, ...response.data.data.restaurants]);
        }
        setFetchMore(false);
        setLoading(false);
      } else {
        const response = await axiosApiInstance.get(
          `/restaurants/list-restaurants?name=${searchText}&categoryId=${
            subCategoriesId === null ? "" : subCategoriesId
          }&page=${page}&city=${citySelected}`
        );
        if (response.data.data.restaurants.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
        if (searchText) {
          setData([...response.data.data.restaurants]);
        } else {
          setData([...data, ...response.data.data.restaurants]);
        }
        setFetchMore(false);
        setLoading(false);
      }
    })();
  }, [subCategoriesId, allCategorieId, page]);

  const loadMore = () => {
    if (hasMoreItems && !searchText) {
      setPage(page + 1);
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
    setPage(1);
    setSearchText(text);
    if (subCategoriesId == null) {
      const response = await axiosApiInstance.get(
        `/restaurants/list-restaurants?name=${text}&categoryId=${subCategoriesId}&page=${page}`
      );
      setData(response.data.data.restaurants);
    } else {
      const response = await axiosApiInstance.get(
        `/restaurants/list-restaurants?name=${text}&categoryId=${
          subCategoriesId === null ? "" : subCategoriesId
        }&page=${page}&city=${citySelected}`
      );
      setData(response.data.data.restaurants);
    }
  };
  const chooseDefaultRestoran = async (id, name) => {
    try {
      const response = await axiosApiInstance.post(
        `/basket/set-basket-restaurant/${id}`
      );
      const { data} = response;
      setDefaultRestoran(name);
      setDefaultMarket(null);
    } catch (e) {
      const { data } = e.response;
      Alert.alert("Mesazhi", data.data.message, [{ text: "N?? rregull" }]);
    }
    // callback();
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        centerComponent={{
          text: "Restorantet",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Homepage")} />
        }
      />
      <View style={styles.container}>
        <View style={{ width: "95%",alignSelf:"center" }}>
          <Searchbar
            containerStyle={styles.searchBarcontainer}
            inputContainerStyle={styles.input}
            onSubmitEditing={(text) => {
              onSubmitSearched(text);
            }}
          />
        </View>
        <View style={styles.allContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TeGjitha")}
            style={styles.allButton}
          >
            <Text style={styles.allButtonTitle}>M?? shum??</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesContainer}>
          <FlatList
            data={subCategories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 1, marginLeft: 15 }}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    paddingRight: 10,
                  }}
                >
                  {allCategorieId === undefined ? (
                    <IconButton
                      title={item.name}
                      img={{ uri: item.imageURL }}
                      onPress={() => {
                        setData([]);
                        setSubCategoriesId(item._id);
                        setPage(1);
                      }}
                      isSelected={subCategoriesId === item._id}
                    />
                  ) : (
                    <IconButton
                      title={item.name}
                      img={{ uri: item.imageURL }}
                      onPress={() => {
                        setData([]);
                        setSubCategoriesId(item._id);
                        setPage(1);
                      }}
                      isSelected={allCategorieId === item._id}
                    />
                  )}
                </View>
              );
            }}
          />
        </View>
        {loading ? (
          <View style={global.activityIndicator}>
            <ActivityIndicator size="large" color={buttonColor} />
          </View>
        ) : data.length === 0 ? (
          <View style={global.activityIndicator}>
            <Text style={global.emptyText}>P??r momentin nuk ka restorante</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ width: "90%", alignSelf: "center" }}
            data={data}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item, index }) => {
              return item.isOpen === true ? (
                <Card
                  title={item.name}
                  hour={item.availability.hour}
                  minutes={item.availability.minutes}
                  defaultRestoran={defaultRestoran}
                  id={item._id}
                  currency={item.currency}
                  opacity={1}
                  onPress={() => {
                    chooseDefaultRestoran(item._id, item.name),
                      navigation.navigate("Shporta");
                  }}
                  img={{ uri: item.coverURL ?? item.imageURL }}
                />
              ) : (
                <DisabledCard
                  opensAt={item.opensAt}
                  name={item.name}
                  img={{ uri: item.coverURL ?? item.imageURL }}
                  currency={item.currency}
                />
              );
            }}
            onEndReached={loadMore}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={1}
          />
        )}
      </View>
    </View>
  );
}
