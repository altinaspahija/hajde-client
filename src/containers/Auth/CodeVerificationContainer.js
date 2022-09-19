//External dependencies
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, Alert, LayoutAnimation, Keyboard } from "react-native";
// Internal dependencies
import axios from "axios";
import apiURL from "@/authentification/apiConstant";
import { Container } from "@/containers";
import { useTheme } from "@/hooks";
import { FormInput } from "@/components";

export default function CodeVerificationContainer({ navigation, route }) {
  const phone = route?.params?.phone;
  const prefix = route?.params?.prefix;
  const register = route?.params?.register;

  const [code, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [validCode, setCodeValid] = useState(true);
  let codeInput = useRef(null);
  const { Common } = useTheme();
  const { login } = Common;

  const validateCode = () => {
    const codeCheck = code.length > 0;
    LayoutAnimation.easeInEaseOut();
    setCodeValid(codeCheck);
    codeCheck || codeInput.shake();
    return codeCheck;
  };
  const codeVerify = () => {
    LayoutAnimation.easeInEaseOut();
    const codeValid = validateCode();
    if (codeValid) {
      setLoading(true);
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        if(register) {
          RegisterAuthorization();
        } else{
          LoginAuthorization();
        }
      }, 1500);
    }
  };
  const LoginAuthorization = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/recovery/check-phone-reset-code`,
        {
          phone: `${prefix}${phone}`,
          client: "HajdeApp",
          code: code,
        }
      );
      if (response) {
        setLoading(false);
      }
      navigation.navigate("NewPassword", { phone, response, prefix });
    } catch (err) {
      setLoading(false);
      Alert.alert("Mesazhi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
    }
    finally{
      setLoading(false);
    }
  };
  const RegisterAuthorization = async () => {
    try {
      const response = await axios.put(
        `${apiURL}/verification/verify-account`,
        {
          phone: prefix + phone,
          code: code,
          client: "HajdeApp",
        }
      );
      Alert.alert("Kodi", response.data.message, [{ text: "Në rregull" }]);
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Kodi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  const sendCode = async () => {
    try {
      const response = await axios.post(`${apiURL}/recovery/send-reset-phone`, {
        phone: prefix + phone,
        client: "HajdeApp",
      });
      Alert.alert("Mesazhi", response.data.message, [{ text: "Në rregull" }]);
    } catch (err) {
      Alert.alert("Mesazhi", err.response.data.message, [
        { text: "Në rregull" },
      ]);
    }
  };
  const onChangeText = (text) => {
    setCode(text);
  };
  return (
    <Container
      onPress={() => codeVerify()}
      isLoading={isLoading}
      back={() => navigation.pop()}
    >
      <FormInput
        refInput={(input) => (codeInput = input)}
        keyboardType="phone-pad"
        value={code}
        maxLength={5}
        inputStyle={{ marginLeft: 0 }}
        onChangeText={(text) => onChangeText(text)}
        placeholder="Kodi"
        returnKeyType="done"
        errorMessage={validCode ? "" : "Ju lutem shkruani kodin!"}
        onSubmitEditing={() => {
          validateCode();
          Keyboard.dismiss();
        }}
      />
      <TouchableOpacity onPress={() => sendCode()}>
        <Text style={login.forgot_button}>Ridërgoni kodin</Text>
      </TouchableOpacity>
    </Container>
  );
}
