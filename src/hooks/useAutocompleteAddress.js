import { View, Text } from "react-native";
import React from "react";
import { MapBoxAutoComplete } from "@/utils/MapBoxAutoComplete";
import Config from "react-native-config";

const useAutocompleteAddress = () => {
  const _suggestionSelect = (result, lat, lng, text) => {
    console.log(result, lat, lng, text);
  };
  return (
    <MapBoxAutoComplete
      query={{
        key: Config.Google_Key,
        language: "en",
        types: "geocode",
      }}
      style={{borderWidth: 2, borderColor: 'red'}}
      inputClass="form-control search"
      onPress={_suggestionSelect}
      country="xk"
      resetSearch={false}
    />
  );
};

// MapboxAutocomplete.defaultProps = {
//   placeholder: 'Search',
//   placeholderTextColor: '#A8A8A8',
//   isRowScrollable: true,
//   underlineColorAndroid: 'transparent',
//   returnKeyType: 'default',
//   onPress: () => {},
//   onNotFound: () => {},
//   onFail: () => {},
//   minLength: 0,
//   fetchDetails: false,
//   autoFocus: false,
//   autoFillOnNotFound: false,
//   keyboardShouldPersistTaps: 'always',
//   getDefaultValue: () => '',
//   timeout: 20000,
//   onTimeout: () => console.warn('google places autocomplete: request timeout'),
//   query: {
//     key: 'missing api key',
//     language: 'en',
//     types: 'geocode',
//   },
//   GoogleReverseGeocodingQuery: {},
//   GooglePlacesSearchQuery: {
//     rankby: 'distance',
//     types: 'food',
//   },
//   styles: {},
//   textInputProps: {},
//   enablePoweredByContainer: true,
//   predefinedPlaces: [],
//   currentLocation: false,
//   currentLocationLabel: 'Current location',
//   nearbyPlacesAPI: 'GooglePlacesSearch',
//   enableHighAccuracyLocation: true,
//   filterReverseGeocodingByTypes: [],
//   predefinedPlacesAlwaysVisible: false,
//   enableEmptySections: true,
//   listViewDisplayed: 'auto',
//   debounce: 0,
//   textInputHide: false
// }


export default useAutocompleteAddress;
