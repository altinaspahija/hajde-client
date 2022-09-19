import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useTheme } from "@/hooks";
import MarketBodyCard from "./MarketBodyCard";

export default ({
  navigation,
  marketID,
  titleLeft,
  titleRight,
  marketData,
  subCategoriesData = [],
  loadMore,
  _renderFooter,
}) => {
  const { Layout, Colors } = useTheme();

  if (subCategoriesData.length !== 0 && subCategoriesData[0]?.subcategories?.length !== 0) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={Layout.fill}>
        <MarketBodyCard
          marketID={marketID}
          navigation={navigation}
          titleLeft={titleLeft}
          titleRight={titleRight}
          marketData={marketData}
          subCategoriesData={subCategoriesData}
          loadMore={loadMore}
          _renderFooter={_renderFooter}
        />
      </ScrollView>
    );
  } else {
    return (
      <ActivityIndicator animating size="large" color={Colors.buttonColor} />
    );
  }
};
