import { View, Text } from "react-native";
import React from "react";
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { useTheme } from "@/hooks";

export default (props) => {
  const { Colors, Common } = useTheme();
  /*
  1. Create the config
*/
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "green" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1NumberOfLines={3}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
          fontFamily: "Montserrat-Regular",
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1NumberOfLines={3}
        text1Style={{
          fontSize: 13,
          textAlign: "center",
          fontFamily: "Montserrat-Regular",
        }}
        text2Style={{
          fontSize: 10,
          fontFamily: "Montserrat-Regular",
        }}
      />
    ),

    /*
      Overwrite 'info' type,
      by modifying the existing `ErrorToast` component
    */
    info: (props) => (
      <InfoToast
        {...props}
        style={{ borderLeftColor: Colors.primary }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        text1NumberOfLines={3}
        text1Style={Common.emptyText}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),

    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  return <Toast {...props} config={toastConfig} position={props.position ? props.position : "top"} bottomOffset={props.bottomOffset ? 40 : 0}  topOffset={props.bottomOffset ? 0 : 40} autoHide />;
};
