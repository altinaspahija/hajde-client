//External dependencies
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
// Internal dependencies
import global, {
  backgroundColor,
  buttonColor,
  header,
  primary,
  black,
} from "../../styles/global";
import styles from "./styles";
import { BackButton } from "../../components/Button/Button";

export default function Recetat({ navigation }) {
  return (
    <View style={global.container}>
      {/* <StatusBar backgroundColor="transparent" /> */}

      <Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{
          backgroundColor: primary,
          borderBottomColor: "transparent",
        }}
        placement="center"
        leftComponent={
          <BackButton onPress={() => navigation.navigate("Homepage")} />
        }
        // centerComponent={{
        //   text: "Recetat",
        //   style: {
        //     color: header,
        //     fontSize: 24,
        //     fontFamily: "Avenire-Bold",
        //   },
        // }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Recetat</Text>
        <Image
          style={styles.img}
          source={require("../../assets/images/Recetat.png")}
        />
        <Text style={styles.subTitle}>Së shpejti...</Text>
        
      </View>
    </View>
  );
}
