import React from "react";
import { Text, TouchableOpacity, View, Image, ImageBackground } from "react-native";
import { useTheme } from "@/hooks";
import { OfferBanner } from "@/components";
export default ({ onPress, title, img, defaultMarket, id, deliveryTime, currency, offer }) => {
  const { Common, Images } = useTheme();
  const { market, restaurant } = Common;
  return(
    <TouchableOpacity key={id} style={market.container}  onPress={onPress}>
      <ImageBackground
        style={market.containerCard}
        imageStyle={{ borderRadius: 8 }}
        source={img}
      >
        {offer && <OfferBanner offer={offer} />}
        <View style={restaurant.categorieContainer}>
          <Text style={restaurant.categorieName}>{title}</Text>
        </View>
      </ImageBackground>
      <View style={restaurant.infoContainer}>
        <View style={restaurant.infoRow}>
          <View>
          <Image style={{ height:  16, width: 16}} source={Images.clockIcon} />
          </View>
          <View style={restaurant.leftInfo}>
            <Text style={restaurant.infoText}>{deliveryTime}</Text>
          </View>
        </View>
        <View style={restaurant.infoRow}>
          <View>
            <Image source={require("../../assets/images/motorri.png")} />
          </View>
          <View style={{ paddingLeft: 5 }}>
            <Text style={restaurant.infoText}>{currency ?? `1 Euro`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
)
};
