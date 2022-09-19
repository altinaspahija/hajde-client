import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
  BodyPanelOrderDetails,
  CoverPanelOrderDetails,
  FooterPanelOrderDetails,
  ScreenContainer,
} from "@/components";

export default function OrderDetails({ data, statusNumber }) {
  console.log('st', statusNumber)
  return (
    <ScreenContainer title="POROSITË">
      <CoverPanelOrderDetails data={data} statusNumber={statusNumber}/>
      <BodyPanelOrderDetails data={data} />
      <FooterPanelOrderDetails data={data} />
    </ScreenContainer>
  );
}
