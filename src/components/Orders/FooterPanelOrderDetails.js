import React from "react";
import { Text, View, Dimensions } from "react-native";
import { useTheme } from "@/hooks";
import { Triangle } from "@/components";

const WIDTH = Dimensions.get("screen").width;
const TRIANGLE_BASE = 30;
const TRIANGLES_ARRAY = [...Array(Math.ceil(WIDTH / TRIANGLE_BASE)).keys()];

const FooterPanelOrderDetails = ({ data }) => {
  const { Common, Layout, Gutters, Colors } = useTheme();
  const baseStyle = [
    Layout.row,
    Layout.justifyContentBetween,
    Gutters.smallTPadding,
    Gutters.smallLPadding,
    Gutters.smallRPadding,
  ];
  // const { transport, currency, total } = data
  return (
    <View style={Layout.fill80}>
      <View style={[Common.backgroundGray, Layout.row]}>
        {TRIANGLES_ARRAY.map((i) => (
          <Triangle key={i} />
        ))}
      </View>
      <View style={Common.orders.bill}>
        <View style={[Gutters.largeLPadding, Gutters.regularTPadding]}>
          <Text style={Common.titleGray}>Fatura</Text>
        </View>
        <View
          style={[Layout.fill, Gutters.heavyLPadding, Gutters.heavyRPadding]}
        >
          <View style={baseStyle}>
            <Text style={Common.subTitleGray}>Produkte</Text>
            <Text style={Common.subTitleBoldGray}>
              {(data?.total * 100 -
                data?.transport * 100 +
                data?.discount * 100) /
                100}{" "}
              {data?.currency}
            </Text>
          </View>
          {!!data?.discount && (
            <View style={baseStyle}>
              <Text style={Common.subTitleGray}>Zbritja</Text>
              <Text style={Common.subTitleBoldGray}>
                {data?.discount} {data?.currency}
              </Text>
            </View>
          )}
          <View style={baseStyle}>
            <Text style={Common.subTitleGray}>Dërgesa</Text>
            <Text style={Common.subTitleBoldGray}>
              {data?.transport} {data?.currency}
            </Text>
          </View>
          <View style={baseStyle}>
            <Text style={[Common.subTitleBoldGray, { color: Colors.black }]}>
              TOTAL
            </Text>
            <Text style={[Common.subTitleBoldGray, { color: Colors.black }]}>
              {data?.total} {data?.currency}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FooterPanelOrderDetails;
