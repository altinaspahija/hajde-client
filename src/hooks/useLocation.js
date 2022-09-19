import { useEffect, useState, useRef, useCallback } from "react";
import { Platform, AppState, PermissionsAndroid, Alert } from "react-native";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import Config from "react-native-config";

const useLocation = (currentPosition, shouldWait, active = true) => {
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [permissionResult, setPermissionResult] = useState();

  const SPLASH_DURATION = Platform.select({ android: 4000, ios: 3000 });
  // TODO: AppState in the future should be generalized as the hook, then we can call anywhere
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    if (active) {
      if (shouldWait) {
        //we cut the duration of splash animation by 500ms beacuse it takes time to request user location
        //and we want to show it the moment the splash animation ends on the intro screen
        const duration = SPLASH_DURATION - 1000;
        const timer = setTimeout(() => {
          getLocation();
        }, duration);
        return () => {
          clearTimeout(timer);
        };
      } else {
        getLocation();
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  const displayPermission = useCallback(
    async (setFormattedAddress, setStreet) => {
      console.log({permissionResult})
      if (permissionResult === "blocked" || permissionResult === undefined) {
        settings();
      }
      await getLocation(setFormattedAddress, setStreet);
    },
    [location, permissionResult, getLocation]
  );

  const settings = () => 
    Alert.alert(
      "Përdor lokacionin",
      "Për të përdorur/vendos lokacionin tuaj, duhët të lejohet qasje në settings",
      [
        {
          text: "Settings",
          onPress: () => openSettings(),
        },
        {
          text: "Jo",
          onPress: () => null,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  
  useEffect(() => {
    // This listener handle only for iOS 15 as Apple made a change in iOS 15 which required the app to be in an active state before the app tracking prompt can be fired.
    // ref: https://github.com/zoontek/react-native-permissions/issues/648#issuecomment-928077147
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // This function is for both platforms
      getLocation();
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        handleAppStateChange(nextAppState);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription?.remove();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const handleAppStateChange = (nextState) => {
    if (nextState === "active") {
      if (Platform.OS === "ios") {
        // Only once app has become active
        // can we prompt app tracking permission (Apple iOS 15 requirement)
        checkPermissionIOS();
      }
    }
  };

  const checkPermissionIOS = async () => {
    const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    if (result === RESULTS.DENIED) {
      await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    }
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === "ios") {
      return await hasPermissionIOS();
    } else {
      return await hasPermissionAndroid();
    }
  };

  const hasPermissionAndroid = async () => {
    if (Platform.Version < 23) {
      return true;
    }

    const hasPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (hasPermission === "granted") {
      return true;
    }

    const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return status === PermissionsAndroid.RESULTS.GRANTED;
  };

  const hasPermissionIOS = async () => {
    const hasPermission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (hasPermission === "granted") {
      return true;
    }

    const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return status === "granted";
  };

  const getLocation = async (setFormattedAddress, setStreet) => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setPermissionResult("blocked");
      return;
    }
    Geolocation.getCurrentPosition(
      async (position) => {
        setLocation(position.coords);
        setPermissionResult("granted");
        console.log({ setFormattedAddress });
        if (setFormattedAddress) {
          axios
            .get(
              `${Config.Google_URL}/${position.coords.longitude},${position.coords.latitude}.json?limit=1&types=place%2Cpostcode%2Caddress&access_token=${Config.Google_Key}&language=sq`
            )
            .then(async (res) => {
              if (res.status === 200) {
                setFormattedAddress(res.data.features[0]);

                console.log({ res: res.data.features[0] });
                if (res.data.features[0] !== undefined) {
                  setStreet && setStreet(res.data.features[0].place_name);
                } else {
                  settings();
                }
              }
            })
            .catch((err) => {
              console.log({ geoErr: err });
            });
        }
      },
      () => {
        setPermissionResult("blocked");
      },
      {
        accuracy: {
          android: "high",
          ios: "best",
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      },
    );
  };

  return {
    location,
    permissionResult,
    displayPermission,
  };
};

export default useLocation;
