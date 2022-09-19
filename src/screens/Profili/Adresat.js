//External dependencies
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
  Animated,
} from "react-native";
import { Header } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
// Internal dependencies
import global, {
  buttonColor,
  primary,
  header,
  black,
} from "../../styles/global";
import styles from "./styles";
import { LargeButton, BackButton } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import Item from "./Item";
import Enumerable from "linq";

import { useLazyFetchCitiesQuery } from "@/services/modules/location"; // I
import { AddressAutoComplete } from "@/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@/hooks";

const pickerStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    height: 40,
    color: "black",
    paddingRight: 30,
    flexDirection: "row",
    alignItems: "center", // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    height: 40,
    color: "black",
    paddingRight: 30,
    flexDirection: "row",
    alignItems: "center", // to ensure the text is never behind the icon
  },
});
export default function Adresat({ navigation, route }) {
  let modal = useRef(null).current;
  const [formattedAddress, setFormattedAddress] = useState();
  const [data, setData] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [street, setStreet] = useState("");
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [error, setError] = useState();
  const [city, setCity] = useState("");

  const [fetchCities, { data: citiesData, isSuccess }] =
    useLazyFetchCitiesQuery();
  const { Layout, Common } = useTheme();

  useEffect(() => {
    const getData = () => {
      fetchCities();
    };
    if (isSuccess) {
      if (citiesData) {
        setCountry(citiesData.country);
        const citiesRes = citiesData.cities.map((item) => ({
          label: item.city,
          value: item.city,
        }));
        setCities(citiesRes || []);
        setCity(citiesRes[0]?.value);
      }
    }
    getData();
  }, [citiesData, isSuccess]);

  const getAddresses = async () => {
    try {
      const addresses = await axiosApiInstance.get(
        "/client/profile/get-addresses",
      );
      const { data: dataAddress } = addresses;
      if (dataAddress.addresses.length === 0)
        setError("Lista e adresave është e zbrazët për momentin");
      setData(dataAddress.addresses);

      // linq.js - object literal
      const getVal = Enumerable.from(dataAddress.addresses).firstOrDefault();
      const getValnoLinq = dataAddress.addresses.find(
        (x) => x.isDefault === true,
      );
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(async () => {
    return navigation.addListener("focus", async () => {
      await getAddresses();
      await fetchCities();
    });
  }, [navigation]);

  const saveAdress = async () => {
    try {
      if (street != "") {
        const response = await axiosApiInstance.post(
          "client/profile/add-address",
          {
            street: street,
            city: city,
            country: country,
            latitude: formattedAddress?.center[0] ?? "",
            longitude: formattedAddress?.center[1] ?? "",
          },
        );
        const { data } = response;
        Alert.alert("Mesazhi", data.message, [{ text: "Në rregull" }]);
        getAddresses();
        setShowMap(false);
        setError(false);
        setShowButton(true);
        setStreet("");
        setFormattedAddress({});
      } else {
        Alert.alert("Mesazhi", "Ju lutem shkruaje rrugën", [
          { text: "Në rregull" },
        ]);
      }
    } catch (e) {
      const { data } = e.response;
      Alert.alert("Mesazhi", data.message, [{ text: "Në rregull" }]);
    }
  };

  useEffect(() => {
    if (formattedAddress && formattedAddress.length !== 0) {
      setStreet(formattedAddress.place_name);
      const getCity = formattedAddress.context?.find((item) =>
        item.id.includes("place") ? item.text : "",
      );
      const cityFormatted = getCity?.text?.replace("Prishtina", "Prishtinë");
      if (cities.some((e) => e.label === cityFormatted)) {
        setCity(cityFormatted);
        Alert.alert("Adresa automatike", "Adresa automatike është vendosur!");
      }
    }
  }, [formattedAddress, setFormattedAddress]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        statusBarProps={{
          barStyle: "dark-content",
          translucent: true,
          backgroundColor: "transparent",
        }}
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        centerComponent={{
          text: "Adresat",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <View style={[Layout.fill, Common.backgroundWhite]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollView,
            { justifyContent: error ? "center" : null },
          ]}
        >
          <Text
            style={[
              styles.title,
              { textAlign: "center", paddingTop: 10, paddingBottom: 5 },
            ]}
          >
            {error ? error : "Adresat e ruajtura deri më tani"}
          </Text>
          <View style={{ padding: 10, width: "100%" }}>
            {data.map((address) => (
              <Item
                callback={getAddresses}
                id={address._id}
                key={address._id}
                coordinates={address.coordinates}
                street={address.street}
                komuna={address.city}
                title={address.street}
                active={address.isDefault}
                index={1}
                onAction={() => {}}
              />
            ))}
          </View>
          {showButton && (
            <LargeButton
              title="Shto një lokacion të ri"
              onPress={() => {
                setShowMap(true), setShowButton(false);
              }}
            />
          )}
          {showMap && (
            <>
              <Text style={[styles.title]}>Zgjedh lokacionin</Text>
              <View style={{ width: "95%", marginTop: 5 }}>
                <Text style={global.note}>Zgjedh qytetin</Text>
                <View style={global.picker}>
                  <RNPickerSelect
                    items={cities}
                    fixAndroidTouchableBug={true}
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => {
                      setCity(value);
                    }}
                    value={city}
                    placeholder={{}}
                    InputAccessoryView={() => null}
                    style={pickerStyle}
                    Icon={() => {
                      return (
                        <View
                          style={{
                            ...Platform.select({
                              ios: {
                                paddingRight: 5,
                                paddingTop: 10,
                              },
                              android: {
                                paddingRight: 5,
                                paddingTop: 10,
                              },
                            }),
                          }}
                        >
                          <Ionicons
                            name="ios-arrow-down"
                            size={20}
                            color={black}
                          />
                        </View>
                      );
                    }}
                    activeItemTextStyle={{ fontSize: 10, fontWeight: "bold" }}
                  />
                </View>
                <Text
                  style={[global.note, { marginTop: 20, marginBottom: 10 }]}
                >
                  Shkruaje rrugën
                </Text>
                {/* <TextInput
                  style={[global.manualisht, { height: 40, marginBottom: 10 }]}
                  onChangeText={(text) => setStreet(text)}
                  value={street}
                /> */}

                <TouchableOpacity
                  style={[global.manualisht, { height: 40, marginBottom: 10 }]}
                  onPress={() => modal.open()}
                >
                  <Text style={[global.note]}>
                    {formattedAddress?.place_name}
                  </Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                  <LargeButton title="Konfirmo" onPress={saveAdress} />
                </View>
              </View>
            </>
          )}
        </ScrollView>
        <AddressAutoComplete
          ref={(el) => (modal = el)}
          country={country}
          formattedAddress={formattedAddress}
          setFormattedAddress={setFormattedAddress}
        />
      </View>
    </View>
  );
}
