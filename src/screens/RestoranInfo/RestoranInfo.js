//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Header } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
// Internal dependencies
import styles from "./styles";
import global, { buttonColor } from "../../styles/global";
import {
  BackButton,
  DecrementButton,
  LargeButton,
  QuickButton,
} from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import { useTheme } from "@/hooks";

export default function RestoranInfo({ navigation, route }) {
  const item = route?.params?.item;
  const id = item?._id;
  const [num, setNum] = useState(0);
  const [data, setData] = useState([]);
  const [saved, setSaved] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { Common, Layout, Gutters } = useTheme();

  const OrdersWithAxios = async () => {
    const response = await axiosApiInstance.get(
      `/menus/get-menu-info/${item._id}`,
    );
    setData(response.data);
    setSaved(response.data.isSaved);
    setNum(response.data.quantity);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      OrdersWithAxios()
        .then((data) => {})
        .catch((err) => {
          Alert.alert("Mesazhi", err?.response?.data?.message, [
            { text: "Në rregull" },
          ]);
        });
    });
    return unsubscribe;
  }, [navigation]);

  const incNum = () => {
    setNum(num + 1);
  };

  const decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    } else {
      setNum(0);
    }
  };

  const onSubmit = async ({clearBasket = false}) => {
    if (num === 0) {
      Alert.alert("Mesazhi", "Ju lutem zgjedhni sasinë", [
        { text: "Në rregull" },
      ]);
    } else {
      try {
        const response = await axiosApiInstance.post(`/basket/add-to-basket`, {
          productId: id,
          quantity: num,
          orderType: "restaurant",
          clearBasket
        });
        Alert.alert("Mesazhi", response?.data?.message, [
          {
            text: "Në rregull",
            onPress: () => navigation.goBack(),
          },
        ]);
      } catch (error) {
        errorResponse(error, id, num)
      }
    }
  };
  
  const errorResponse = (error, id, quantity) =>{
    Alert.alert(
      "Info",
      error?.message,
      [
        {
          text: "Po",
          onPress: async () => {
            await onSubmit({clearBasket: true}).then(() => data.find(item => item._id === id).quantity = 1);
          }
        },
        {
          text: "Jo",
          onPress: () => null,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  const onSave = async () => {
    try {
      const response = await axiosApiInstance.post(
        `/favorites/save-product/${item._id}`,
      );
      if (response.data) {
        setSaved(
          <AntDesign
            name="star"
            size={26}
            color={buttonColor}
            style={{ width: 30 }}
          />,
        );
      }
      Alert.alert("Mesazhi", response?.data?.message, [
        {
          text: "Në rregull",
        },
      ]);
    } catch (err) {
      Alert.alert("Mesazhi", err.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };

  return (
    <View style={global.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.img}
        source={{ uri: item.imageURL }}
      >
        <View style={Layout.fill}>
          <Header
            statusBarProps={{
              barStyle: "dark-content",
              translucent: true,
              backgroundColor: "transparent",
            }}
            containerStyle={{
              paddingTop: 0,
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
            }}
            placement="center"
            leftComponent={<BackButton onPress={() => navigation.goBack()} />}
          />
        </View>
        <View
          style={[
            Layout.fill20,
            {
              height: 30,
              backgroundColor: "#fff",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              shadowColor: "black",
              shadowOpacity: 0.25,
              shadowRadius: 1.5,

              shadowOffset: { width: 0, height: -3 },
              // for Android
              elevation: 1,
            },
          ]}
        ></View>
      </ImageBackground>
      <ScrollView contentContainerStyle={[Layout.fill, Gutters.mediumBPadding]}>
        <View style={styles.descriptionContainer}>
          <View style={styles.desContainer}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.des}>{data.description}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.itemContainer}>
            <DecrementButton
              iconColor={"white"}
              style={styles.button}
              onPress={decNum}
            />
            <Text style={styles.number}>{num}</Text>
            <QuickButton
              title="Add"
              onPress={incNum}
              style={styles.button}
              iconColor={"white"}
            />
          </View>
          <LargeButton
            width={"90%"}
            title="Shto në shportë"
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ececec",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    width: "100%",
    height: "50%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
