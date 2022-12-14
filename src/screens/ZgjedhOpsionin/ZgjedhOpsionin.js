//External dependencies
import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
// Internal dependencies
import global, { primary, header } from "../../styles/global";
import Card from "./Card";
import { BackButton } from "../../components/Button/Button";

export default function ZgjedhOpsionin({ navigation }) {
  return (
    <View style={global.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Shporta")} />
        }
        centerComponent={{
          text: "Zgjedhni një opsion",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-15%",
        }}
      >
        <Card
          deliveryTime={"Marketet"}
          img={require("../../assets/images/marketet.png")}
          onPress={() => navigation.navigate("SetMarket")}
        />
        <Card
          deliveryTime={"Restorantet"}
          img={require("../../assets/images/restoran.png")}
          onPress={() => navigation.navigate("SetRestoran")}
        />
      </View>
    </View>
  );
}
