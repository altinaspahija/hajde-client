import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
  Keyboard,
} from "react-native";
import { FormInput, CustomToast } from "@/components";
import { Container } from "@/containers";
import { useTheme } from "@/hooks";
import axios from "axios";
import apiURL from "@/authentification/apiConstant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Messaging from "@/screens/Messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useLazyFetchAddressOneQuery } from "@/services/modules/address"; // Import the query
import { CommonActions } from "@react-navigation/native";

// #region Validations
const items = [
  { label: "+355", value: "+355" },
  { label: "+383", value: "+383" },
];
// #endregion

export default function Login({ navigation }) {
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [validPassword, setPasswordValid] = useState(true);
  const [validPhone, setUsernameValid] = useState(true);
  const [maxLength, setMaxLength] = useState(9);
  let passwordInput = useRef(null);
  let phoneInput = useRef(null);

  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  let [prefix, setPrefix] = React.useState("+355");

  const { Common, Images, Layout, Colors } = useTheme();
  const { login } = Common;
  const signup = () => {
    LayoutAnimation.easeInEaseOut();
    const usernameValid = validatePhone();
    const passwordValid = validatePassword();
    if (passwordValid && usernameValid) {
      setLoading(true);
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        LoginAuthorization();
      }, 1500);
    }
  };

  const validatePhone = () => {
    const phoneCheck = phone.length > 0;
    LayoutAnimation.easeInEaseOut();
    setUsernameValid(phoneCheck);
    phoneCheck || phoneInput.shake();
    return phoneCheck;
  };

  const validatePassword = () => {
    const passwordCheck = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    setPasswordValid(passwordCheck);
    passwordCheck || passwordInput.shake();
    return passwordCheck;
  };

  const [
    fetchAddressOne,
    { data: dataApi, isSuccess, isFetching, error: errorApi },
  ] = useLazyFetchAddressOneQuery(); // use the query

  const getData = () => {
    fetchAddressOne();
  };

  const LoginAuthorization = async () => {
    try {
      const response = await axios.post(`${apiURL}/client/auth/login`, {
        phone: prefix + phone,
        password: password,
      });
      const { refreshToken, token, hasLocation } = response.data;
      await AsyncStorage.setItem("@TOKEN", token);
      await AsyncStorage.setItem("@REFRESH_TOKEN", refreshToken);
      if (hasLocation) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Homepage" }],
          }),
        );
      } else {
        navigation.navigate("Intro", {
          country: prefix === "+383" ? "Kosovë" : "Shqipëri",
          city: prefix === "+383" ? "Prishtinë" : "Tiranë",
        });
      }
    } catch (err) {
      if (err?.response?.status === 403) {
        await sendSMS();
      } else {
        Toast.show({
          type: "error",
          text1: err?.response?.data?.message,
          props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d71" },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const sendSMS = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/verification/send-verification-phone-code`,
        {
          phone: prefix + phone,
        },
      );
      const register = true;
      navigation.navigate("CodeVerification", { phone, prefix, register });
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  const hasNotifications = async () => {
    try {
      const hasNotificationsPermissions =
        await Messaging.requestUserPermission();
      if (hasNotificationsPermissions) {
        await Messaging.saveFcmTokenToDb();
        await Messaging.onRefreshToken();
      }
    } catch (err) {}
  };
  const changePickerValue = () => {
    if (prefix === "+383") {
      setPrefix("+355");
      setMaxLength(9);
    } else {
      setPrefix("+383");
      setMaxLength(8);
    }
    Toast.show({
      type: "info",
      text1:
        prefix !== "+383"
          ? " Prefix është për Kosove"
          : "Prefix është për Shqipëri",
      props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70" },
    });
  };
  useEffect(() => {
    hasNotifications();
  }, []);

  return (
    <>
      <Container
        onPress={() => signup()}
        isLoading={isLoading}
        back={() => navigation.pop()}
      >
        <View style={[login.autoFill, Layout.row]}>
          <FormInput
            refInput={(input) => (phoneInput = input)}
            keyboardType="phone-pad"
            value={phone}
            maxLength={maxLength}
            onChangeText={(text) => setPhone(text)}
            placeholder="Numri i telefonit"
            inputStyle={{ marginRight: 55 }}
            returnKeyType="next"
            errorMessage={
              validPhone ? "" : "Ju lutem shkruani numrin e telefonit!"
            }
            onSubmitEditing={() => {
              validatePhone();
              passwordInput.focus();
            }}
            leftIcon={
              <TouchableOpacity
                style={login.picker}
                onPress={changePickerValue}
              >
                <Text style={login.inputPrefix}>{prefix}</Text>
              </TouchableOpacity>
            }
          />
        </View>
        <FormInput
          refInput={(input) => (passwordInput = input)}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Fjalëkalimi"
          inputStyle={{ marginLeft: 25 }}
          returnKeyType="done"
          secureTextEntry={visible}
          errorMessage={
            validPassword
              ? ""
              : "Fjalëkalimi duhet të jetë minimum 8 karaktere!"
          }
          onSubmitEditing={() => {
            validatePassword();
            signup();
            Keyboard.dismiss();
          }}
          rightIcon={
            <TouchableOpacity
              style={global.eyeIcon}
              onPress={() => {
                setVisible(!visible);
                setShow(!show);
              }}
            >
              <MaterialCommunityIcons
                name={show === false ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          }
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ChangePassword", { prefix, phone })
          }
        >
          <Text style={login.forgot_button}>Keni harruar fjalëkalimin?</Text>
        </TouchableOpacity>
      </Container>

      <CustomToast />
    </>
  );
}
