import { View } from "react-native";
import React from "react";
import { useTheme } from "@/hooks";

export default ({ status = "PENDING" }) => {
  const { Common } = useTheme();
  const { orders: styles } = Common;
  let color = "#333333";
  switch (status) {
    case "PENDING":
      color = "#0275D8";
      break;

    case "IN_PROGRESS":
      color = "#F0AD4E";
      break;
    case "ISSUE":
      color = "#D9534F";
      break;

    case "CANCELLED":
      color = "#EA4345";
      break;

    case "COMPLETED":
      color = "#5CD85C";
      break;

    default:
      color = "#0275D8";
      break;
  }
  return (
    <View style={[styles.circleOne, { backgroundColor: color }]}>
      <View style={[styles.circleTwo, { backgroundColor: "white" }]} />
      <View style={[styles.circleThree, { backgroundColor: color }]} />
    </View>
  );
};
