import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useTheme } from "@/hooks";
import { AntDesign } from "@expo/vector-icons";
import { BackButton } from "@/components";

const MarketDetailsHeader = ({
  navigation,
  marketID,
  saved,
  onSave,
  onRemove,
  marketFast,
  search,
  subCategoriesData,
  onSubmitSearched,
  img,
  imageURL,
  deliveryTime = "30 - 60",
  companyName,
}) => {
  const { Layout, Gutters, Colors, Common, Images } = useTheme();
  const { restaurant } = Common;
  return (
    <ImageBackground
      style={[Layout.fill45]}
      source={!marketFast && img}
      imageStyle={[
        { opacity: 0.9 },
        marketFast && { backgroundColor: Colors.primary },
      ]}
    >
      <View style={Common.whiteSpace} />
      <View style={[Layout.fill, Layout.row]}>
        <View style={[Layout.fill10, { left: 5, top: 45 }]}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={[Layout.fill90]}>
          <View style={[Layout.fill20]}></View>
          <View style={[Layout.fill80]}>
            <View style={[Layout.fill, !marketFast && Common.shadow]}>
              <View style={[Layout.fill80, Layout.center]}>
                {imageURL !== undefined && !marketFast ? (
                  <Image
                    style={{ width: 75, height: 55, borderRadius: 5 }}
                    source={{
                      uri: imageURL ?? "https://via.placeholder.com/200/333",
                    }}
                  />
                ) : (
                  <Text
                    style={[
                      Common.titleBanner,
                      marketFast && { color: Colors.white, fontSize: 35 },
                    ]}
                  >
                    {companyName}
                  </Text>
                )}
              </View>
              <View style={[Layout.fill40, Layout.row]}>
                <View style={[Layout.fill, Layout.center]}>
                  <View>
                    <Image
                      style={{ height: 16, width: 16 }}
                      source={Images.clockIcon}
                    />
                  </View>
                  <View style={restaurant.leftInfo}>
                    <Text style={restaurant.infoText}>{deliveryTime}</Text>
                  </View>
                </View>
                <View style={[Layout.fill, Layout.center]}>
                  {saved ? (
                    <TouchableOpacity onPress={() => onRemove()}>
                      <AntDesign
                        name="heart"
                        size={26}
                        color={Colors.buttonColor}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => onSave()}>
                      <AntDesign
                        name="hearto"
                        size={26}
                        color={Colors.buttonColor}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={[Layout.fill, Layout.center]}>
                  <View>
                    <Image
                      style={{ height: 16, width: 20 }}
                      source={Images.riderIcon}
                    />
                  </View>
                  <View style={{ paddingLeft: 5 }}>
                    <Text style={restaurant.infoText}>1 EURO</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              Layout.fill20,
              Gutters.smallTPadding,
              Gutters.smallBPadding,
            ]}
          >
            <View style={Common.searchContainer}>
              <AntDesign name="search1" size={20} color={Colors.aquaPrimary} />
              <TouchableOpacity style={{ width: "85%", height: 20 }}
              onPressIn={() =>
                    navigation.navigate("Nenkategorite", { marketID, item: subCategoriesData[0], getId: null })
                  }
              >
                <Text style={[ {color: Colors.gray30}]}>Kërkoni produktin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={Layout.fill10}></View>
      </View>
    </ImageBackground>
  );
};

export default MarketDetailsHeader;
