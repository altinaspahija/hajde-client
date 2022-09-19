import React from "react";
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
import { AntDesign } from "@expo/vector-icons";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { StatusBar } from "expo-status-bar";

import global from "../../styles/global";
import {
  IconButton,
  ProduktetButton,
  BackButton,
  RestaurantProductCard as Card,
} from "@/components";
import { useTheme } from "@/hooks";
import CoreImage from "@/utils/CoreImage";

const screenHeight = Dimensions.get("window").height;

const RestaurantProductsScreen = ({
  offer,
  subCategories,
  loading,
  headerVisible,
  setHeaderVisible,
  total,
  delivery,
  address,
  data,
  search,
  subCategoriesId,
  setSubCategoriesId,
  setPage,
  menus,
  loadMore,
  _renderFooter,
  incNum,
  decNum,
  navigation,
  onChangeSearch,
}) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  const { Common, Colors, Layout, Images, Gutters } = useTheme();
  const { subCategory } = Common;
  const styles = Common.restaurantProducts;

  const searchContainer = () => (
    <View style={[Layout.fill20, Gutters.smallVPadding]}>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color={Colors.aquaPrimary} />
        <View style={Layout.width85percent}>
          <TextInput
            placeholder={`Kërkoni produktin në ${
              delivery?.name || "restorant"
            }`}
            label="city name"
            value={search}
            placeholderTextColor={Colors.gray30}
            onChangeText={(x) => onChangeSearch(x)}
          />
        </View>
      </View>
    </View>
  );
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
                    style={[Layout.justifyContentCenter, styles.informations]}
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
              </View>
            </View>
          </View>
          {searchContainer()}
        </View>
        <View style={Layout.fill10}></View>
      </View>
      <View style={styles.deliveryNameContainer}>
        <Text style={styles.deliveryName}>{delivery?.name}</Text>
      </View>
    </ImageBackground>
  );

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        onChangeHeaderVisibility={(visibility) => {
          setHeaderVisible(visibility);
        }}
        backgroundColor={Colors.white}
        renderStickyHeader={() => (
          <View
            style={[
              Layout.center,
              Gutters.largeTMargin,
              Gutters.smallTPadding,
              Gutters.mediumPadding,
            ]}
          >
            <View style={styles.searchContainer}>
              <AntDesign name="search1" size={20} color={Colors.aquaPrimary} />
              <View style={Layout.width85percent}>
                <TextInput
                  placeholder={`Kërkoni produktin në ${
                    delivery?.name || "restorant"
                  }`}
                  label="city name"
                  value={search}
                  placeholderTextColor={Colors.gray30}
                  onChangeText={(x) => onChangeSearch(x)}
                />
              </View>
            </View>
          </View>
        )}
        stickyHeaderHeight={90}
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
        <View style={Layout.fill}>
          {offer !== null && offer !== undefined && (
            <View style={styles.offersContainer}>
              <CoreImage source={Images.megaphone} style={styles.offerImage} />
              <Text style={styles.offerText}>{offer.description}</Text>
              <CoreImage
                source={Images.megaphoneFlipped}
                style={styles.offerImage}
              />
            </View>
          )}
          <View
            style={[
              styles.infoInnerContainer,
              Layout.fullWidth,
              Layout.alignItemsCenter,
              Gutters.smallTMargin,
            ]}
          >
            <View style={styles.offersAndSubcategories}>
              <View style={styles.categoriesContainer}>
                <FlatList
                  data={subCategories}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={[Layout.fill, Gutters.smallTmargin]}
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
                <ActivityIndicator size="large" color={Colors.buttonColor} />
              </View>
            ) : menus?.length === 0 ? (
              <View style={global.activityIndicator}>
                <Text style={global.emptyText}>Për momentin nuk ka menu</Text>
              </View>
            ) : (
              <ScrollView horizontal scrollEnabled={false}>
                <FlatList
                  scrollEnabled={!headerVisible}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  style={[
                    {
                      height: screenHeight - 130,
                    },
                    Gutters.normalHPadding,
                    Layout.fullWidth,
                  ]}
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
        <View
          style={[
            Layout.row,
            Layout.justifyContentAround,
            Layout.fullWidth,
            Layout.rowHCenter,
          ]}
        >
          {headerVisible && (
            <Image source={Images.cartIcon} style={subCategory.shportaImg} />
          )}
          {headerVisible && (
            <Text style={styles.goToCart}>Shko tek Shporta</Text>
          )}
          <Text style={styles.total}>
            {total?.total} {total?.currency}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantProductsScreen;
