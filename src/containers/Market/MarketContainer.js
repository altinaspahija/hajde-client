//External dependencies
import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
// Internal dependencies
import { buttonColor } from "@/styles/global";
import axiosApiInstance from "@/authentification/request/request";
import { MarketScreen } from "@/screens";
// import { useLazyFetchCitiesQuery } from "@/services/modules/location";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

export default ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const citySelected = useSelector((state) => state?.city?.city);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);

  const getCompanies = async () => {
    try {
      setLoading(true);
      let response;
      if (searchText !== "") {
        response = await axiosApiInstance.get(
          //TO DO: remove v2 because it will be moved to environment
          `v2/companies/search?name=${searchText}&city=${citySelected}`,
        );
      } else {
        response = await axiosApiInstance.get(
          //TO DO: remove v2 because it will be moved to environment
          `v2/companies/list?page=1&city=${citySelected}`,
        );
      }
      console.log(response);
      setBanner(response?.data?.offers);
      setData(response?.data?.companies);
      setLoading(false);
    } catch (e) {
      alert("Mesazhi", e.response.data.message, [{ text: "Në rregull" }]);
    }
  };

  useEffect(() => {
    getCompanies();
    console.log("called");

    // Call only when screen open or when back on screen
    if (isFocused) {
      //getCompanies();
    }
  }, [citySelected]);

  const onSubmitSearched = async (text) => {
    if (text) {
      const response = await axiosApiInstance.get(
        //TO DO: remove v2 because it will be moved to environment
        `v2/companies/search?name=${text}&city=${citySelected}`,
      );
      setData(response?.data?.companies || []);
    } else {
      getCompanies();
    }
  };

  useEffect(() => {
    onSubmitSearched(searchText);
  }, [searchText]);
  const suppliers = data.sort((x) => (x.company.fastDelivery ? -1 : 1));
  return (
    <MarketScreen
      navigation={navigation}
      data={suppliers}
      citySelected={citySelected}
      setData={setData}
      banner={banner}
      loading={loading}
      searchText={searchText}
      setSearchText={setSearchText}
    />
  );
};
