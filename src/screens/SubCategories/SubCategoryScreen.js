//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import Searchbar from "@/components/Searchbar/Searchbar";
import { Header } from "react-native-elements";
// Internal dependencies
import {
  BackButton,
  DecrementButton,
  QuickButton,
  SolidButton,
  SubCategoryCard,
} from "@/components";
import { useTheme } from "@/hooks";

export default ({
  navigation,
  focusSearch,
  setPage,
  subCategories,
  data,
  setData,
  subCategoriesId,
  setSubCategoriesId,
  currency,
  total,
  loading,
  loadMore,
  _renderFooter,
  onSubmitSearched,
  incNum,
  decNum,
  title,
}) => {
  const { Common, Colors, Layout, Images, Gutters } = useTheme();
  const { subCategory: styles } = Common;
  return (
    <View style={Layout.fill}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={Layout.fill}
        >
          <BackButton onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <View style={[Layout.flex3, Layout.center, Gutters.smallRPadding]}>
          <Text
            style={{
              color: Colors.header,
              fontSize: 18,
              fontFamily: "Montserrat-SemiBold",
            }}
          >
            {title}
          </Text>
        </View>
        <View style={Layout.fill} />
      </View>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Searchbar
            containerStyle={styles.searchBarcontainer}
            focus={focusSearch}
            inputContainerStyle={styles.input}
            onSubmitEditing={(text) => {
              onSubmitSearched(text);
            }}
          />
        </View>
        <View style={styles.subCatContainer}>
          <View style={styles.subline}></View>
          <FlatList
            data={subCategories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 1 }}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    paddingRight: 0,
                    height: 35,
                  }}
                >
                  <SolidButton
                    title={item.name}
                    onPress={() => {
                      setData([]);
                      setSubCategoriesId(item._id);
                      setPage(1);
                    }}
                    isSelected={subCategoriesId === item._id}
                  />
                </View>
              );
            }}
          />
        </View>
        {/* {loading ? (
          <View style={Common.activityIndicator}>
            <ActivityIndicator size="large" color={Colors.buttonColor} />
          </View>
        ) : banner?.length === 0 || data?.length === 0 ? null : (
          <CarouselCards data={banner} />
        )} */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 3,
          }}
        >
          <Text style={styles.titile}>Produktet</Text>
        </View>
        {loading ? (
          <View style={Common.activityIndicator}>
            <ActivityIndicator size="large" color={Colors.buttonColor} />
          </View>
        ) : data?.length === 0 ? (
          <View style={Common.activityIndicator}>
            <Text style={Common.emptyText}>Për momentin nuk ka produkte</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={Common.flatListBPadding}
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            numColumns={2}
            data={data}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item, index }) => {
              const id = item._id;
              return (
                <View style={styles.containerCard}>
                  <SubCategoryCard
                    item={item}
                    id={id}
                    incNum={incNum}
                    decNum={decNum}
                    title={item.name}
                    price={item.price}
                    currency={currency}
                    img={{ uri: item.imageURL }}
                    onPress={() =>
                      navigation.navigate("Produkti", { item, index })
                    }
                    index={index}
                  />
                </View>
              );
            }}
            onEndReached={loadMore}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={1}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Shporta")}
        style={styles.bottomContainer}
      >
        <Image source={Images.cartIcon} style={styles.shportaImg} />
        <Text style={{ color: "#00cbbb", fontSize: 20, fontWeight: "bold" }}>
          Shko tek Shporta
        </Text>
        <Text style={{ color: "#00cbbb", fontSize: 18 }}>
          {total?.total} {total?.currency}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
