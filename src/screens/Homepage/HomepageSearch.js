import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import axiosApiInstance from "../../authentification/request/request";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header } from "react-native-elements";
import global, {
  buttonColor,
  header,
  primary,
  black,
} from "../../styles/global";
import { BackButton } from "../../components/Button/Button";
import { useTheme } from "@/hooks";
import { OrderPanelComponents } from "@/components";
import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";

export default function HomepageSearch() {
  const { Images, Layout, Gutters, Common } = useTheme();
  const { restaurant } = Common;
  const textInputRef = useRef();
  const navigation = useNavigation();
  let [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const focusOnInput = (e) => {
    textInputRef.current.focus();
  };
  const SearchComponent = async (search) => {
    setSearch(search);
    const response = await axiosApiInstance.get(
      `/basket/search?name=${search}`
    );
    if (search.length === 0) {
      setData([]);
    } else {
      let filter = response.data.result.filter(
        (next) => next.type == "restaurant" || next.type == "market"
      );

      setData(filter);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        setSearch("");
        focusOnInput();
      },
      []
    );
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={global.container}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      {/* <Header
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        centerComponent={{
          text: "Kërko",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      /> */}

      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "grey",
          borderRadius: 5,
          padding: 10,
          justifyContent: "space-between",
          marginHorizontal: 28,
        }}
      >
        <BackButton onPress={() => navigation.navigate("Homepage")} />
        <TextInput
          ref={textInputRef}
          placeholder="Çfarë ju duhet?"
          label="city name"
          value={search}
          style={{ width: "80%" }}
          onChangeText={(search) => SearchComponent(search)}
        />
        <AntDesign name="search1" size={20} color={black} />
      </View>
      {search?.length === 0 ? null : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, i) => i.toString()}
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            borderRadius: 20,
          }}
          data={data}
          ListEmptyComponent={() => (
            <View style={{ height: 200 }}>
              <Text style={[global.emptyText, { paddingTop: "40%" }]}>
                Nuk ka të dhëna
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item?._id}
                onPress={() =>
                  item?.type === "product"
                    ? navigation.navigate("Produkti", { item })
                    : item?.type === "market"
                    ? navigation.navigate("MarketDetails", {
                        marketID: item?._id,
                        item,
                        isSaved: item?.saved,
                        city: item?.city,
                      })
                    : item?.type === "restaurant"
                    ? navigation.navigate("RestauranetProduktet", {
                        restoranId: item?._id,
                      })
                    : navigation.navigate("Restauranet")
                }
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 5,
                  margin: 8,
                  alignItems: "center",
                  borderColor: "gray",
                  borderWidth: item?.description === "restorant" ? 1 : 2,
                  borderRadius: 8,
                  backgroundColor:
                    item?.description === "restorant"
                      ? "#11111111"
                      : "#33333302",
                }}
              >
                <View>
                  <FastImage
                    source={{ uri: item?.imageURL }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                  />
                </View>
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 16,
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 16,
                      fontFamily: "Montserrat-Italic",
                      color: "#333",
                    }}
                  >
                    {item?.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
