import { View } from "react-native";
import React from "react";
import { useTheme } from "@/hooks";
import OrderDetailsPanelComponents from "./OrderDetailsPanelComponents";

export default ({ numberActive = 1 }) => {
  const { Layout, Gutters, Common, Images } = useTheme();
  const { orders: styles } = Common;
  let source = [];
  switch (numberActive) {
    case 1:
      source = [Images.amChef, Images.amMenu];
      break;
    case 2:
      source = [Images.amRoastedChicken, Images.amFastFood];
      break;
    // case 2:
    //   source = [Images.amIsometricMotorcycleDelivery];
    //  break;
    case 3:
      source = [Images.amDone];
      break;
    case 5:
      source = [Images.amCanceled];
      break;
    default:
      source = [Images.amDone];
      break;
  }

  return (
    <>
       <View style={Layout.fill}>
        <OrderDetailsPanelComponents
          loop={false}
          source={source}

        />
      </View>
    <View
      style={[
        Layout.fill10,
        Layout.row,
        Gutters.largeLPadding,
        Gutters.largeRPadding,
        { position: 'absolute', zIndex: 100, bottom: 10}
      ]}
    >
      <View style={numberActive === 1 ? styles.spaceActive : styles.spaceDeactive } />
      <View style={numberActive === 2 ? styles.spaceActive : styles.spaceDeactive} />
      <View style={numberActive === 5  ? styles.spaceActive : styles.spaceDeactive} />
      <View style={numberActive === 3 ? styles.spaceActive : styles.spaceDeactive} />
    </View>
    </>
  );
};
