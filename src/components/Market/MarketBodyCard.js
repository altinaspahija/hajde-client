import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useTheme } from "@/hooks";
import Card from "@/screens/Marketet/Card";
import MarketBodyCardItem from "./MarketBodyCardItem";

export default ({
  navigation,
  marketID,
  titleLeft,
  titleRight,
  subCategoriesData,
  loadMore,
  _renderFooter,
}) => {
  const { Layout, Gutters, Colors, Common } = useTheme();

  const Categories = ({ item }, itemSub) => {
    return (
      <MarketBodyCardItem
        item={item}
        name={item.name}
        title={item.name}
        img={{ uri: item.imageURL }}
        onPress={() =>
          navigation.navigate("Nenkategorite", { item: itemSub, marketID, getId: item._id })
        }
      />
    )
  }
  return subCategoriesData.map((itemSub) => {
    return (
      <View style={Layout.fill}>
        <View
          style={[
            Layout.fill30,
            Layout.justifyContentBetween,
            Layout.row,
            Gutters.horizontalPadding,
            Gutters.smallPadding,
          ]}
        >
          <View style={Layout.justifyContentCenter}>
            <Text style={Common.textBlackBold}>{itemSub.name}</Text>
          </View>

          <TouchableOpacity
            style={Layout.justifyContentCenter}
            onPress={() =>
              navigation.navigate("Nenkategorite", { marketID, item: itemSub, getId: null })
            }
          >
            <Text style={Common.textPrimary}>{titleRight}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={Layout.fullWidth}
          data={itemSub.subcategories}
          keyExtractor={(item, k) => k.toString()}
          renderItem={(item) => Categories(item, itemSub)}
          onEndReached={loadMore}
          ListFooterComponent={_renderFooter}
          onEndReachedThreshold={1}
        />
      </View>
    )
  });
};
