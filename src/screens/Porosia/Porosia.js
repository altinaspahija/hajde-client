//External dependencies
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
// Internal dependencies
import global, {
  primary,
  header,
  black,
  buttonColor,
  textColor,
  backgroundColor,
} from "../../styles/global";
import styles from "./styles";
import axiosApiInstance from "../../authentification/request/request";
import { BackButton, LargeButton } from "../../components/Button/Button";
import SwipableComponent from "./SwipableComponent";
import { ScrollView } from "react-native";
import AddProduct from "../../components/FreeType/AddProduct";
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';


export default function Porosia({ navigation }) {
  const [comment, setComment] = useState("");
  const [basket, setBasket] = useState();
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [market, setMarket] = useState([]);
  const [marketName, setMarketName] = useState([]);
  const [marketID, setMarketId] = useState();
  const [restoran, setRestoran] = useState([]);
  const [restoranName, setRestoranName] = useState([]);
  const [restoranId, setRestoranId] = useState();
  const [loading, setLoading] = useState(true);
  const [manualdata, setManualData] = useState([]);
  const [offers, setOffers] = useState([])

  const getProducts = async () => {
    try {
      const response = await axiosApiInstance.get(`/basket/get-basket`);
      setData(response?.data?.basket?.products);
      setManualData(response.data.basket.typedProducts);
      setBasket(response.data.basket);
      setMarket(response.data);
      setMarketName(response.data.market);
      setMarketId(response.data.marketId);
      setRestoran(response.data);
      setRestoranName(response.data.restaurant);
      setRestoranId(response.data.restaurantId);
      setCurrency(response.data.currency);
      setDiscount(response.data.discount);
      setLoading(false);
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };

  const getOffers = async () => {
    const response = await axiosApiInstance.get(
      `/offers/get-offers`
    );
    let activeOffers = []
    response?.data?.map(next => {
      let endDate = moment(new Date(next?.endDate)).format("YYYY-MM-DD")
      let todayDate = moment(new Date()).format("YYYY-MM-DD")
      if(next?.hasPeriod !== false){
        if (moment(endDate).isSameOrAfter(todayDate)) {
          let currentDate = moment(new Date())
          let tomorrowDate = moment().add(1, 'days').endOf('day');
          endDate = moment(endDate).endOf('day')
          let diffCommentDate = endDate && moment(endDate).diff(moment(currentDate), 'days')
          let time = ''
          if (diffCommentDate >= 1) {
            if (diffCommentDate >= 7) {
              time = `${(diffCommentDate / 7).toFixed()} javë`
            }
            else if (diffCommentDate >= 1 && diffCommentDate < 7) {
              time = `${Math.abs((diffCommentDate).toFixed())} ditë`
            }
  
          }
          else {
            diffCommentDate = endDate && moment(endDate).diff(moment(currentDate), 'hours')
            if (diffCommentDate >= 1) {
              time = `${Math.abs((diffCommentDate).toFixed())} orë`
            }
            else {
              diffCommentDate = endDate && moment(endDate).diff(moment(currentDate), 'minutes')
              if (diffCommentDate >= 1) {
                time = `${Math.abs(diffCommentDate.toFixed())} minuta`
              }
              else {
                diffCommentDate = endDate && moment(endDate).diff(moment(currentDate), 'seconds')
                time = `${Math.abs(diffCommentDate.toFixed())} sekonda`
              }
            }
          }
          // const utc1 = Date.UTC(new Date(endDate).getFullYear(), new Date(endDate).getMonth(), new Date(endDate).getDate());
          // const utc2 = Date.UTC(new Date(todayDate).getFullYear(), new Date(todayDate).getMonth(), new Date(todayDate).getDate());
          // const _MS_PER_DAY = 1000 * 60 * 60 * 24;
          // let differenc = Math.floor((utc1 - utc2) / _MS_PER_DAY)
          // if (differenc < 1) {
          //   next.endDateFormat)
          // }
          // else {
          //   next.endDateFormat = moment(new Date(next?.endDate)).format("YYYY-MM-DD")
          // }
          if (time) {
            next.endDateFormat = time
          }
          activeOffers.push(next)
        }
      }
      else {
        next["endDateFormat"] = 'Pa kohë të caktuar'
        activeOffers.push(next)
      }
    })
    setOffers(activeOffers || [])
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(false);
      getProducts();
      getOffers();
      marketName;
      restoranName;
    });
    return unsubscribe;
  }, [navigation]);

  const removeProduct = async (id) => {
    const response = await axiosApiInstance.delete(
      `/basket/remove-from-basket/${id}`
    );

    setData(data?.filter((item) => item.id !== id));
    getProducts();
  };

  const removeManualProduct = async (name) => {
    const response = await axiosApiInstance.delete(
      `/basket/remove-text-product/${name}`
    );
    setManualData(manualdata?.filter((item) => item.name !== name));
    getProducts();
  };

  const onSubmit = async (id, quantity, manual) => {
    try {
      if (quantity !== 0) {
        const response = await axiosApiInstance.put(
          `${manual
            ? `basket/update-text-product-quantity`
            : `basket/update-quantity`
          }`,
          manual
            ? {
              name: id,
              quantity: quantity,
            }
            : {
              productId: id,
              quantity: quantity,
            }
        );
      }
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };

  const incNum = (i, id, manual) => {
    if (manual) {
      const manualData = [...manualdata];
      if (manualData[i].quantity) {
        manualData[i].quantity++;
      } else {
        manualData[i].quantity = 1;
      }
      setManualData(manualData);
      onSubmit(id.split("_")[0], manualData[i].quantity, true);
    } else {
      const newdata = [...data];
      if (newdata[i].quantity) {
        newdata[i].quantity++;
      } else {
        newdata[i].quantity = 1;
      }
      setData(newdata);
      onSubmit(id.split("_")[0], newdata[i].quantity, false);
    }
  };

  const decNum = (i, id, manual) => {
    if (manual) {
      const manualData = [...manualdata];
      if (manualData[i].quantity > 1 || manualData[i].quantity != 1) {
        manualData[i].quantity--;
        setManualData(manualData);
        onSubmit(id.split("_")[0], manualData[i].quantity, true);
      } else {
        return removeProduct(id.split("_")[0])
      }
    } else {
      const newdata = [...data];
      if (newdata[i].quantity > 1 || newdata[i].quantity != 1) {
        newdata[i].quantity--;
        setData(newdata);
        onSubmit(id.split("_")[0], newdata[i].quantity);
      } else {
        return removeProduct(id.split("_")[0])
      }
    }
  };

  return loading ? (
    <View style={global.activityIndicator}>
      <ActivityIndicator size="large" color={buttonColor} />
    </View>
  ) : (
    <View style={global.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={
          navigation.canGoBack() && <BackButton onPress={() =>  navigation.goBack()} />
        }
        centerComponent={{
          text: "Shporta",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {manualdata?.length === 0 && data?.length === 0 ? (
            <TouchableOpacity
              style={styles.marketDefault}
              onPress={() => navigation.navigate("ZgjedhOpsionin")}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.marketDes}>
                  Ju lutem zgjedhni marketin ose restorantin
                </Text>
                {restoranName === undefined ? null : (
                  <Text style={styles.marketName}>{restoranName}</Text>
                )}
                {marketName === undefined ? null : (
                  <Text style={styles.marketName}>{marketName}</Text>
                )}
              </View>
              <Ionicons name="ios-arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          ) : data?.length === undefined && manualdata?.length != 0 ? (
            <TouchableOpacity
              style={styles.marketDefault}
              onPress={() => navigation.navigate("ZgjedhOpsionin")}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.marketDes}>
                  Ju lutem zgjedhni marketin ose restorantin
                </Text>
                {restoranName === undefined ? null : (
                  <Text style={styles.marketName}>{restoranName}</Text>
                )}
                {marketName === undefined ? null : (
                  <Text style={styles.marketName}>{marketName}</Text>
                )}
              </View>
              <Ionicons name="ios-arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          ) : data?.length != 0 && manualdata?.length != 0 ? (
            <View style={styles.market}>
              <Text style={styles.marketName}>
                {restoranName === undefined ? marketName : restoranName}
              </Text>
            </View>
          ) : (
            <View style={styles.market}>
              <Text style={styles.marketName}>
                {restoranName === undefined ? marketName : restoranName}
              </Text>
            </View>
          )}

          <Text style={styles.title}>Produktet</Text>
          <View style={styles.productsList}>
            <View style={styles.changeProducts}>
              <Text style={styles.productsTitle}>Lista ime</Text>
              {marketID ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("KategoriteListaIme", {
                      item: market,
                      marketID,
                      marketName,
                    });
                  }}
                >
                  <Image
                    style={styles.image}
                    source={require("../../assets/images/Edit.png")}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RestoranKategoriaIme", {
                      restoranId,
                    });
                  }}
                >
                  <Image
                    style={styles.image}
                    source={require("../../assets/images/Edit.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
            {(data || []).map((item, index) => {
              return (
                <SwipableComponent
                  key={`${item.id}_${index}`}
                  id={`${item.id}_${index}_${navigation.canGoBack()}`}
                  customId={true}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  currency={currency}
                  manual={false}
                  removeProduct={removeProduct}
                  incNum={() => incNum(index, `${item.id}_${index}`, null)}
                  decNum={() => decNum(index, `${item.id}_${index}`, null)}
                  index={index}
                  navigation={navigation}
                />
              );
            })}
            {manualdata?.map((item, index) => {
              return (
                <SwipableComponent
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  quantity={item.quantity}
                  removeProduct={() => removeManualProduct(item.name)}
                  incNum={incNum}
                  decNum={decNum}
                  index={index}
                  manual={true}
                  navigation={navigation}
                />
              );
            })}
            <AddProduct
              callback={() => getProducts()}
              manualdata={manualdata}
            />
            <View style={styles.itemsContainer} />
          </View>

          {(basket?.products?.length != 0 ||
            basket?.typedProducts?.length != 0) && (
              <View style={styles.deleteNoteContainer}>
                {
                  <Text style={styles.deleteProduct}>
                    Për të hequr një produkt nga lista tërhiqe majtas
                  </Text>
                }
              </View>
            )}
          {discount === undefined ? null : (
            <View style={styles.marketDefault}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Roboto-Regular",
                  color: textColor,
                }}
              >
                Ju përfitoni zbritje
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Avenire-Regular",
                  color: "#013834",
                  fontWeight: "600",
                }}
              >
                {discount} {currency}
              </Text>
            </View>
          )}
          {offers?.length > 0 &&
            <View style={styles.noteContainer}>
              <Text style={styles.title}>Ofertat</Text>
              <View style={{ ...styles.market, display: 'flex', flexDirection: 'column' }}>
                {offers?.map(next => {
                  return (
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center', flexWrap: 'wrap', paddingVertical: 5 }}>
                      <Text style={{ color: 'black' }}>
                        {next?.description}
                      </Text>
                      <Text style={{ color: 'black' }}>
                        {next?.endDateFormat}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
          }
          <View style={styles.noteContainer}>
            <Text style={styles.title}>Shto koment</Text>
            <TextInput
              name="comment"
              label="comment"
              style={styles.textInput}
              placeholder="Shtoni koment për postierin"
              placeholderTextColor={black}
              numberOfLines={10}
              multiline
              value={comment}
              onChangeText={(txt) => setComment(txt)}
            />
          </View>
          <View style={styles.konfirmoContainer}>
            {basket?.products && market.market != undefined ? (
              <LargeButton
                title="Vazhdo"
                onPress={() => {
                  navigation.navigate("CheckOut", { comment });
                }}
              />
            ) : basket?.typedProducts && market.market != undefined ? (
              <LargeButton
                title="Vazhdo"
                onPress={() => {
                  navigation.navigate("CheckOut", { comment });
                }}
              />
            ) : basket?.products && restoran.restaurant != undefined ? (
              <LargeButton
                title="Vazhdo"
                onPress={() => {
                  navigation.navigate("CheckOut", { comment });
                }}
              />
            ) : basket?.typedProducts && restoran.restaurant != undefined ? (
              <LargeButton
                title="Vazhdo"
                onPress={() => {
                  navigation.navigate("CheckOut", { comment });
                }}
              />
            ) : (
              <LargeButton
                title="Vazhdo"
                onPress={() => {
                  Alert.alert(
                    "Mesazhi",
                    "Ju lutem shtoni produkte në shportë dhe zgjedhni marketin ose restauranin",
                    [{ text: "Në rregull" }]
                  );
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
