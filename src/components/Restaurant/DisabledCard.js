import React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { useTheme } from "@/hooks";

export default function DisabledCard({opensAt, name, img, currency,transporti }) {
  const { Common, Images } = useTheme();
  const { restaurant } = Common;
  return (
    <View>
      <ImageBackground
        style={[restaurant.containerCard, {backgroundColor: '#111111',}]}
        source={img}
        imageStyle={{ opacity: 0.25, borderRadius: 10, }}
      >
        <View style={restaurant.categorieContainerDisabled}>

        <Text style={[restaurant.categorieName, { color: "#bfbfbf"}]}>{name}</Text>
          <Text style={restaurant.categorieNameDisabled}>Hapet në orën {opensAt}</Text>
        </View>
      </ImageBackground>
      <View style={restaurant.infoContainerDisabled}>
        <View style={restaurant.row}>
        <View style={restaurant.infoRow}>
          <View>
            <Image style={{ height:  16, width: 16}} source={Images.clockRedIcon} />
          </View>
          <View style={restaurant.leftInfo}>
            <Text style={[restaurant.infoText, { color: 'red' }]}>Mbyllur</Text>
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
        {/* <Text style={restaurant.infoText}>
          Sushi {"\u2022"} Seafood {"\u2022"} Spaghetti
        </Text> */}
      </View>
    </View>
  );
}
