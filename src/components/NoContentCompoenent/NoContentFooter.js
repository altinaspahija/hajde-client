import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ title, footerNotice, footerDescription = "Së shpejti" }) => {

  const { Layout, Common } = useTheme();
  const { noContent } = Common;
  const [ noticeStorage, setNoticeStorage ] = useState("");
  useEffect(async () => {
    const res = await AsyncStorage.getItem(title);
    setNoticeStorage(res);
  }, [noticeStorage]);

  const onPressYes = async () => {
        await AsyncStorage.setItem(title, "Yes");
        setNoticeStorage("Yes");  
        alert('Faleminderit!')
  }

  const onPressNo = async () => {
    await AsyncStorage.setItem(title, "No");
    setNoticeStorage("No");
    alert('Faleminderit!')  
  };

  return (
    <View style={[Layout.fill30, Layout.center]}>
      <View style={[Layout.fill, Layout.center]}>
        <View style={[Layout.fill20, Layout.rowCenter]}>
          {noticeStorage === null ? (
            <>
              <Text>{footerNotice}</Text>
              <TouchableOpacity
                style={noContent.footerOnPress}
                onPress={() => onPressYes()}
              >
                <Text style={noContent.footerOnPressText}>Po</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={noContent.footerOnPress}
                onPress={() => onPressNo()}
              >
                <Text style={noContent.footerOnPressText} t>
                  Jo
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View />
          )}
        </View>
        <View style={[Layout.fill90, Layout.center]}>
          <Text style={noContent.footerDescription}>{footerDescription}</Text>
        </View>
      </View>
    </View>
  );
};
