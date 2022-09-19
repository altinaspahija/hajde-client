import { TouchableHighlight, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks";
import { BackButton } from '@/components'
import { Header } from "react-native-elements";

export default ({ title, hasLeftComponent = false, leftComponent, hasRightComponent = false, rightComponent }) => {
  const { Common } = useTheme();
  const navigation = useNavigation();
  return (
    <Header
      statusBarProps={Common.statusBarStyle}
      containerStyle={Common.headerContainerStyle}
      placement="center"
      centerComponent={{
        text: title,
        style: Common.headerCenterStyle,
      }}  
      leftComponent={hasLeftComponent ?? (leftComponent ?? <BackButton onPress={() => navigation.goBack()} />)}
      rightComponent={() => hasRightComponent ? (rightComponent ?? (
        <TouchableHighlight
          style={{ width: 70, height: 25 }}
          //onLongPress={() => setModalVisible(true)}
        >
          <Text></Text>
        </TouchableHighlight>
      )) : null}
    />
  );
}
