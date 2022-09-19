import {
  Keyboard,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "@/containers";
import { CustomToast, FormInput, AddressAutoComplete } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-toast-message";
import { useAddAddressMutation } from "@/services/modules/address";

import { useLazyFetchCitiesQuery } from "@/services/modules/location"; // Import the query
import { useTheme } from "@/hooks";

export default ({ navigation, route }) => {
  const country = route?.params?.country;
  const city = route?.params?.city;
  let modal = useRef(null).current;
  let addressInput = useRef(null);
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [validAddress, setAddressValid] = useState(true);
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState(city);
  const [formattedAddress, setFormattedAddress] = useState();
  const { Common, Colors } = useTheme();
  const { picker, pickerStyle } = Common;
  const [fetchCities, { data: citiesData, isSuccess }] =
    useLazyFetchCitiesQuery();

  const [addAddress] = useAddAddressMutation();

  useEffect(() => {
    const getData = () => {
      fetchCities();
    };
    if (isSuccess) {
      if (citiesData) {
        const citiesRes = citiesData.cities.map((item) => ({
          label: item.city,
          value: item.city,
        }));
        setCities(citiesRes || []);
      }
    }
    getData();
  }, [citiesData, isSuccess]);
  useEffect(() => {
    setAddress(formattedAddress?.place_name);
    console.log({ formattedAddress });
  }, [formattedAddress]);

  const goIn = () => {
    LayoutAnimation.easeInEaseOut();
    if (validateAddress()) {
      setLoading(true);
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setLoading(false);
        saveAddress();
      }, 1500);
    }
  };

  const validateAddress = () => {
    const addressCheck = address.length > 0;
    LayoutAnimation.easeInEaseOut();
    setAddressValid(addressCheck);
    addressCheck || addressInput.shake();
    return addressCheck;
  };

  const saveAddress = async () => {
    try {
      if (address != "") {
        await addAddress({
          street: address,
          city: city,
          country: country,
          latitude: "",
          longitude: "",
        });
        // const response = await axiosApiInstance.post(
        //   "client/profile/add-address",
        //   {
        //     street: address,
        //     city: city,
        //     country: country,
        //     latitude: "",
        //     longitude: "",
        //   }
        // );
        // const { data } = response;
        // Toast.show({
        //   type: "info",
        //   text1: data?.message,
        //   props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d71" },
        // });
      }
    } catch (e) {
      const { data } = e.response;
      Toast.show({
        type: "error",
        text1: data?.message,
        props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d71" },
      });
    } finally {
      navigation.navigate("Homepage");
    }
  };
  return (
    <>
      <Container
        onPress={() => goIn()}
        isLoading={isLoading}
        back={() => navigation.pop()}
      >
        <View style={pickerStyle}>
          <RNPickerSelect
            items={cities}
            fixAndroidTouchableBug={true}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => {
              setFilter(value);
            }}
            value={filter}
            placeholder={{}}
            InputAccessoryView={() => null}
            style={{
              inputIOS: { ...picker.inputIOS, color: Colors.black },
              inputAndroid: {
                ...picker.inputAndroid,
                color: Colors.black,
                alignSelf: "center",
                paddingTop: 7,
              },
            }}
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
                  <Ionicons name="ios-arrow-down" size={20} color={"black"} />
                </View>
              );
            }}
            activeItemTextStyle={{ fontSize: 10, fontWeight: "bold" }}
          />
        </View>

        <TouchableOpacity
          style={Common.login.addressInput}
          onPress={() => modal.open()}
        >
          <Text style={Common.login.inputStyle}>{address || "Rruga"}</Text>
        </TouchableOpacity>
      </Container>
      <AddressAutoComplete
        ref={(el) => (modal = el)}
        country={country}
        formattedAddress={formattedAddress}
        setFormattedAddress={setFormattedAddress}
      />
      <CustomToast />
    </>
  );
};
