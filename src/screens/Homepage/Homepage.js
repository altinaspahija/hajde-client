//External dependencies
import React, { useEffect, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
// Internal dependencies
import styles from "./styles";
import { Circle } from "../../components/Button/Button";
import axiosApiInstance from "../../authentification/request/request";
import Messaging from "../Messaging";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const Gift = require('../../assets/testGif.gif')
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default function Homepage({ navigation }) {
  const [notifications, setNotifications] = useState();
  const [onClickOpenGift, setClickOpenGift] = useState(false)
  const [openedGift, setOpenedGift] = useState()
  const getNotifications = async () => {
    try {
      const response = await axiosApiInstance.get(`/notifications/unread-count`);
      setNotifications(response.data);
    }
    catch (err) {
      navigation.navigate("Login")
    }

  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotifications();
    });
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
        let userId = response.data._id
        fcmMessaging = await Messaging.saveFcmTokenToDb({ userId });
        fcmRefresh = await Messaging.onRefreshToken();
      }
    } catch (err) {
      console.log(err, "error:::::");
    }
  };
  useEffect(async () => {
    let isGiftOppend = AsyncStorage.getItem('Gift')
    setOpenedGift(isGiftOppend)
    hasNotifications();
  }, []);

  useEffect(() => {
    if (onClickOpenGift) {
      setTimeout(
        () => setClickOpenGift(false),
        2650
      )
    }

  }, [onClickOpenGift])


  const onClickSearch = () => {
    navigation.navigate("HomepageSearch")
  }

  const onClickGiftImg = async () => {
    setClickOpenGift(true)
    await AsyncStorage.setItem("Gift", true)
    setOpenedGift(true)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>

        <View style={styles.container}>
          {notifications?.count === 0 ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
              style={{ position: "absolute", right: 40, top: 60 }}
            >
              <MaterialIcons name="notifications" size={30} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
              style={{ position: "absolute", right: 40, top: 60 }}
            >
              <View style={{ position: "absolute", bottom: 25, left: 20 }}>
                <Badge status="error" value={notifications?.count} />
              </View>
              <MaterialIcons name="notifications" size={30} color="white" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={onClickSearch}
            style={{
              backgroundColor: "white",
              display: 'flex',
              flexDirection: "row",
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
              padding: 10,
              borderRadius: 5,
              marginVertical: 15
            }} >
            <Text style={{ color: "grey" }}>Çfarë ju duhet?</Text>
            <AntDesign name="search1" size={20} color="grey" />
          </TouchableOpacity>


          {/* <HomepageSearch /> */}

          <View style={styles.buttonsContainer}>
            <Circle
              img={require("../../assets/images/marketet.png")}
              title="Marketet"
              onPress={() => navigation.navigate("Marketet")}
            />

            <View style={styles.buttonButtos}>
              <View style={styles.shopping}>
                <Circle
                  style={styles.image}
                  img={require("../../assets/images/Shopping_List_Homepage.png")}
                  title="Shporta"
                  onPress={() => navigation.navigate("Shporta")}
                />
              </View>
              <View style={styles.recepies}>
                <Circle
                  img={require("../../assets/images/restoran.png")}
                  title="Restorantet"
                  onPress={() => navigation.navigate("Restauranet")}
                />
              </View>
            </View>
            <View style={styles.recepies}>
              <Circle
                img={require("../../assets/images/Recipes_Homepage.png")}
                title="Recetat"
                onPress={() => navigation.navigate("Recetat")}
              />
            </View>
          </View>
          {/* <View style={{ paddingBottom: 20, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
            {onClickOpenGift ?
              <Image source={Gift} style={{ width: 150, height: 150 }} resizeMode='contain' />
              : <TouchableOpacity onPress={onClickGiftImg}>
                <Image source={require('../../assets/gift-img.png')} style={{ width: 150, height: 150 }} resizeMode='contain' />
              </TouchableOpacity>
            }
            <View style={{ flexDirection: 'column', height: 150, paddingTop: 20, justifyContent: 'center' }}>
              {openedGift ? <>
                <Text style={{ color: 'white', fontSize: 20 }}>Hape</Text>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Dhuratën!</Text>
              </>
                :
                <>
                  <Text style={{ color: 'white', fontSize: 20 }}>Fitove</Text>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Free</Text>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Delivery!</Text>
                </>}
            </View>
          </View> */}
        </View>
      </>
    </TouchableWithoutFeedback>
  );
}
