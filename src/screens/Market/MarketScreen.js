//External dependencies
import React from "react";
import {
  View,
  FlatList,
  Platform,
  ActivityIndicator,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons, Fontisto } from "@expo/vector-icons";
// Internal dependencies
import Searchbar from "@/components/Searchbar/Searchbar";
import { useTheme } from "@/hooks";
import {
  BackButton,
  CarouselCards,
  DisabledCard,
  IconButton,
  MarketCard,
  SearchCategories,
} from "@/components";

export default ({
  navigation,
  citySelected,
  data,
  banner,
  loading,
  setSearchText,
}) => {
  const { Layout, Colors, Common, Images, Gutters } = useTheme();
  const { restaurant, market } = Common;
  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <View style={Layout.fill35}>
        <ImageBackground
          style={[Layout.fill, Gutters.largeTPadding]}
          source={Images.superMarketCover}
        >
          <View
            style={[Layout.fill, Gutters.smallLPadding, Gutters.smallRPadding]}
          >
            <View style={[Layout.fill, Layout.rowCenter]}>
              <View style={[Layout.fill15, Layout.rowCenter]}>
                <BackButton onPress={() => navigation.pop()} />
              </View>
              <View style={[Layout.fill70]}>
                <Text style={market.searchText}>SUPERMARKETE</Text>
              </View>
              <View style={[Layout.fill15]} />
            </View>
            <View
              style={[
                Layout.fill90,
                Layout.rowCenter,
                Layout.justifyContentBetween,
              ]}
            >
              <SearchCategories
                placeholder={"Cilin supermarket dëshironi?"}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={restaurant.container}>
        <View style={restaurant.allContainer}></View>
        {/* {loading ? (
          <View style={Common.activityIndicator}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : banner?.length === 0 || data?.length === 0 ? null : (
          <CarouselCards data={banner} />
        )} */}
        {loading ? (
          <View style={Common.activitycIndicator}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : data.length === 0 ? (
          <View style={Common.activityIndicator}>
            <Text style={Common.emptyText}>
              Për momentin nuk ka markete në {citySelected}
            </Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={(item, i) => i.toString()}
            data={data}
            renderItem={({ item, i }) => {
              const {
                isSaved: saved,
                city,
                _id: marketID,
                currency,
                company: title,
                imageURL,
                deliveryTime,
              } = item.company;
              const img = { uri: item.company.coverURL };
              return (
                <MarketCard
                  title={title}
                  img={img}
                  imageURL={imageURL}
                  deliveryTime={deliveryTime}
                  currency={currency}
                  offer={item.offer}
                  onPress={() =>
                    navigation.navigate("MarketDetails", {
                      item,
                      saved,
                      city,
                      marketID,
                      title,
                      img,
                      imageURL,
                    })
                  }
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
};
