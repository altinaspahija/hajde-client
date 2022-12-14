//External dependencies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { Header } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
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

export default function Produkti({ navigation, route }) {
  const { item, u } = route?.params;
  const id = item?._id;
  const [num, setNum] = useState("");
  const [data, setData] = useState([]);
  const [saved, setSaved] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const OrdersWithAxios = async () => {
    const response = await axiosApiInstance.get(
      `/products/get-product-info/${item._id}`
    );
    setData(response.data);
    setSaved(response.data.isSaved);
    setNum(response.data.quantity);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      OrdersWithAxios()
        .then((data) => { })
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
    try {
      if (num === 0) {
        Alert.alert("Mesazhi", "Ju lutem zgjedhni sasinë", [
          { text: "Në rregull" },
        ]);
      } else {
        const response = await axiosApiInstance.post(`/basket/add-to-basket`, {
          productId: id,
          quantity: num,
          orderType: "market",
          clearBasket
        });
        Alert.alert("Mesazhi", response?.data?.message, [
          {
            text: "Në rregull",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (err) {
      errorResponse(err, id)
    }
  }
  const errorResponse = (err, _id) => {
    Alert.alert(
      "Info",
      err?.message,
      [
        {
          text: "Po",
          onPress: async () => {
            await onSubmit({clearBasket: true}).then(() => data.find(item => item._id === _id).quantity = 1);
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
        `/favorites/save-product/${item._id}`
      );
      if (response.data) {
        setSaved(
          <AntDesign
            name="star"
            size={26}
            color={buttonColor}
            style={{ width: 30 }}
          />
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
      <Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
        }}
        placement="center"
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
      // rightComponent={
      //   <View style={styles.savedImg}>
      //     {saved ? (
      //       <TouchableOpacity disabled={true}>
      //         <AntDesign
      //           name="star"
      //           size={26}
      //           color={buttonColor}
      //           style={{ width: 30 }}
      //         />
      //       </TouchableOpacity>
      //     ) : (
      //       <TouchableOpacity onPress={() => onSave()}>
      //         <AntDesign
      //           name="staro"
      //           size={26}
      //           color={buttonColor}
      //           style={{ width: 30 }}
      //         />
      //       </TouchableOpacity>
      //     )}
      //   </View>
      // }
      />
      <View style={styles.container}>
        <View style={styles.productContainer}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image style={styles.img} source={{ uri: item.imageURL }} />
          </Pressable>

          <Text style={styles.name}>{data.name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.desContainer}>
            <Text style={styles.desTitle}>Përshkrimi</Text>
            <Text style={styles.des}>{data.description}</Text>
          </View>
          <View style={styles.unitContainer}>
            <Text style={styles.desTitle}>Njësia</Text>
            <Text style={styles.des}>{data.unit}</Text>
          </View>
          <View style={styles.unitContainer}>
            <Text style={styles.desTitle}>Çmimi</Text>
            <Text style={styles.des}>
              {data.price} {data.currency}
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.itemContainer}>
            <DecrementButton
              iconColor={'white'}
              style={styles.button}
              onPress={decNum}
            />
            <Text style={styles.number}>{num}</Text>
            <QuickButton title="Add" onPress={incNum}
              style={styles.button}
              iconColor={'white'}
            />
          </View>
          <LargeButton title="Shto në shportë" onPress={onSubmit} />
        </View>
      </View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles1.centeredView}>
            <Pressable
              style={styles1.pressable}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <EvilIcons name="close-o" size={43} color="black" />
            </Pressable>
            <View style={styles1.modalView}>
              <Image style={styles1.image} source={{ uri: item.imageURL }} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )

  // return (
  //   <View style={global.container}>
  //     <StatusBar backgroundColor="transparent" />
  //     <Header
  //       containerStyle={{
  //         backgroundColor: "transparent",
  //         borderBottomColor: "transparent",
  //       }}
  //       placement="center"
  //       leftComponent={<BackButton onPress={() => navigation.goBack()} />}
  //       rightComponent={
  //         <View style={styles.savedImg}>
  //           {saved ? (
  //             <TouchableOpacity disabled={true}>
  //               <AntDesign
  //                 name="star"
  //                 size={26}
  //                 color={buttonColor}
  //                 style={{ width: 30 }}
  //               />
  //             </TouchableOpacity>
  //           ) : (
  //             <TouchableOpacity onPress={() => onSave()}>
  //               <AntDesign
  //                 name="staro"
  //                 size={26}
  //                 color={buttonColor}
  //                 style={{ width: 30 }}
  //               />
  //             </TouchableOpacity>
  //           )}
  //         </View>
  //       }
  //     />
  //     <View style={styles.container}>
  //       <View style={styles.productContainer}>
  //         <Pressable onPress={() => setModalVisible(true)}>
  //           <Image style={styles.img} source={{ uri: item.imageURL }} />
  //         </Pressable>

  //         <Text style={styles.name}>{data.name}</Text>
  //       </View>
  //       <View style={styles.descriptionContainer}>
  //         <View style={styles.desContainer}>
  //           <Text style={styles.desTitle}>Përshkrimi</Text>
  //           <Text style={styles.des}>{data.description}</Text>
  //         </View>
  //         <View style={styles.unitContainer}>
  //           <Text style={styles.desTitle}>Njësia</Text>
  //           <Text style={styles.des}>{data.unit}</Text>
  //         </View>
  //         <View style={styles.unitContainer}>
  //           <Text style={styles.desTitle}>Çmimi</Text>
  //           <Text style={styles.des}>
  //             {data.price} {data.currency}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={styles.bottomContainer}>
  //         <View style={styles.itemContainer}>
  //           <QuickButton onPress={incNum} />
  //           <Text style={styles.number}>{num}</Text>
  //           <DecrementButton onPress={decNum} />
  //         </View>
  //         <LargeButton title="Shto në shportë" onPress={onSubmit} />
  //       </View>
  //     </View>
  //     <View>
  //       <Modal
  //         style={{ backgroundColor: "pink" }}
  //         animationType="fade"
  //         transparent={true}
  //         visible={modalVisible}
  //         onRequestClose={() => {
  //           setModalVisible(!modalVisible);
  //         }}
  //       >
  //         <View style={styles1.centeredView}>
  //           <Pressable
  //             style={{ position: "absolute", top: 54, right: 28, zIndex: 1 }}
  //             onPress={() => setModalVisible(!modalVisible)}
  //           >
  //             <EvilIcons name="close-o" size={43} color="black" />
  //           </Pressable>
  //           <View style={styles1.modalView}>
  //             <Image
  //               style={{ height: "100%", width: "100%" }}
  //               source={{ uri: item.imageURL }}
  //             />
  //           </View>
  //         </View>
  //       </Modal>
  //     </View>
  //   </View>
  // );
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
    // borderRadius: 20,
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
});
