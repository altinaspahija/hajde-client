//External dependencies
import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
// Internal dependencies
import axiosApiInstance from "@/authentification/request/request";
import Messaging from "@/screens/Messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HomeScreen } from "@/screens";
import Enumerable from "linq";
import { useLazyFetchCitiesQuery } from "@/services/modules/location";
import { changeCity } from '@/store/Location'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyFetchBannersQuery } from "@/services/modules/banners";

export default ({ navigation }) => {
  const [notifications, setNotifications] = useState();
  const [onClickOpenGift, setClickOpenGift] = useState(false);
  const [address, setAddress] = useState("");
  const [banners, setBanners] = useState([]);
  const [openedGift, setOpenedGift] = useState();

  const dispatch = useDispatch();
  const citySelected = useSelector(state=>state?.city?.city);

  const setCity = (value) => {
    dispatch(changeCity(value))
  }

  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState("");

  const getNotifications = async () => {
    try {
      const response = await axiosApiInstance.get(
        `/notifications/unread-count`
      );
      setNotifications(response.data);
    } catch (err) {
      navigation.navigate("Login");
    }
  };

  const [fetchCities, { data: citiesData, isSuccess }] =
    useLazyFetchCitiesQuery();

    const [fetchBanners, { data: bannersData, isSuccess: isSuccessBanners }] =
      useLazyFetchBannersQuery();

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
        setFilter(citySelected);
      }
    }
    getData();
  }, [citiesData, isSuccess]);


  useEffect(() => {
    const getData = () => {
      fetchBanners();
    };
    if (isSuccessBanners && bannersData) {
        setBanners(bannersData);
    }
    getData();
  }, [bannersData, isSuccessBanners]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      getNotifications()
    );
    return unsubscribe;
  }, [navigation]);

  const hasNotifications = async () => {
    const response = await axiosApiInstance.get(
      `/client/profile/get-profile-info`
    );
    try {
      const hasNotificationsPermissions =
        await Messaging.requestUserPermission();
      if (hasNotificationsPermissions) {
        let userId = response.data._id;
        await Messaging.saveFcmTokenToDb({ userId });
        await Messaging.onRefreshToken();
      }
    } catch (err) {
      console.log(err, "error:::::");
    }
  };
  useEffect(async () => {
    let isGiftOpened = AsyncStorage.getItem("Gift");
    setOpenedGift(isGiftOpened);
    hasNotifications();
  }, []);

  useEffect(async () => {
    return navigation.addListener("focus", async () => {
      await getAddresses();
    });
  }, [navigation]);
  const getAddresses = async () => {
    try {
      const addresses = await axiosApiInstance.get(
        "/client/profile/get-addresses"
      );
      const { data } = addresses;
      if (data.addresses.length !== 0) {
        // linq.js - object literal
        const value = Enumerable.from(data.addresses).firstOrDefault(x=>x.isDefault === true);
        setFilter(value?.city ?? cities[0].label);
        setAddress(value);
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    if (onClickOpenGift) {
      setTimeout(() => setClickOpenGift(false), 2650);
    }
  }, [onClickOpenGift]);

  const onClickSearch = () => {
    navigation.navigate("HomepageSearch");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <HomeScreen
        navigation={navigation}
        onClickSearch={onClickSearch}
        notifications={notifications}
        address={address}
        cities={cities}
        filter={filter}
        setCity={setCity}
        setFilter={setFilter}
        banners={banners}
      />
    </TouchableWithoutFeedback>
  );
};
