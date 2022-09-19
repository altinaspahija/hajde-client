import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/hooks";
import OrderPanelComponents from "./OrderPanelComponents";
import OrderStatusLine from "./OrderStatusLine";
import moment from "moment";

const CoverPanelOrderDetails = ({
  data,
  statusNumber,
  title = "SHEFI E MORI POROSINË",
  subTitle = "Porosia arrin në orën",
  time = "13:45",
  maxTime = "14:02",
}) => {
  const { Images, Layout, Gutters, Colors, Common, Fonts } = useTheme();
  const { orders: styles } = Common;
  if(statusNumber === 2){
    title="POROSIA DUKE U PËRGATIT"
  }
  if(statusNumber === 3){
    title="NË DESTINACION"
  }
  if(statusNumber === 5){
    title="U ANULUA!"
  }
  return (
    <View style={[Layout.fill90, { backgroundColor: Colors.secondary }]}>
      <View
        style={[
          Gutters.largeLPadding,
          Gutters.largeRPadding,
          Gutters.smallTPadding,
        ]}
      >
        <Text style={styles.titleOnDetails}>{title}</Text>
        <View style={[Layout.row, Layout.scrollSpaceBetween]}>
          <View style={[Layout.row]}>
            <Text style={styles.subTitleOnDetails}>{subTitle}: </Text>
            <Text style={[styles.subTitleOnDetails, Fonts.textFontBold]}>
            {data?.deliveryTime === null
              ? "--:--"
              : moment(new Date(data?.deliveryTime)).format("HH:mm")}
            </Text>
          </View>
          <View style={Layout.row}>
          <Text style={styles.subTitleOnDetails}>Max: </Text>
            <Text style={[styles.subTitleOnDetails, Fonts.textFontBold]}>
            {data?.maxDeliveryTime === null
              ? "--:--"
              : moment(new Date(data?.maxDeliveryTime)).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>

      <OrderStatusLine numberActive={statusNumber} />
    </View>
  );
};

export default CoverPanelOrderDetails;
