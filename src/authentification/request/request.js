import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import refreshAccessToken from "../refreshAccessToken/refreshAccessToken";
import { useNavigation } from "@react-navigation/native";
import apiURL from "../apiConstant";
import { checkTokenExpiration } from "../checkTokenExpiration";
import { getVersion } from "react-native-device-info";
const axiosApiInstance = axios.create();
// const navigation = useNavigation();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem("@TOKEN");

    // Thirre metoden qe e bon check tokenin checkTokenMethod(token)
    const tokenExpire = await checkTokenExpiration();

    if (tokenExpire === false) {
      token = await refreshAccessToken();
      await AsyncStorage.setItem("@TOKEN", token);
    }
    // token = Thirre metoden me bo refresh tokenin, edhe merre tokenin e ri
    //Vazhdo me requestin

    config.headers = {
      Accept: "application/json",
      Authorization: `JWT ${token}`, // token,
      "App-Version": getVersion(),
    };
    config.baseURL = apiURL;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosApiInstance.interceptors.response.use(
  (res) => res,
  async function (error) {
    const originalRequest = error.config;
    if (error?.response.status === 440) {
      Alert.alert("Mesazhi");
      const token = await refreshAccessToken();
      await AsyncStorage.setItem("@TOKEN", token);
      originalRequest._retry = true;
      originalRequest.headers["Authorization"] = token;
      return await axiosApiInstance(originalRequest);
    } else if (error?.response.status === 440) {
      Alert.alert("Mesazhi");
      useNavigation.navigation("Login");
      Alert.alert("Mesazhi", error.response?.data?.message);
    } else if (error?.response.status === 403) {
      Alert.alert("Mesazhi", error.response?.data?.message);
    } else {
      throw new Error(error.response.data.message);
    }
    return Promise.reject(error);
  },
);

export default axiosApiInstance;
