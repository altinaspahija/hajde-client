//External dependencies
import React, { memo } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
// Internal dependencies
import { useTheme } from "@/hooks";
import { HorizontalList, Search } from "@/components";
import CarouselScreen from "./CarouselScreen";
import { StatusBar } from "expo-status-bar";
import CoreImage from "@/utils/CoreImage";
import Config from "react-native-config";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

const SHAPE = "bonc";
let location = "Lokacioni juaj!";
/*
**** this is a function which calc the max number of length and shown the dots in the end of the text
  { { ((location).length > maxlimit) ? 
    (((location).substring(0, maxlimit-3)) + '...') : 
    location } }
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const HomeScreen = ({
  navigation,
  onClickSearch,
  notifications,
  address,
  cities,
  setFilter,
  setCity,
  filter,
  banners,
}) => {
  const { Colors, Common, Layout, Images, Gutters } = useTheme();
  const { home, titleBanner, picker, pickerHomeStyle, emptyText } = Common;

  location = address.street;
  const country = address.country;
  return (
    <View style={home.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Search onPress={onClickSearch} />
      <ImageBackground
        source={Images.homeTopBanner}
        imageStyle={Layout.flex2}
        style={Layout.flex2}
      >
        <View style={[Layout.fill20, { backgroundColor: "transparent" }]}>
          {/* <Notification
            onPress={() => navigation.navigate("Notifications")}
            notifications={notifications}
          /> */}
        </View>
        <View style={Layout.flex3}>
          <TouchableOpacity
            style={home.locationContainer}
            onPress={() => navigation.navigate("Adresat", { paramKey: 0, country: country })}
          >
            <View style={home.locationRight}>
              <CoreImage
                style={{ width: 20, height: 25 }}
                source={Images.logo}
              />
            </View>
            <Text numberOfLines={1} style={Common.primaryText}>
              {location}
            </Text>
            <View style={home.locationLeft}>
              <CoreImage
                style={{ width: 10, height: 10 }}
                source={Images.dropDownIcon}
              />
            </View>
          </TouchableOpacity>
          <View style={[Layout.fill, { paddingLeft: 20 }]}>
            <Text style={titleBanner}> Nëse vonojmë,</Text>
            <Text style={titleBanner}> ne kompensojmë.</Text>

            <View style={[Layout.fill, Layout.rowCenter, Gutters.smallBMargin, Gutters.regularLPadding, Gutters.regularRPadding]}>
            <Text style={emptyText}> Ku ndodhesh: </Text>
              <View
                style={[Layout.fill, pickerHomeStyle]}
                //style={{ width: "100%", backgroundColor: 'red'}}
              >
                {cities.length > 0 && (
                  <RNPickerSelect
                    items={cities}
                    fixAndroidTouchableBug={true}
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => {
                      setCity(value);
                      setFilter(value);
                    }}
                    placeholder={{}}
                    InputAccessoryView={() => null}
                    activeItemTextStyle={{ fontSize: 10, fontWeight: "bold" }}
                    value={filter}
                    Icon={() => {
                      return (
                        <View
                          style={{
                            ...Platform.select({
                              ios: {
                                paddingRight: 25,
                                paddingTop: 5,
                              },
                              android: {
                                paddingTop: 0,
                              },
                            }),
                          }}
                        >
                          <Ionicons
                            name="ios-arrow-down"
                            size={26}
                            color={Colors.white}
                          />
                        </View>
                      );
                    }}
                    style={picker}
                  />
                )}
              </View>
             
            </View> 
            {Config.ENV === "DEVELOPMENT" && (
                <Text style={emptyText}> DEVELOPMENT</Text>
              )}
          </View>
        </View>
        <View
          style={{ height: 10, backgroundColor: "white", overflow: "hidden" }}
        />
      </ImageBackground>

      <View style={home.buttonsContainer}>
        <HorizontalList navigation={navigation} />
      </View>
      <View style={home.bannersContainer}>
        {banners.length !== 0 && <CarouselScreen banners={banners}/> }
      </View>
      <View style={Layout.fill65} />
    </View>
  );
};

export default memo(HomeScreen);
