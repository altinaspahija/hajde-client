import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, StyleSheet, View, ViewBase } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Host, Portal } from "react-native-portalize";
// import * as Font from "expo-font";

import { buttonColor, primary } from "../styles/global";
import Adresat from "../screens/Profili/Adresat";
import ChooseDefaultMArket from "../screens/Marketet/ChooseDefaultMarket";
import CheckOut from "../screens/CheckOut/CheckOut";

import Login from "@/containers/Auth/LoginContainer";
import Launch from "@/containers/Auth/LaunchContainer";
import Register from "@/containers/Auth/RegisterContainer";
import Marketet from "../screens/Marketet/Marketet";
import Profili from "../screens/Profili/Profili";
import Porosia from "../screens/Porosia/Porosia";
import ShoppingDetails from "../screens/ShoppingDetails/ShoppingDetails";
import Saved from "../screens/Saved/Saved";
import Homepage from "@/containers/Home/HomeContainer";
import Porosite from "../screens/Porosite/Porosite";
import Produkti from "../screens/Produkti/Produkti";
import Recetat from "../screens/Recetat/Recetat";
import ShtoProdukt from "../screens/Porosia/ShtoProdukt";
import ProduktiShporta from "../screens/ProduktiShporta/ProduktiShporta";
import { MarketContext, RestoranContext } from "../../MarketContext";
import SavedMarketet from "../screens/SavedMarketet/SavedMarketet";
import SavedProduktet from "../screens/SavedProduktet/SavedProduktet";
import CheckoutDuplicate from "../screens/CheckoutDuplicate/CheckoutDuplicate";
import PorosiaDuplicate from "../screens/PorosiaDuplicate/PorosiaDuplicate";
import Kategorite from "../screens/Kategorite/Kategorite";
import Nenkategorite from "../screens/Nenkategorite/Nenkategorite";
import FreeType from "../components/FreeType/FreeType";
import SetMarket from "../screens/Marketet/SetMarket";
import KategoriteListaIme from "../screens/Kategorite/KategoriteListaIme";
import NenkategoriteListaIme from "../screens/Nenkategorite/NenkategoriteListaIme";
import ChangePassword from "@/containers/Auth/ForgotPasswordContainer";
import CodeVerification from "@/containers/Auth/CodeVerificationContainer";
import NewPassword from "@/containers/Auth/ChangePasswordContainer";
import CodeVerificationRegister from "../screens/CodeVerificationRegister/CodeVerificationRegister";
import Version from "../screens/Version/Version";
import RestauranetProduktet from "../screens/RestauranetProduktet/RestauranetProduktet";
import TeGjitha from "../screens/TeGjitha/TeGjitha";
import ZgjedhOpsionin from "../screens/ZgjedhOpsionin/ZgjedhOpsionin";
import RestoranInfo from "../screens/RestoranInfo/RestoranInfo";
import SetRestoran from "../screens/Restauranet/setRestoran";
import RestoranKategoriaIme from "../screens/RestauranetProduktet/RestoranKategoriaIme";
import Notifications from "../screens/Notifications/Notifications";
import HomepageSearch from "../screens/Homepage/HomepageSearch";
import Splash from "../screens/Splash/Splash";
import { NoContentScreen, Order } from "@/screens";
import {
  RestaurantContainer,
  MarketContainer,
  SubCategoriesContainer,
  SubCategoryContainer,
  IntroContainer,
  AddressContainer,
  MarketDetailsContainer,
  FastMarketContainer,
  OrdersContainer,
  ShoppingCartContainer,
  OrderDetailsContainer,
  RestaurantProductsContainer,
} from "@/containers";

import { vs } from "react-native-size-matters";
import { useTheme } from "@/hooks";
import { StatusBar } from "expo-status-bar";
import Historiku from "@/screens/Historiku/Historiku";
import Config from "react-native-config";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SplashStack = createStackNavigator();
const AuthenticationStack = createStackNavigator();
const MainStack = createStackNavigator();

const BORDER_RADIUS = vs(32);
const TABBAR_HEIGHT = vs(46);
const styles = StyleSheet.create({
  tabBarStyle: {
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    padding: 4,
    position: "absolute",
    ...Platform.select({
      ios: { bottom: vs(20) },
      android: { bottom: vs(7) },
      default: { bottom: vs(37) },
    }),
    borderRadius: BORDER_RADIUS,
    height: TABBAR_HEIGHT,
    // shadow is handled differently for iOS and Android
    // for iOS
    shadowOffset: {
      // width: 5,
      // height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    // for Android
    elevation: 5,
  },
  tabBarItemStyle: {
    height: TABBAR_HEIGHT,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  badgeCounter: {
    width: 10,
    height: 10,
    borderRadius: BORDER_RADIUS,
    zIndex: 10,
    position: "absolute",
    top: 12,
    right: 18,
  },
  leftTabbarIcon: {
    marginStart: 12,
  },
  rightTabbarIcon: {
    marginEnd: 8,
  },
  cartIconContainer: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  cartIconTouchable: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
  },
});

function MainTabNavigator() {
  const { Images } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: buttonColor,
        tabBarInactiveTintColor: "#111",
      }}
      initialRouteName="Homepage"
      backBehavior="none"
    >
      <Tab.Screen
        key="Orders"
        name="Porositë"
        component={OrdersContainer}
        //component={Historiku}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {!focused ? (
                <Image
                  style={{ height: 18, width: 18 }}
                  resizeMode={"contain"}
                  source={Images.orderIcon}
                />
              ) : (
                <Image
                  style={{ height: 20, width: 20 }}
                  resizeMode={"contain"}
                  source={Images.orderIconActive}
                />
              )}
            </>
          ),
        }}
      />

      <Tab.Screen
        name="Të preferuarat"
        component={Saved}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {!focused ? (
                <Image
                  style={{ height: 18, width: 18 }}
                  resizeMode={"contain"}
                  source={Images.favoriteIcon}
                />
              ) : (
                <Image
                  style={{ height: 20, width: 20 }}
                  resizeMode={"contain"}
                  source={Images.favoriteIconActive}
                />
              )}
            </>
          ),
        }}
      />

      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarLabel: () => null,
          activeTintColor: buttonColor,
          tabBarIcon: () => (
            <View style={{}}>
              <Image
                source={Images.birdStampIcon}
                style={{ width: 45, height: "100%", resizeMode: "contain" }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Shporta"
        // component={Porosia}
        component={ShoppingCartContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {!focused ? (
                <Image
                  style={{ height: 20, width: 20 }}
                  resizeMode={"contain"}
                  source={Images.shportaIcon}
                />
              ) : (
                <Image
                  style={{ height: 22, width: 22 }}
                  resizeMode={"contain"}
                  source={Images.shportaIconActive}
                />
              )}
            </>
          ),
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name="Profili"
        component={Profili}
        options={{
          activeTintColor: buttonColor,
          tabBarIcon: ({ focused }) => (
            <>
              {!focused ? (
                <Image
                  style={{ height: 18, width: 18 }}
                  resizeMode={"contain"}
                  source={Images.profileIcon}
                />
              ) : (
                <Image
                  style={{ height: 22, width: 22 }}
                  resizeMode={"contain"}
                  source={Images.profileIconActive}
                />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function SplashStackScreen() {
  return (
    <SplashStack.Navigator
      screenOptions={{ headerTintColor: "#000", headerShown: false }}
    >
      <SplashStack.Screen
        name="Splash"
        component={Splash}
        options={{ title: "Splash", headerShown: false }}
      />
    </SplashStack.Navigator>
  );
}

function MainStackScreen(props) {
  return (
    <MainStack.Navigator
      headerShown={false}
      screenOptions={{ headerTintColor: "#000", headerShown: true }}
    >
      {!props.isAuthenticated && (
        <>
          <MainStack.Screen
            name="Launch"
            component={Launch}
            options={{ title: "Launch", headerShown: false }}
          />
          <MainStack.Screen
            name="Intro"
            component={IntroContainer}
            options={{ title: "Intro", headerShown: false }}
          />
          <MainStack.Screen
            name="Address"
            component={AddressContainer}
            options={{ title: "Intro", headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login", headerShown: false }}
          />
          <MainStack.Screen
            name="Register"
            component={Register}
            options={{ title: "Register", headerShown: false }}
          />
          <MainStack.Screen
            name="CodeVerification"
            component={CodeVerification}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="CodeVerificationRegister"
            component={CodeVerificationRegister}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
        </>
      )}
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Homepage"
        component={MainTabNavigator}
      />

      <MainStack.Screen
        options={{ headerShown: false }}
        name="HomepageSearch"
        component={HomepageSearch}
      />

      <MainStack.Screen
        name="Porosite"
        component={Porosite}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Marketet"
        component={MarketContainer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ZgjedhOpsionin"
        component={ZgjedhOpsionin}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Shporta"
        // component={Porosia}
        component={ShoppingCartContainer}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <MainStack.Screen
        name="PorosiaDuplicate"
        component={PorosiaDuplicate}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ShtoProdukt"
        component={ShtoProdukt}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="FreeType"
        component={FreeType}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ShoppingDetails"
        component={ShoppingDetails}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="OrderDetailsContainer"
        component={OrderDetailsContainer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="CheckOut"
        component={CheckOut}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="CheckoutDuplicate"
        component={CheckoutDuplicate}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Produkti"
        component={Produkti}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="RestoranInfo"
        component={RestoranInfo}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ProduktiShporta"
        component={ProduktiShporta}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Recetat"
        component={Recetat}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="RestauranetProduktet"
        // component={RestauranetProduktet}
        component={RestaurantProductsContainer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Restauranet"
        component={RestaurantContainer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="TeGjitha"
        component={TeGjitha}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ChooseDefaultMarket"
        component={ChooseDefaultMArket}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SetMarket"
        component={SetMarket}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SetRestoran"
        component={SetRestoran}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Adresat"
        component={Adresat}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SavedMarketet"
        component={SavedMarketet}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SavedProduktet"
        component={SavedProduktet}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="MarketDetails"
        component={MarketDetailsContainer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="FastMarket"
        component={FastMarketContainer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Nenkategorite"
        component={SubCategoryContainer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="KategoriteListaIme"
        component={SubCategoriesContainer}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="NenkategoriteListaIme"
        component={NenkategoriteListaIme}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Version"
        component={Version}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="RestoranKategoriaIme"
        component={RestoranKategoriaIme}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="NoContent"
        component={NoContentScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
      {props.isAuthenticated && (
        <>
          <MainStack.Screen
            name="Launch"
            component={Launch}
            options={{ title: "Launch", headerShown: false }}
          />
          <MainStack.Screen
            name="Intro"
            component={IntroContainer}
            options={{ title: "Intro", headerShown: false }}
          />
          <MainStack.Screen
            name="Address"
            component={AddressContainer}
            options={{ title: "Intro", headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login", headerShown: false }}
          />
          <MainStack.Screen
            name="Register"
            component={Register}
            options={{ title: "Register", headerShown: false }}
          />
          <MainStack.Screen
            name="CodeVerification"
            component={CodeVerification}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="CodeVerificationRegister"
            component={CodeVerificationRegister}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </MainStack.Navigator>
  );
}

function NavigationStack(props) {
  let [defaultMarket, setDefaultMarket] = useState("");
  let [defaultRestoran, setDefaultRestoran] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState("");

  useEffect(async () => {
    controlAuthentication();
  }, []);

  const controlAuthentication = async () => {
    let checkIfIsAuthenticated = await AsyncStorage.getItem("@TOKEN");
    if (checkIfIsAuthenticated) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };
  return props.data === true && Config.ENV !== "DEVELOPMENT" ? (
    <Version />
  ) : (
    <>
      {props.showSplash ? (
        <NavigationContainer>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle="dark-content"
          />
          <SplashStackScreen />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Host>
            <MarketContext.Provider value={{ defaultMarket, setDefaultMarket }}>
              <RestoranContext.Provider
                value={{ defaultRestoran, setDefaultRestoran }}
              >
                <StatusBar
                  backgroundColor="transparent"
                  translucent={true}
                  barStyle="dark-content"
                />
                <MainStackScreen isAuthenticated={props.isAuthenticated} />
              </RestoranContext.Provider>
            </MarketContext.Provider>
          </Host>
        </NavigationContainer>
      )}
    </>
  );
}

export default NavigationStack;
