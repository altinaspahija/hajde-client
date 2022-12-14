//External dependencies
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Searchbar from "../../components/Searchbar/Searchbar";
import { Header } from "react-native-elements";
// Internal dependencies
import styles from "./styles";
import { primary, header, buttonColor } from "../../styles/global";
import { BackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import Card from "./Card";

export default function TeGjitha({ navigation, route }) {
  const callback = route?.params?.callback;
  const [page, setPage] = useState(1);
  let [all, setAll] = useState([]);
  let [mostWanted, setMostWanted] = useState([]);
  let [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(
        `/product-categories/list-restaurant-categories-all/null/${page}`
      );
      setAll(response.data.all.filter(item => item.name !== "Të gjitha"));
      setMostWanted(response.data.mostWanted);
    })();
  }, []);

  const onSubmitSearched = async (text) => {
    setSearchText(text);
    if (text) {
      const response = await axiosApiInstance.get(
        `/product-categories/list-restaurant-categories-all/${text}/${page}`
      );
      setAll(response.data.all);
      setMostWanted(response.data.mostWanted);
    } else {
      const response = await axiosApiInstance.get(
        `/product-categories/list-restaurant-categories-all/null/${page}`
      );
      setAll(response.data.all);
      setMostWanted(response.data.mostWanted);
    }
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
          text: "KATEGORITË",
          style: styles.title,
        }}
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Restauranet")} />
        }
      />
      <View style={styles.container}>
        {/* <View style={{ width: "93%" }}>
          <Searchbar
            containerStyle={styles.searchBarcontainer}
            inputContainerStyle={styles.input}
            onSubmitEditing={(text) => {
              onSubmitSearched(text);
            }}
          />
        </View> */}
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={all}
            numColumns={2}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => {
              return (
                <Card
                  title={item?.name}
                  img={{ uri: item?.imageURL }}
                  onPress={() => {
                    if (callback) {
                      callback(item._id);
                    }
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
