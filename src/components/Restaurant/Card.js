import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { useTheme } from "@/hooks";
import { OfferBanner } from "@/components";

export default function Card({ onPress, title, img, hour, minutes, currency, transporti, offer }) {
  const { Common, Images } = useTheme();
  const { restaurant } = Common;
  return (
    <TouchableOpacity onPress={onPress}>
      
      <ImageBackground
        style={restaurant.containerCard}
        imageStyle={{ borderRadius: 8 }}
        source={img}
      >
      {offer && <OfferBanner offer={offer}/>}
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
            <Text style={restaurant.infoText}>30- 60 minuta</Text>
            {/* <Text style={restaurant.clockInfo}>{hour + ":" + minutes}</Text> */}
          </View>
        </View>
        <View style={restaurant.infoRow}>
          <View>
          <Image style={{ height:  16, width: 20}}  source={Images.riderIcon} />
          </View>
          <View style={{ paddingLeft: 5 }}>
          <Text style={restaurant.infoText}>{transporti} {currency}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
