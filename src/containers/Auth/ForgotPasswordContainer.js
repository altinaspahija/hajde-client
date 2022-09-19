import React, { createRef, useState } from "react";
import { Text, LayoutAnimation, TouchableOpacity } from "react-native";
import { CustomToast, FormInput } from "@/components";
import { Container } from "@/containers";
import { useTheme } from "@/hooks";
import axios from "axios";
import apiURL from "@/authentification/apiConstant";
import Toast from "react-native-toast-message";

// #region Validations
// #endregion

export default function Login({ navigation, route }) {
  const lastPrefix = route?.params?.prefix;
  const lastPhone = route?.params?.phone;

  const [isLoading, setLoading] = useState(false);
  const [phone, setPhone] = useState(lastPhone);
  const [validPhone, setUsernameValid] = useState(true);
  const [ maxLength, setMaxLength ] = useState(9);
  let phoneInput = createRef();

  let [prefix, setPrefix] = useState(lastPrefix);

  const { Common } = useTheme();
  const { login } = Common;
  const signup = () => {
    LayoutAnimation.easeInEaseOut();
    if (validatePhone()) {
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

  const LoginAuthorization = async () => {
    try {
      const response = await axios.post(`${apiURL}/recovery/send-reset-phone`, {
        phone: `${prefix}${phone}`,
        client: "HajdeApp",
      });
      navigation.navigate("CodeVerification", { phone, prefix });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.message,
        props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d71" },
      });
    }
    finally{
      setLoading(false);
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
      props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70" },
    });
  };
  return (
    <>
      <Container
        onPress={() => signup()}
        isLoading={isLoading}
        back={() => navigation.pop()}
      >
        <FormInput
          refInput={(input) => (phoneInput = input)}
          keyboardType="phone-pad"
          value={phone}
          autoFocus={true}
          maxLength={maxLength}
          onChangeText={(text) => setPhone(text)}
          placeholder="Numri i telefonit"
          returnKeyType="next"
          errorMessage={
            validPhone ? "" : "Ju lutem shkruani numrin e telefonit!"
          }
          onSubmitEditing={() => {
            validatePhone();
            phoneInput.focus();
          }}
          leftIcon={
            <TouchableOpacity style={login.picker} onPress={changePickerValue}>
              <Text style={login.inputPrefix}>{prefix}</Text>
            </TouchableOpacity>
          }
        />
      </Container>
      <CustomToast />
    </>
  );
}
