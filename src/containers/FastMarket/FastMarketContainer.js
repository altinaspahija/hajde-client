//External dependencies
import React, { useState, useEffect } from "react";
import { View } from "react-native";
// Internal dependencies
import axiosApiInstance from "@/authentification/request/request";
import FastMarketDetailsContainer from "./FastMarketDetailsContainer";
import { useSelector } from "react-redux";

export default ({ navigation }) => {
  const [data, setData] = useState([]);

  const citySelected = useSelector(state=>state?.city?.city);
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);

  const getCompanies = async () => {
    try {
      setLoading(true);
      let response;
      if (searchText !== "") {
        response = await axiosApiInstance.get(
          `companies/search?name=${searchText}&city=${citySelected}`
        );
      } else {
        response = await axiosApiInstance.get(
          `/companies/list?page=1&city=${citySelected}`
        );
      }
      setBanner(response?.data?.offers);
      setData(response?.data?.result);
      setLoading(false);
    } catch (e) {
      alert("Mesazhi", e.response.data.message, [{ text: "Në rregull" }]);
    }
  };

  useEffect(() => {
    getCompanies();
}, [citySelected]);


  const onSubmitSearched = async (text) => {
    if (text) {
      const response = await axiosApiInstance.get(
        `companies/search?name=${text}&city=${citySelected}`
      );
      setData(response?.data?.result || []);
    } else {
      getCompanies();
    }
  };

  useEffect(() => {
    onSubmitSearched(searchText);
  }, [searchText]);

  const suppliers = data.filter((x) => x.fastDelivery);
  if (suppliers.length !== 0) {
    const {
      isSaved,
      currency,
      company: title,
      imageURL,
      deliveryTime,
      city,
      _id: marketID,
    } = suppliers[0];
    const img = { uri: imageURL };
    return (
      <FastMarketDetailsContainer
        navigation={navigation}
        title={title}
        img={img}
        imageURL={imageURL}
        deliveryTime={deliveryTime}
        currency={currency}
        item={suppliers[0]}
        isSaved={isSaved}
        city={city}
        loading={loading}
        banner={banner}
        marketID={marketID}
      />
    );
  } else {
    return <View />;
  }
};
