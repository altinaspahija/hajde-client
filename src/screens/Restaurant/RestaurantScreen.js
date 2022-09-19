//External dependencies
import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Image } from "react-native-elements";
// Internal dependencies
import {
  Card,
  DisabledCard,
  BackButton,
  IconButton,
  SearchCategories,
  CountriesLoader,
  RestaurantLoader,
} from "@/components";
import CarouselCards from "@/components/Carousel/CarouselCards";
import { useTheme } from "@/hooks";
import { StatusBar } from "expo-status-bar";

export default ({
  navigation,
  data = [],
  setData,
  citySelected,
  loadMore,
  onSubmitSearched,
  subCategoriesId,
  subCategories,
  setSubCategoriesId,
  setPage,
  loading,
  searchText,
  fetchMore,
  hasMoreItems,
  banner,
  firstTime,
  transporti,
}) => {
  const { Layout, Colors, Common, Images, Gutters } = useTheme();
  const { restaurant } = Common;
  const RestaurantLoaderList = (
    <View style={{ width: "90%", alignSelf: "center" }}>
      {[1, 2, 3, 4, 5, 6].map(() => (
        <RestaurantLoader />
      ))}
    </View>
  );

  return (
    <View style={Layout.fill}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={Layout.fill35}>
        <ImageBackground
          style={[Layout.fill, Gutters.largeTPadding]}
          source={Images.restaurantCover}
        >
          <View
            style={[Layout.fill, Gutters.smallLPadding, Gutters.smallRPadding]}
          >
            <View
              style={[Layout.fill, Layout.rowCenter, Gutters.normalTMargin]}
            >
              <View style={[Layout.fill15, Layout.rowCenter]}>
                <BackButton onPress={() => navigation.navigate("Homepage")} />
              </View>
              <View style={[Layout.fill70, Gutters.heavyLMargin]}>
                <Text style={restaurant.text}>RESTORANTE</Text>
              </View>
              <View style={[Layout.fill15]} />
            </View>
            <View
              style={[
                Layout.fill,
                Layout.rowHCenter,
                Layout.justifyContentBetween,
                Gutters.largeBPadding,
              ]}
            >
              <View style={Layout.fill}>
                <SearchCategories
                  placeholder={"Cilin restaurant dëshironi?"}
                  onChangeText={(text) => {
                    onSubmitSearched(text);
                  }}
                />
              </View>
              <View style={Layout.fill15}>
                <TouchableOpacity
                  style={restaurant.catContainer}
                  onPress={() =>
                    navigation.navigate("TeGjitha", {
                      callback: (itemId) => {
                        setData([]);
                        setPage(1);
                        setSubCategoriesId(itemId);
                        navigation.pop();
                      },
                    })
                  }
                >
                  <Image
                    source={Images.categoriesIcon}
                    style={{ width: 18, height: 15 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={restaurant.container}>
        <View style={restaurant.allContainer}></View>
        <View style={restaurant.categoriesContainer}>
          <FlatList
            data={subCategories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 1, margin: 0, marginTop: -40 }}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={[{ borderBottomWidth: 3, borderBottomColor: "#111" }]}
                >
                  {loading && firstTime ? (
                    <CountriesLoader />
                  ) : (
                    <IconButton
                      title={item?.name}
                      img={{ uri: item?.imageURL }}
                      onPress={() => {
                        setData([]);
                        setSubCategoriesId(item?._id);
                        setPage(1);
                      }}
                      isSelected={subCategoriesId === item?._id}
                    />
                  )}
                </View>
              );
            }}
          />
        </View>

        {/* {loading ? (
          <View style={Common.activityIndicator}>
              {RestaurantLoaderList}
          </View>
        ) : banner?.length === 0 || data?.length === 0 ? null : (
          <CarouselCards data={banner} />
        )}*/}
        {loading ? (
          RestaurantLoaderList
        ) : data.length === 0 ? (
          <View style={Common.activityIndicator}>
            <Text style={Common.emptyText}>
              Për momentin nuk ka restorante në {citySelected}
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ width: "90%", alignSelf: "center" }}
            data={data}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item, index }) => {
              const restoranId = item?.restaurant._id;
              if (loading) {
                return <RestaurantLoader />;
              }
              return item.restaurant.isOpen === true ? (
                <Card
                  title={item?.restaurant.name}
                  transporti={transporti?.transportPrice}
                  hour={item?.restaurant.availability?.hour}
                  minutes={item?.restaurant.availability?.minutes}
                  currency={item?.restaurant.currency}
                  offer={item?.offer}
                  onPress={() =>
                    navigation.navigate("RestauranetProduktet", { restoranId })
                  }
                  img={{ uri: item.restaurant.coverURL ?? item?.imageURL }}
                />
              ) : (
                <DisabledCard
                  opensAt={item?.restaurant.opensAt}
                  name={item?.restaurant.name}
                  img={{ uri: item.restaurant.coverURL ?? item?.imageURL }}
                  currency={item?.restaurant.currency}
                  transporti={transporti?.transportPrice}
                />
              );
            }}
            onEndReached={loadMore}
            ListFooterComponent={() => {
              if (searchText) return null;
              if (hasMoreItems && fetchMore) {
                return RestaurantLoaderList;
              }
              return null;
            }}
            onEndReachedThreshold={1}
          />
        )}
      </View>
    </View>
  );
};
