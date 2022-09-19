//External dependencies
import React, { memo, useCallback, useMemo } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
// Internal dependencies
import { useEventEmitter, useTheme } from "@/hooks";
import CarouselItem from "@/containers/Carousel/CarouselItem";
import Carousel from "@/containers/Carousel/Carousel";
import {
  animatedStyles,
  scrollInterpolator,
  EGG_ITEM_WIDTH,
} from "@/containers/Carousel/helpers";
import { CustomToast } from "@/components";
import { useNavigation } from "@react-navigation/native";


const SHAPE = "bonc";

const CarouselScreen = ({
  eventEmitter,
  overlayColor = "#333",
  onItemPress,
  loop = true,
  hideArrow = false,
  onImageLoadEnd,
  banners
}) => {
  const { Images } = useTheme();
  const navigation = useNavigation();
  
  const data = banners.map((item, key)=> {
    return {
      id: (key + 1).toString(),
      title: item.title,
      companyId: item.companyId,
      source: {uri: item.imageURL},
      createdAt: item.createdAt,
      type: item.type,
      city: item.city,
      country: item.country,
      onPress: () => item.type === 1 ? navigation.navigate("RestauranetProduktet", { restoranId: item.companyId }) : navigation.navigate("MarketDetails", { item, saved: false, marketID: item.companyId }),
      badge: {
        light: true,
        text: "15%\nOFF",
        subtext: "",
      },
    }

  })

  const carouselEventEmitter = useEventEmitter({
    maxListeners: data.length * 10,
    defaultEmitter: eventEmitter,
  });
  const renderItem = useCallback(
    ({ item }, paralaxProps = {}) => {
      return (
        <CarouselItem
          source={item.source}
          item={item}
          shape={SHAPE}
          onPress={item.onPress}
          parallaxFactor={1}
          overlayColor={overlayColor}
          onImageLoadEnd={onImageLoadEnd}
          {...paralaxProps}
        />
      );
    },
    [
      onItemPress,
      overlayColor,
      onImageLoadEnd,
      carouselEventEmitter,
      isSingleSlide
    ]
  );

  const handleSnapToItem = useCallback(
    (index) => {
      carouselEventEmitter.emit("onSnapToItem", index);
    },
    [carouselEventEmitter]
  );
  const isSingleSlide = useMemo(() => data?.length === 1, [data]);

  return (<>
    <Carousel
      shape={SHAPE}
      data={data}
      loop={loop}
      scrollInterpolator={scrollInterpolator}
      slideInterpolatedStyle={animatedStyles}
      itemWidth={EGG_ITEM_WIDTH}
      paginationStyle={[
        styles.alignItemsCenter,
        styles.paginationPadding,
        data.length < 2 && styles.displayNone,
      ]}
      beforeInteractionNumToRender={3}
      initialNumToRender={6}
      onItemPress={onItemPress}
      renderItem={renderItem}
      onSnapToItem={handleSnapToItem}
      carouselEventEmitter={carouselEventEmitter}
      hasParallaxImages={true}
    >
      {/* <ActiveWidgetContent
        eventEmitter={carouselEventEmitter}
        data={data}
        hideArrow={hideArrow}
        onPress={onItemPress}
      /> */}
    </Carousel>
    <CustomToast position="bottom" bottomOffset={40} />
  </>
  );
}


export default memo(CarouselScreen);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingTop: 10,
    paddingBottom: 0,
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  paginationPadding: {
    paddingTop: 5,
    paddingBottom: 0,
  },
  displayNone: { display: "none" },
});
