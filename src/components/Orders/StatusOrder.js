import { useTheme } from "@/hooks";
import React from "react";
import { Text, View } from "react-native";
const StatusOrder = ({ status = "PENDING" }) => {
  const { Common } = useTheme();
  const { orders: styles } = Common;
  let color = "#1492E6";
  let text = "Në pritje";
  switch (status) {
    case "PENDING":
      color = "#1492E6";
      text = "Në pritje";
      break;

    case "IN_PROGRESS":
      color = "#00CCBB";
      text = "Në progres";
      break;
    case "ISSUE":
      color = "#FF7003";
      text = "Problem";
      break;

    case "CANCELLED":
      color = "#FF0303";
      text = "Anuluar";
      break;

    case "COMPLETED":
      color = "#059F00";
      text = "Kompletuar";
      break;

    default:
      color = "#1492E6";
      text = "Në pritje";
      break;
  }
  return (
    <View style={styles.statusOrder}>
      <Text style={[styles.statusOrderText, { color }]}>{text}</Text>
    </View>
  );
};

export default StatusOrder;
