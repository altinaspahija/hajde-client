import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getVersion } from "react-native-device-info";

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = await AsyncStorage.getItem("@TOKEN");
    //TODO: Token should to return with RTK query way. No in this way (AsyncStorage)
    // const token = (getState())?.auth?.token

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("Authorization", `JWT ${token}`);
      headers.set("App-Version", getVersion());
    }

    return headers;
  },
});

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
