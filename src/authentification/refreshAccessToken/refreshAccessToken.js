import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiURL from "../apiConstant";

const refreshAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@REFRESH_TOKEN");
    const headers = {
      "x-refresh-token": token,
    };

    const result = await axios.post(
      `${apiURL}/client/auth/refresh-token`,
      null,
      { headers }
    );
    return result.data.token;
  } catch (err) {
    console.log("ERROR: ", err.message);
  }
};

export default refreshAccessToken;