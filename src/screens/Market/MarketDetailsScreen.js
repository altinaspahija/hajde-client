//External dependencies
import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
// Internal dependencies
import { useTheme } from "@/hooks";
import MarketDetailsHeader from "./MarketDetailsHeader";
import CoreImage from "@/utils/CoreImage";
import { MarketBodyCardComponent } from "@/components";

export default ({
  navigation,
  marketFast,
  marketData,
  marketID,
  subCategoriesData = [],
  title,
  img,
  imageURL,
  deliveryTime,
  search,
  _renderFooter,
  loadMore,
  onSubmitSearched,
  loading,
  saved,
  onSave,
  onRemove,
  offer,
}) => {
  const { Layout, Colors, Common, Images } = useTheme();
  const { restaurant } = Common;
  const styles = Common.restaurantProducts;
  return (
    <View style={[Layout.fill, Common.backgroundWhite] }>
      <MarketDetailsHeader
        marketID={marketID}
        subCategoriesData={subCategoriesData}
        marketFast={marketFast}
        navigation={navigation}
        search={search}
        saved={saved}
        onSave={onSave}
        onRemove={onRemove}
        companyName={title}
        deliveryTime={deliveryTime}
        onSubmitSearched={onSubmitSearched}
        img={img}
        imageURL={imageURL}
      />
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
          restaurant.container,
          { borderTopColor: "black", borderTopWidth: 2 },
        ]}
      >
        <View style={Layout.fill}>
          {!loading ? (
            <MarketBodyCardComponent
              marketID={marketID}
              navigation={navigation}
              titleLeft={title}
              titleRight={"Të gjitha"}
              marketData={marketData}
              subCategoriesData={subCategoriesData}
              loadMore={loadMore}
              _renderFooter={_renderFooter}
            />
          ) : (
            <ActivityIndicator
              animating
              size="large"
              color={Colors.buttonColor}
            />
          )}
        </View>
      </View>
    </View>
  );
};
