import React, { useEffect } from "react";
import { View, Image, Platform } from "react-native";
import { useTheme, useLocation } from "@/hooks";
import { RESULTS } from "react-native-permissions";
import { CustomContainer } from "@/containers";
import { OrderPanelComponents } from "@/components";
import Config from 'react-native-config'
import axiosApiInstance from "@/authentification/request/request";

const DEFAULT_REGION_LATITUDE = 42.653073;
const DEFAULT_REGION_LONGITUDE = 21.150157;

const initialRegion = {
  latitude: DEFAULT_REGION_LATITUDE,
  longitude: DEFAULT_REGION_LONGITUDE,
};

const isAndroid = Platform.OS === "android";

const IntroContainer = ({ navigation, route }) => {
  const country = route?.params?.country;
  const city = route?.params?.city;
  const { Common, Layout, Images } = useTheme();
  const { login: styles } = Common;
  const { location, permissionResult } = useLocation(initialRegion, true);

  useEffect(async () => {
    if (permissionResult) {
      if (permissionResult === RESULTS.BLOCKED) {
        navigation.navigate( "Address", { country: country, city: city });
      }
      else {
       console.log('addAddressInDB', permissionResult);
       await addAddressInDB();
      }
    }
  }, [permissionResult]);

  const getAddressesFromAPI = async () => { await axiosApiInstance.get(`/geolocation?lat=${location?.latitude}&long=${location?.longitude}`); }
 
  const addAddressInDB = async () => {
    const response = await axiosApiInstance.post(`/geolocation`, {
      lat: location.latitude,
      long: location.longitude
    });
    try {
      if(response.status === 201){
        navigation.navigate("Homepage");
      }
    } catch (err) {
      alert("Adresa nuk është ruajtur!");
      navigation.navigate("Homepage");
    }
  };

// #region
const goolgeApiUrl = Config.GOOGLE_MAPS_API_URL;
const googleKey = Config.GOOGLE_API_KEY;

const getGeoCodeGoogleUrl = (latitude, longitude) => {
  return `${goolgeApiUrl}/geocode/json?address=${latitude},${longitude}&key=${googleKey}&language=en`;
};

 const getAddressFromGoogle = async (
  latitude,
  longitude
) => {
  return fetch(getGeoCodeGoogleUrl(latitude, longitude), {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      const addressObject = mapAddressFromGoogle(res);
      return addressObject;
    })
    .catch((err) => {
      console.error('Error while fetching google address data', { err });
      throw err;
    });
};

//this function is only to format googles response and to make it easier to read
const mapAddressFromGoogle = (details) => {
  const addressComponents = details?.results?.[0]?.address_components;

  const addressObject = {};
  // see all types at
  // https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingAddressTypes

  addressObject.formattedAddress = details.results[0].formatted_address;
  addressComponents.forEach((item) => {
    if (item.types.includes('postal_code')) {
      addressObject.zip = item.long_name;
    } else if (item.types.includes('country')) {
      addressObject.country = item.long_name;
      addressObject.countryCode = item.short_name;
    } else if (item.types.includes('administrative_area_level_1')) {
      addressObject.province = item.long_name;
      addressObject.provinceCode = item.short_name;
    } else if (item.types.includes('locality')) {
      addressObject.city = item.long_name;
    } else if (item.types.includes('sublocality')) {
    } else if (item.types.includes('route')) {
      addressObject.route = item.long_name;
    } else if (item.types.includes('street_number')) {
      addressObject.street = item.long_name;
    } else if (item.types.includes('subpremise')) {
    } else if (item.types.includes('plus_code')) {
      addressObject.plusCode = item.long_name;
    }
  });

  return addressObject;
}

// #endregion

  return (
    <CustomContainer back={() => navigation.pop()}>
    <View style={Layout.fill}>
        <View style={Layout.alignItemsCenter}>
          <View style={[Layout.colCenter, styles.imageContainerRegister]}>
            <Image
              style={Layout.fullSize}
              resizeMode={"contain"}
              source={Images.hajdeStamp}
            />
          </View>
        </View>
      <OrderPanelComponents
        backgroundColor={"transparent"}
        source={[Images.amSignalLoading]}
      />
      </View>
    </CustomContainer>
  );
};

export default IntroContainer;
