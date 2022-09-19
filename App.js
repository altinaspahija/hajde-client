import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen'
import {
  Platform,
  LogBox
} from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { Settings } from "react-native-fbsdk-next";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import axios from "axios";
import apiURL from './src/authentification/apiConstant'
import AppStack from './src/App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { getVersion } from 'react-native-device-info';
const SplashStack = createStackNavigator()


const fetchFont = () => {
  return Font.loadAsync({
    "Avenire-Regular": require("./src/assets/fonts/Avenir-Roman.ttf"),
    "Avenire-Bold": require("./src/assets/fonts/FontsFree-Net-AvenirLTStd-Heavy.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Montserrat-Italic": require("./src/assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-Light": require("./src/assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-LightItalic": require("./src/assets/fonts/Montserrat-LightItalic.ttf"),
    "Montserrat-Medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-SemiBoldItalic": require("./src/assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    "Montserrat-Bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-BoldItalic": require("./src/assets/fonts/Montserrat-BoldItalic.ttf"),
    "Montserrat-ExtraBold": require("./src/assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtraBoldItalic": require("./src/assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
  });
};


LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App(navigation) {

  const [showSplash, setShowSplash] = useState(true)
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hideSplashScreen, setHideSplashScreen] = useState(false)
  const [data, setData] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState()
  Settings.initializeSDK();

  useEffect(async () => {
    controlAuthentication()
    try {
      const response = await axios.post(`${apiURL}/versioning/updated`, {
        os: Platform.OS,
        version: getVersion(),
        platform: "hajdeapp",
      });
      setData(response?.data?.isUpToDate);
    } catch (err) {

    }
    SplashScreen.hide();
    setHideSplashScreen(true)

  }, [])

  const controlAuthentication = async () => {
    let checkIfIsAuthenticated = await AsyncStorage.getItem('@TOKEN')
    if (checkIfIsAuthenticated) {
      setIsAuthenticated(true)
    }
    else {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    if (hideSplashScreen) {
      setTimeout(
        () => setShowSplash(false),
        5400
      );
    }
  }, [hideSplashScreen])

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={() => console.log("Error")}
        onFinish={() => {
          setFontsLoaded(true);
        }}
      />
    );
  }

  const onMessageReceived = (notification) => {
    console.log(notification,'notification here')
    PushNotification.localNotification({
      message: notification?.notification?.body,
      title: notification?.notification?.title,
    });

  };
  
  messaging().onMessage(onMessageReceived);

  onOpenNofitication = async (notification) => {
    if (notification) {
        Alert.alert('Opened push notification', JSON.stringify(notification));
      }
  };

  return (
    <AppStack
      data={data}
      showSplash={showSplash}
      isAuthenticated={isAuthenticated}/>
  );
};


