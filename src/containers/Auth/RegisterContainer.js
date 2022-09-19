import React, { useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import { FormInput, Space, CustomToast } from "@/components";
import { CustomContainer } from "@/containers";
import { useTheme } from "@/hooks";
import axios from "axios";
import apiURL from "@/authentification/apiConstant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppEventsLogger } from "react-native-fbsdk-next";
import Toast from "react-native-toast-message";

// #region Validations
const items = [
  { label: "+355", value: "+355" },
  { label: "+383", value: "+383" },
];
// #endregion

export default function RegisterContainer({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [validPassword, setPasswordValid] = useState(true);
  const [maxLength, setMaxLength] = useState(9);
  const [validConfirmationPassword, setConfirmationPasswordValid] =
    useState(true);

  const [validPhone, setPhoneValid] = useState(true);
  const [validName, setNameValid] = useState(true);
  const [validSurname, setSurnameValid] = useState(true);
  let passwordInput = useRef(null);

  let confirmationPasswordInput = useRef(null);
  let phoneInput = useRef(null);
  let nameInput = useRef(null);
  let surnameInput = useRef(null);

  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  let [prefix, setPrefix] = React.useState("+355");

  const { Common, Images, Layout, Colors } = useTheme();
  const { login } = Common;
  const signup = () => {
    LayoutAnimation.easeInEaseOut();
    const phoneValid = validatePhone();
    const nameValid = validateName();
    const surnameValid = validateSurname();
    const passwordValid = validatePassword();
    const confirmationPasswordValid = validateConfirmationPassword();
    if (
      passwordValid &&
      phoneValid &&
      nameValid &&
      surnameValid &&
      confirmationPasswordValid
    ) {
      setLoading(true);
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        RegisterForm();
      }, 1500);
    }
  };

  const validatePhone = () => {
    const phoneCheck = phone.length > 0;
    LayoutAnimation.easeInEaseOut();
    setPhoneValid(phoneCheck);
    phoneCheck || phoneInput.shake();
    return phoneCheck;
  };

  const validateName = () => {
    const nameCheck = name.length > 0;
    LayoutAnimation.easeInEaseOut();
    setNameValid(nameCheck);
    nameCheck || nameInput.shake();
    return nameCheck;
  };

  const validateSurname = () => {
    const surnameCheck = surname.length > 0;
    LayoutAnimation.easeInEaseOut();
    setSurnameValid(surnameCheck);
    surnameCheck || surnameInput.shake();
    return surnameCheck;
  };

  const validatePassword = () => {
    const passwordCheck = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    setPasswordValid(passwordCheck);
    passwordCheck || passwordInput.shake();
    return passwordCheck;
  };

  const validateConfirmationPassword = () => {
    const confirmationPasswordCheck = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    setConfirmationPasswordValid(confirmationPasswordCheck);
    confirmationPasswordCheck || confirmationPasswordInput.shake();
    return confirmationPasswordCheck;
  };

  const RegisterForm = async () => {
    try {
      const response = await axios.post(`${apiURL}/client/auth/register`, {
        firstName: name,
        lastName: surname,
        phone: prefix + phone,
        password: password,
      });
      Alert.alert("Mesazhi", "Llogaria u regjistrua me sukses", [
        {
          text: "Në rregull",
          onPress: await sendSMS(),
        },
      ]);
      AppEventsLogger.logEvent("user_registered", { registerdate: "test 123" });
    } catch (err) {
      Alert.alert("Mesazhi", err.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
    finally{
      setLoading(false);
    }
  };
  const sendSMS = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/verification/send-verification-phone-code`,
        {
          phone: prefix + phone,
        }
      );
      const register = true;
      navigation.navigate("CodeVerification", { phone, prefix, register });
    } catch (err) {
      Alert.alert("Mesazhi", err?.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    }
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
    });
  };
  return (
    <>
    <CustomContainer back={() => navigation.pop()}>
      <View style={Layout.fill}>
        <View style={Layout.alignItemsCenter}>
          <View style={[Layout.colCenter, login.imageContainerRegister]}>
            <Image
              style={login.image}
              resizeMode={"contain"}
              source={Images.hajdeStamp}
            />
          </View>
        </View>
        <View style={[Layout.fill, Layout.alignItemsCenter, login.autoFill70]}>
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
                nameInput.focus();
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
            refInput={(input) => (nameInput = input)}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Emri"
            returnKeyType="next"
            errorMessage={validName ? "" : "Ju lutem shkruani emrin!"}
            onSubmitEditing={() => {
              validateName();
              surnameInput.focus();
            }}
          />
          <FormInput
            refInput={(input) => (surnameInput = input)}
            value={surname}
            onChangeText={(text) => setSurname(text)}
            placeholder="Mbiemri"
            returnKeyType="next"
            errorMessage={validSurname ? "" : "Ju lutem shkruani mbiemrin!"}
            onSubmitEditing={() => {
              validateSurname();
              passwordInput.focus();
            }}
          />
          <FormInput
            refInput={(input) => (passwordInput = input)}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Fjalëkalimi"
            inputStyle={{ marginLeft: 25 }}
            returnKeyType="next"
            secureTextEntry={visible}
            errorMessage={
              validPassword ? "" : "Fjalëkalimi duhet të jetë minimum 8 karaktere!"
            }
            onSubmitEditing={() => {
              validatePassword();
              confirmationPasswordInput.focus();
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
          <FormInput
            refInput={(input) => (confirmationPasswordInput = input)}
            icon="lock"
            value={confirmationPassword}
            onChangeText={(text) => setConfirmationPassword(text)}
            placeholder="Përsërit fjalëkalimin"
            inputStyle={{ marginLeft: 25 }}
            secureTextEntry={visible}
            errorMessage={
              validConfirmationPassword
                ? ""
                : "Fushat e fjalëkalimit nuk janë identike"
            }
            returnKeyType="done"
            onSubmitEditing={() => {
              validateConfirmationPassword();
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
          <Space value={10} />
          {!isLoading ? (
            <TouchableOpacity
              style={login.loginBtn}
              onPress={() => {
                signup();
              }}
            >
              <Image
                style={Layout.fullSize}
                resizeMode="contain"
                source={Images.loginButton}
              />
            </TouchableOpacity>
          ) : (
            <View style={login.loginBtn}>
              <ActivityIndicator
                animating
                size="large"
                color={Colors.inputBackground}
              />
            </View>
          )}
        </View>
      </View>
    </CustomContainer>

    <CustomToast />
    </>
  );
}
