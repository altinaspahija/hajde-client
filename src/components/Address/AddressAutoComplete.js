import React, { useRef, forwardRef, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Modalize } from "react-native-modalize";

import { useCombinedRefs, useLocation, useTheme } from "@/hooks";
import { MapBoxAutoComplete } from "@/utils/MapBoxAutoComplete";
import Config from "react-native-config";

const defaultStyles = {
  container: {
    marginTop: 2,
  },
  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    height: 44,
    borderTopWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: 2,
    borderColor: "#333",
    flexDirection: "row",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  powered: {},
  listView: {
    //flex: 1,
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: "row",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#c8c7cc",
  },
  administrative: {},
  loader: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
};
const bboxKosova = [
  19.45550536781284, 42.26344235775736, 22.350254035187298, 43.344678899350065,
];
const bboxShqiperia = [
  19.3044861183, 39.624997667, 21.0200403175, 42.6882473822,
];
const AddressAutoComplete = forwardRef(
  ({ country, formattedAddress, setFormattedAddress, setStreet }, ref) => {
    const modalizeRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, modalizeRef);
    const [toggle, setToggle] = useState(false);
    const { Layout, Images, Common, Gutters } = useTheme();
    const [value, setValue] = useState("");
    const { location, permissionResult, displayPermission } = useLocation(
      {
        latitude: 0,
        longitude: 0,
      },
      true,
      false
    );
    const {
      address: addressStyle,
      addressButton,
      addressButtonText,
    } = Common.shoppingCart;
    const bbox = country === "Kosovë" ? bboxKosova : bboxShqiperia;
    const openPermissionModal = useCallback(
      async (event, page) => {
        if (event) {
          await displayPermission(setFormattedAddress, setStreet);
        }
      },
      [location, location.latitude, displayPermission, formattedAddress, setFormattedAddress, setStreet]
    );

    const handleClose = () => {
      if (combinedRef.current) {
        combinedRef.current.close();
      }
    };

    const renderHeader = () => (
      <TouchableOpacity
        style={s.modal__header}
        activeOpacity={0.75}
        onPress={handleClose}
        hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
      >
        <Image
          source={Images.imgCross}
          style={{ tintColor: "#fff", width: "40%", height: "40%" }}
        />
      </TouchableOpacity>
    );

    const callBack = useCallback(
      (data, details = null) => {
        console.log({ data, details });
        setFormattedAddress(details);
      },
      [formattedAddress, setFormattedAddress]
    );
    const renderContent = () => (
      <View style={s.content}>
        <View style={s.center}>
          <View style={s.line} />
        </View>
        <Text style={s.content__heading}>Vendose një adresë</Text>
        <View
          style={[
            Layout.fill,
            Layout.row,
            Layout.center,
            Gutters.smallVPadding,
          ]}
        >
          <View style={[Layout.fill90]}>
            <Text style={s.content__subheading}>
              {formattedAddress?.place_name}{" "}
            </Text>
          </View>
          {!!formattedAddress?.place_name && (
            <TouchableOpacity
              style={Layout.fill10}
              onPress={() => setFormattedAddress({})}
            >
              <Image
                source={Images.iconClear}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={addressStyle}>
          <ImageBackground
            source={Images.addressMap}
            style={[
              Layout.center,
              Layout.fill,
              Gutters.smallRadius,
              !!formattedAddress?.place_name && { backgroundColor: "#111111" },
            ]}
            imageStyle={[Gutters.smallRadius, !!formattedAddress?.place_name && { opacity: 0.5 }]}
          >
            <TouchableOpacity
              style={[addressButton,!!formattedAddress?.place_name && { backgroundColor: "#00000059" }]}
              onPress={openPermissionModal}
              disabled={!!formattedAddress?.place_name}
            >
              <Text style={[addressButtonText, !!formattedAddress?.place_name && { color: "#FFFFFF" }]}>Adresa Automatike</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <MapBoxAutoComplete
          placeholder={"Kërko"}
          accessToken={Config.Google_Key}
          onChangeText={(input) => setValue(input)}
          options={{ country: "xk" }}
          styles={defaultStyles}
          onPress={callBack}
          debounce={1000}
          predefinedPlacesAlwaysVisible={true}
          autoFocus={true}
          bbox={bbox}
          //text={"teee"}
          //renderRightButton={()=><TouchableOpacity onPress={()=>setValue('')}><Text>Delete</Text></TouchableOpacity>}
        />
      </View>
    );

    return (
      <Modalize
        ref={combinedRef}
        HeaderComponent={renderHeader}
        withHandle={false}
        disableScrollIfPossible={false}
        avoidKeyboardLikeIOS={Platform.select({ ios: true, android: false })}
        keyboardAvoidingBehavior={"padding"} // 'height' | 'position' | 'padding';
        keyboardAvoidingOffset={100}
        panGestureEnabled={true}
        snapPoint={820}
        adjustToContentHeight={toggle}
      >
        {renderContent()}
      </Modalize>
    );
  }
);

const s = StyleSheet.create({
  modal__header: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 9000,

    alignItems: "center",
    justifyContent: "center",

    width: 25,
    height: 25,

    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 4,
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: 15,
  },

  content__heading: {
    marginBottom: 2,

    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },

  content__subheading: {
    paddingLeft: 8,
    fontSize: 16,
    color: "#777",
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },

  line: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: 8,
    width: 100,
    borderRadius: 50,
    marginBottom: 25,
  },
});

export default AddressAutoComplete;
