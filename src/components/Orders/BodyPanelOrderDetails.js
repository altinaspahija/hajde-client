import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import Space from "../Space/Space";
import Avatar from "@/assets/svg/Avatar.svg";
import Like from "@/assets/svg/LikeOrder.svg";
import UnLike from "@/assets/svg/UnLikeOrder.svg";
import PhoneCallRight from "@/assets/svg/phoneRightCall.svg";
import PhoneCallLeft from "@/assets/svg/phoneLeftCall.svg";
import { useTheme } from "@/hooks";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import CoreImage from "@/utils/CoreImage";

export default function BodyPanelOrderDetails({ data }) {
  const { Layout, Common, Gutters, Colors, Images } = useTheme();
  const { home, orders, orderItem } = Common;
  const navigation = useNavigation();
  const textContainerStyle = [Gutters.smallLPadding, Layout.colCenter];
  const textStyle = [Common.text, { color: Colors.primary }];
  return (
    <>
      <View style={Layout.fill}>
        <View style={[Layout.fill, Layout.row]}>
          <View style={[Layout.fill50]}>
            <View
              style={[
                Layout.fill,
                Common.backgroundPrimary,
                Gutters.smallTMargin,
                Gutters.smallBMargin,
                Gutters.largeLMargin,
                Gutters.smallRadius,
              ]}
            >
              <View style={[Layout.center, Gutters.smallTPadding]}>
                <Avatar />
                <Space value={5} />
                <Text style={Common.title}>{data?.courier?.name}</Text>
                <View
                  style={[
                    Layout.fill,
                    Layout.row,
                    Layout.centerHorizontal,
                    Gutters.largeHPadding,
                  ]}
                >
                  <TouchableOpacity style={Gutters.smallRPadding}>
                    <Like />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <UnLike />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={orderItem.buttonContainer}>
            <TouchableOpacity
              disabled={!data?.courier?.phone}
              style={[
                Common.button,
                Common.shadow,
                Gutters.smallRadius,
                Layout.row,
              ]}
              onPress={() => Linking.openURL(`tel:${data?.courier?.phone}`)}
            >
              <PhoneCallLeft />
              <Text style={Common.buttonText}>Ring Ring</Text>
              <PhoneCallRight />
            </TouchableOpacity>
          </View>
          <View
            style={[
              Layout.fill50,
              Gutters.smallBPadding,
              Gutters.largeTPadding,
            ]}
          >
            <View
              style={[
                Gutters.smallLPadding,
                Gutters.smallBPadding,
                Layout.colCenter,
                Layout.row,
              ]}
            >
              <View style={home.locationRight}>
                <CoreImage style={Common.logoContainer} source={Images.logo} />
              </View>
              <View style={orderItem.address}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={Common.empty}
                >
                  {data?.address?.street}
                </Text>
              </View>
            </View>
            <View style={textContainerStyle}>
              <Text style={textStyle}>Numri i porosisë</Text>
            </View>
            <View
              style={[
                Gutters.smallLPadding,
                Gutters.smallBPadding,
                Layout.colCenter,
              ]}
            >
              <Text style={Common.empty}>#{data?.orderNumber}</Text>
            </View>

            <View style={textContainerStyle}>
              <Text style={textStyle}>Restoranti</Text>
            </View>
            <View
              style={[
                Gutters.smallLPadding,
                Gutters.smallBPadding,
                Layout.colCenter,
              ]}
            >
              <Text style={Common.empty}>{data?.supplier?.name}</Text>
            </View>

            <View style={textContainerStyle}>
              <Text style={textStyle}>Data</Text>
            </View>
            <View
              style={[
                Gutters.smallLPadding,
                Gutters.smallBPadding,
                Layout.colCenter,
              ]}
            >
              <Text style={Common.empty}>
                {moment(new Date(data?.lastUpdate)).format("DD-MM-YYYY")}
              </Text>
            </View>
            <View style={textContainerStyle}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ShoppingDetails", {
                    item: data,
                  })
                }
                style={orders.moreTouch}
              >
                <Text style={orders.moreText}>Më shumë</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={[Layout.fill10, Layout.center, Gutters.largeTMargin]}>
        <Text style={Common.textBlack}>| Nëse vonojmë, ne kompensojmë |</Text>
      </View>
    </>
  );
}
