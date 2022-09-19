import React, { useRef, useState } from "react";
import { TouchableOpacity, LayoutAnimation, Alert, Keyboard } from "react-native";
import { FormInput } from "@/components";
import { Container } from "@/containers";
import { useTheme } from "@/hooks";
import axios from "axios";
import apiURL from "@/authentification/apiConstant";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ChangePasswordContainer({ navigation, route }) {
  const phone = route?.params?.phone;
  const prefix = route?.params?.prefix;
  const resetToken = route?.params?.response.data;

  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [validPassword, setPasswordValid] = useState(true);
  const [validConfirmationPassword, setConfirmationPasswordValid] =
    useState(true);
  let passwordInput = useRef(null);
  let confirmationPasswordInput = useRef(null);

  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const { Colors } = useTheme();
  const signup = () => {
    LayoutAnimation.easeInEaseOut();
    const passwordValid = validatePassword();
    const confirmationPasswordValid = validateConfirmationPassword();
    if (passwordValid && confirmationPasswordValid) {
      setLoading(true);
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        LoginAuthorization();
      }, 1500);
    }
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

  const LoginAuthorization = async () => {
    try {
      const response = await axios.put(`${apiURL}/recovery/change-password`, {
        phone: prefix + phone,
        client: "HajdeApp",
        resetToken: resetToken.resetToken,
        password: confirmationPassword,
      });
      Alert.alert("Mesazhi", response?.data?.message, [
        { text: "Në rregull", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err) {
      Alert.alert("Mesazhi", err.response?.data?.message, [
        { text: "Në rregull" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      onPress={() => signup()}
      isLoading={isLoading}
      back={() => navigation.pop()}
    >
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
              confirmationPasswordInput.focus();
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
    </Container>
  );
}
